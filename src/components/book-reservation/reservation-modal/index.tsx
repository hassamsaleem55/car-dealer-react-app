import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useDealerContext } from "@core-dir/dealer-provider";
import { postApi } from "@core-dir/services/Api.service";
import ModalWithSteps from "../../modals/modal-with-steps";
import ReservationLayout from "../reservation-layout";
import PersonalInfoForm from "../personal-info-form";
import PaymentCardForm from "../payment-card-form";
import type { Car } from "@components-dir/car-card/car-card.types";

export default function ReservationModal({
  isOpen,
  setIsOpen,
  carData,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  carData: Car;
}) {
  const location = useLocation();
  const { dealerAuthToken } = useDealerContext();
  const searchParams = location.search.startsWith("?")
    ? location.search.substring(1)
    : location.search;
  const stockId = searchParams.split("=")[1];
  const [reservationSecret, setReservationSecret] = useState<string>("");

  const [personalInfoForm, setPersonalInfoForm] = useState([
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
      value: "",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
      value: "",
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
      value: "",
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      required: true,
      value: "",
    },
  ]);

  const [paymentForm, setPaymentForm] = useState([
    {
      name: "cardholderName",
      type: "text",
      label: "Cardholder Name",
      required: true,
      value: "",
      placeholder: "Name as shown on card",
    },
    {
      name: "cardNumber",
      type: "text",
      label: "Card Number",
      required: true,
      value: "",
      placeholder: "1234 5678 9012 3456",
      maxLength: 19,
    },
    {
      name: "expiryDate",
      type: "text",
      label: "Expiry Date",
      required: true,
      value: "",
      placeholder: "MM/YY",
      maxLength: 5,
    },
    {
      name: "cvv",
      type: "text",
      label: "CVV",
      required: true,
      value: "",
      placeholder: "123",
      maxLength: 4,
    },
  ]);

  // Personal Info Validation
  const personalInfoValidator = (): boolean => {
    const emptyField = personalInfoForm.find(
      (field) => field.required && !field.value.trim()
    );
    if (emptyField) {
      toast.error(`Please fill out the ${emptyField.label} field.`);
      return false;
    }

    // Validate email
    const emailField = personalInfoForm.find((f) => f.name === "email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && !emailRegex.test(emailField.value)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Validate UK phone number
    const phoneField = personalInfoForm.find((f) => f.name === "phone");
    const ukPhoneRegex =
      /^(?:\+?44\s?\d{10}|0044\s?\d{10}|07\d{9}|01\d{9}|02\d{9})$/;
    if (
      phoneField &&
      !ukPhoneRegex.test(phoneField.value.replace(/\s+/g, ""))
    ) {
      toast.error("Please enter a valid UK phone number.");
      return false;
    }

    return true;
  };

  // Note: paymentCardValidator removed - validation now handled by Stripe Elements

  const [clientSecret, setClientSecret] = useState<string>("");
  const [publishableKey, setPublishableKey] = useState<string>("");

  // Submit Reservation
  const submitReservation = async (): Promise<boolean> => {
    const body = {
      PaymentType: "card",
      StockId: Number(stockId),
      FirstName:
        personalInfoForm.find((f) => f.name === "firstName")?.value || "",
      LastName:
        personalInfoForm.find((f) => f.name === "lastName")?.value || "",
      EmailAddress:
        personalInfoForm.find((f) => f.name === "email")?.value || "",
      PhoneNumber:
        personalInfoForm.find((f) => f.name === "phone")?.value || "",
    };
    const response = await postApi(
      `/stocks/${stockId}/reserve/create-payment-intent`,
      body,
      dealerAuthToken
    );
    try {
      if (response.isSuccess) {
        if (response.checkoutUrl) {
          window.location.href = response.checkoutUrl;
        } else if (response.clientSecret && response.publishableKeyDecoded) {

          // Set Stripe parameters for in-modal payment
          setClientSecret(response.clientSecret);
          setPublishableKey(response.publishableKeyDecoded);
          setReservationSecret(response.reservationSecret || "");
          console.log("Stripe setup complete - parameters validated");
        }
      } else {
        console.log("Payment intent creation failed:", response.errorMessage);
        toast.error(
          response.errorMessage || "Payment setup failed. Please try again."
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error("Network error during payment intent creation:", error);
      toast.error("Network error. Please check your connection and try again.");
      return false;
    }
  };

  // Handle Stripe payment completion
  const handlePaymentSuccess = () => {
    // Redirect to payment response page
    window.location.href = `/Payment/PaymentResponse?stockId=${stockId}&isSuccess=true&isCardPayment=true}`;
  };

  // Submit payment via Stripe
  const submitCardPayment = async (): Promise<boolean> => {
    // This will be handled by the Stripe payment handler in PaymentCardForm
    if (typeof window !== "undefined" && (window as any).stripePaymentHandler) {
      return await (window as any).stripePaymentHandler();
    } else {
      toast.error("Payment system not ready. Please try again.");
      return false;
    }
  };
  const steps = [
    {
      content: (
        <ReservationLayout carData={carData}>
          <PersonalInfoForm
            personalInfoForm={personalInfoForm}
            setPersonalInfoForm={setPersonalInfoForm}
          />
        </ReservationLayout>
      ),
      validate: personalInfoValidator,
      submitMethod: submitReservation,
    },
    {
      content: (
        <ReservationLayout carData={carData}>
          <PaymentCardForm
            paymentForm={paymentForm}
            setPaymentForm={setPaymentForm}
            clientSecret={clientSecret}
            publishableKey={publishableKey}
            reservationSecret={reservationSecret}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </ReservationLayout>
      ),
      validate: () => {
        // Basic validation - ensure Stripe is loaded and cardholder name is provided
        const cardholderName =
          paymentForm.find((f) => f.name === "cardholderName")?.value || "";
        if (!cardholderName.trim()) {
          toast.error("Please enter the cardholder name.");
          return false;
        }
        return true;
      },
      submitMethod: submitCardPayment,
    },
  ];

  return (
    <ModalWithSteps
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalHeading="Reserve Vehicle for £99"
      steps={steps}
    />
  );
}

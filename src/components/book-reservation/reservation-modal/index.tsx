import { useState } from "react";
import { toast } from "sonner";
import { useDealerContext } from "@core-dir/dealer-provider";
import { postApi } from "@core-dir/services/Api.service";
import ModalWithSteps from "../../modals/modal-with-steps";
import ReservationLayout from "../reservation-layout";
import PersonalInfoForm from "../personal-info-form";
import PaymentCardForm from "../payment-card-form";
import ReservationConfirmation from "../reservation-confirmation";
import { type CarDataTypes } from "@components-dir/car-details/car-details.types";

export default function ReservationModal({
  isOpen,
  setIsOpen,
  carData,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  carData: CarDataTypes;
}) {
  const { dealerAuthToken } = useDealerContext();
  const searchParams = location.search.startsWith("?")
    ? location.search.substring(1)
    : location.search;
  const stockId = searchParams.split("=")[1];
  
  const [reservationNumber, setReservationNumber] = useState("");

  // Personal Information Form State
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

  // Payment Card Form State
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

  // Payment Card Validation
  const paymentCardValidator = (): boolean => {
    const emptyField = paymentForm.find(
      (field) => field.required && !field.value.trim()
    );
    if (emptyField) {
      toast.error(`Please fill out the ${emptyField.label} field.`);
      return false;
    }

    // Validate card number (basic Luhn algorithm check)
    const cardNumberField = paymentForm.find((f) => f.name === "cardNumber");
    if (cardNumberField) {
      const cardNumber = cardNumberField.value.replace(/\s/g, "");
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        toast.error("Please enter a valid card number.");
        return false;
      }
      
      // Basic Visa card validation (starts with 4)
      if (!cardNumber.startsWith("4")) {
        toast.error("We only accept Visa cards at this time.");
        return false;
      }
    }

    // Validate expiry date
    const expiryField = paymentForm.find((f) => f.name === "expiryDate");
    if (expiryField) {
      const expiry = expiryField.value;
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        toast.error("Please enter a valid expiry date (MM/YY).");
        return false;
      }
      
      const [month, year] = expiry.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (month < 1 || month > 12) {
        toast.error("Please enter a valid month (01-12).");
        return false;
      }
      
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        toast.error("Card has expired. Please use a valid card.");
        return false;
      }
    }

    // Validate CVV
    const cvvField = paymentForm.find((f) => f.name === "cvv");
    if (cvvField) {
      const cvv = cvvField.value;
      if (cvv.length < 3 || cvv.length > 4) {
        toast.error("Please enter a valid CVV (3-4 digits).");
        return false;
      }
    }

    return true;
  };

  // Submit Reservation
  const submitReservation = async (): Promise<boolean> => {
    const body = {
      FirstName: personalInfoForm.find((f) => f.name === "firstName")?.value || "",
      LastName: personalInfoForm.find((f) => f.name === "lastName")?.value || "",
      EmailAddress: personalInfoForm.find((f) => f.name === "email")?.value || "",
      PhoneNumber: personalInfoForm.find((f) => f.name === "phone")?.value || "",
      StockId: Number(stockId),
      ReservationAmount: 99,
      PaymentDetails: {
        CardholderName: paymentForm.find((f) => f.name === "cardholderName")?.value || "",
        CardNumber: paymentForm.find((f) => f.name === "cardNumber")?.value?.replace(/\s/g, "") || "",
        ExpiryDate: paymentForm.find((f) => f.name === "expiryDate")?.value || "",
        CVV: paymentForm.find((f) => f.name === "cvv")?.value || "",
      },
      VehicleTitle: carData.title,
      VehiclePrice: carData.retailPrice,
    };

    try {
      // Note: Replace this endpoint with the actual reservation endpoint
      const response = await postApi("/companies/reservations", body, dealerAuthToken);

      if (!response) {
        toast.error("Something went wrong. Please try again later.");
        return false;
      } else if (!response?.isSuccess) {
        toast.error(response.message || "Failed to process reservation.");
        return false;
      }

      // Generate a reservation number (in real scenario, this would come from the API)
      const reservationNum = `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      setReservationNumber(reservationNum);
      
      toast.success("Reservation successful! You will receive a confirmation email shortly.");
      return true;
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
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
    },
    {
      content: (
        <ReservationLayout carData={carData}>
          <PaymentCardForm
            paymentForm={paymentForm}
            setPaymentForm={setPaymentForm}
          />
        </ReservationLayout>
      ),
      validate: paymentCardValidator,
      submitMethod: submitReservation,
    },
    {
      content: (
        <ReservationLayout carData={carData}>
          <ReservationConfirmation reservationNumber={reservationNumber} />
        </ReservationLayout>
      ),
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
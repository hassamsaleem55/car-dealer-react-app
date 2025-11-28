import { postApi } from "@core-dir/services/Api.service";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDealerContext } from "@core-dir/dealer-provider";

// Declare Stripe global
declare global {
  interface Window {
    Stripe: any;
  }
}

export default function PaymentCardForm({
  paymentForm,
  setPaymentForm,
  clientSecret,
  publishableKey,
  reservationSecret,
  onPaymentSuccess,
}: {
  paymentForm: {
    name: string;
    type: string;
    label: string;
    required: boolean;
    value: string;
    placeholder: string;
    maxLength?: number;
  }[];
  setPaymentForm: (
    form: {
      name: string;
      type: string;
      label: string;
      required: boolean;
      value: string;
      placeholder: string;
      maxLength?: number;
    }[]
  ) => void;
  clientSecret?: string;
  publishableKey?: string;
  reservationSecret?: string;
  onPaymentSuccess?: () => void;
}) {
  const { dealerAuthToken } = useDealerContext();
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [cardElement, setCardElement] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• ••••");
  const [cardExpiry, setCardExpiry] = useState("••/••");
  const [cardBrand, setCardBrand] = useState("generic");
  const cardElementRef = useRef<HTMLDivElement>(null);
  const cardholderNameRef = useRef<HTMLInputElement>(null);

  const inputFieldsClasses =
    "border border-gray-300 p-3 text-sm rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary";

  useEffect(() => {
    // Load Stripe script if not already loaded
    if (!window.Stripe && publishableKey) {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.async = true;
      script.onload = () => initializeStripe();
      document.head.appendChild(script);
    } else if (window.Stripe && publishableKey) {
      initializeStripe();
    }
  }, [publishableKey]);

  const initializeStripe = () => {
    if (!publishableKey || !clientSecret) {
      console.log("Missing Stripe configuration:", {
        publishableKey,
        clientSecret,
      });
      return;
    }

    // Validate publishable key format
    // if (!publishableKey.startsWith('pk_')) {
    //   console.error("Invalid Stripe publishable key format:", publishableKey);
    //   toast.error("Invalid payment configuration. Please contact support.");
    //   return;
    // }

    console.log(
      "Initializing Stripe with key:",
      publishableKey.substring(0, 20) + "..."
    );

    try {
      const stripeInstance = window.Stripe(
        "pk_test_51QMT4hK1DsGjE5OTLzDRHoQyiGDD1WPJkUIrmiQPqw2rwe8OwNAp04QjE7RAuy6jo8d502b6H94YWeyUU8oQ0a2Y00I0QgbX0S"
      );
      const elementsInstance = stripeInstance.elements();

      const cardElementInstance = elementsInstance.create("card");

      if (cardElementRef.current) {
        cardElementInstance.mount(cardElementRef.current);
      }

      // Listen for changes in the card element
      cardElementInstance.on("change", (event: any) => {
        if (event.complete) {
          setCardNumber("**** **** **** ****");
          setCardExpiry("**/**");
          setCardBrand(event.brand || "generic");
        } else {
          setCardNumber("•••• •••• •••• ••••");
          setCardExpiry("••/••");
          setCardBrand("generic");
        }
      });

      setStripe(stripeInstance);
      setElements(elementsInstance);
      setCardElement(cardElementInstance);
      console.log("Stripe initialization successful");
    } catch (error) {
      console.error("Error initializing Stripe:", error);
      toast.error(
        "Failed to initialize payment system. Please refresh and try again."
      );
    }
  };

  const handleCardholderNameChange = (value: string) => {
    const updatedForm = [...paymentForm];
    const nameFieldIndex = paymentForm.findIndex(
      (f) => f.name === "cardholderName"
    );
    if (nameFieldIndex !== -1) {
      updatedForm[nameFieldIndex].value = value;
      setPaymentForm(updatedForm);
    }
  };

  const handlePaymentSubmit = async (): Promise<boolean> => {
    if (!stripe || !elements || !cardElement || !clientSecret) {
      toast.error("Payment system not ready. Please try again.");
      return false;
    }

    console.log(
      "Starting payment submission with clientSecret:",
      clientSecret.substring(0, 20) + "..."
    );
    setProcessing(true);

    const cardholderName =
      paymentForm.find((f) => f.name === "cardholderName")?.value || "";

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName,
            },
          },
        }
      );

      if (error) {
        toast.error(error.message || "Payment failed. Please try again.");
        setProcessing(false);
        return false;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful! Verifying...");

        // Call verification endpoint
        try {
          //   const response = await fetch("/stocks/reserve/payment-confirmation", {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       paymentIntentId: paymentIntent.id,
          //       reservationSecret: reservationSecret,
          //     }),
          //   });
          const body = {
            paymentIntentId: paymentIntent.id,
            reservationSecret: reservationSecret,
          };
          const response = await postApi(
            `/stocks/reserve/payment-confirmation`,
            body,
            dealerAuthToken
          );

          if (response.isSuccess) {
            if (onPaymentSuccess) {
              onPaymentSuccess();
            }
            return true;
          } else {
            toast.error("Payment verification failed.");
            setProcessing(false);
            return false;
          }
        } catch (verificationError) {
          console.error("Error verifying payment:", verificationError);
          toast.error("An error occurred during payment verification.");
          setProcessing(false);
          return false;
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
      setProcessing(false);
      return false;
    }

    setProcessing(false);
    return false;
  };

  const getCardholderName = () => {
    const nameField = paymentForm.find((f) => f.name === "cardholderName");
    return nameField?.value || "CARDHOLDER NAME";
  };

  // Expose the payment handler for the modal to use
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).stripePaymentHandler = handlePaymentSubmit;
    }
  }, [stripe, elements, cardElement, clientSecret, reservationSecret]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Secure Payment</h2>
        <p className="text-sm text-gray-600">
          Your payment is processed securely with Stripe. Enter your card
          details below.
        </p>
      </div>

      {/* Card Preview */}
      <div className="flex justify-center mb-8">
        <div className="relative group">
          {/* Card Shadow/Glow */}
          <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

          {/* Main Card */}
          <div className="relative w-[400px] h-[260px] bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
            {/* Premium Background Texture */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-8 right-8 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute top-12 right-12 w-24 h-24 border border-white/10 rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/10 rounded-full"></div>
              </div>
            </div>

            {/* Metallic Shine Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-60"></div>

            {/* Card Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              {/* Header Section */}
              <div className="flex justify-between items-start">
                {/* Card Brand Logo */}
                <div className="flex items-center space-x-3">
                  <div className="text-white font-black text-2xl tracking-widest filter drop-shadow-lg">
                    {cardBrand.toUpperCase()}
                  </div>
                  <div className="text-white/60 text-xs font-light tracking-widest uppercase">
                    Premium
                  </div>
                </div>

                {/* Contactless Payment Symbol */}
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <div className="w-4 h-4">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full text-white/80"
                      >
                        <path
                          fill="currentColor"
                          d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8.5,8.5A3.5,3.5 0 0,1 12,5A3.5,3.5 0 0,1 15.5,8.5A3.5,3.5 0 0,1 12,12A3.5,3.5 0 0,1 8.5,8.5M12,7A1.5,1.5 0 0,0 10.5,8.5A1.5,1.5 0 0,0 12,10A1.5,1.5 0 0,0 13.5,8.5A1.5,1.5 0 0,0 12,7Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* EMV Chip */}
              <div className="absolute top-[72px] left-8">
                <div className="w-12 h-9 bg-linear-to-b from-amber-200 via-yellow-300 to-amber-400 rounded-lg shadow-lg border-2 border-amber-500/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-amber-800/30 rounded-md"></div>
                  <div className="absolute inset-1 bg-linear-to-b from-amber-100 to-amber-300 rounded-sm"></div>
                  <div className="absolute inset-0 grid grid-cols-3 gap-px p-1">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-amber-600/40 rounded-[1px]"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Number */}
              <div className="pt-16">
                <div className="text-white text-2xl font-mono tracking-[0.25em] filter drop-shadow-lg font-light">
                  {cardNumber}
                </div>
              </div>

              {/* Bottom Information */}
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-gray-300/80 text-[10px] uppercase tracking-[0.15em] font-medium">
                    Card Holder
                  </div>
                  <div className="text-white text-base font-medium tracking-wide filter drop-shadow-sm uppercase">
                    {getCardholderName()}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-gray-300/80 text-[10px] uppercase tracking-[0.15em] font-medium">
                    Valid Thru
                  </div>
                  <div className="text-white text-base font-mono filter drop-shadow-sm">
                    {cardExpiry}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Shine Animation */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        {/* Cardholder Name */}
        <div className="flex flex-col">
          <label
            className="mb-2 text-sm font-medium text-gray-700"
            htmlFor="cardholdername"
          >
            Cardholder Name <span className="text-red-500">*</span>
          </label>
          <input
            id="cardholdername"
            ref={cardholderNameRef}
            type="text"
            required
            placeholder="Name as shown on card"
            value={
              paymentForm.find((f) => f.name === "cardholderName")?.value || ""
            }
            onChange={(e) => handleCardholderNameChange(e.target.value)}
            className={inputFieldsClasses}
          />
        </div>

        {/* Stripe Card Element */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Card Details <span className="text-red-500">*</span>
          </label>
          <div
            ref={cardElementRef}
            className="border border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary"
          />
        </div>
      </div>

      {/* Payment Message */}
      <div id="payment-message" className="text-sm"></div>

      {/* Security and Processing Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Stripe Secure
              </h3>
              <p className="text-xs text-green-700 mt-1">
                Powered by Stripe's enterprise-grade security.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Refundable</h3>
              <p className="text-xs text-blue-700 mt-1">
                Full refund if you decide not to proceed with the purchase.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Secure Payment:</strong> Your card details are processed
              directly by Stripe and never stored on our servers. You will be
              charged £99 to secure your reservation.
            </p>
          </div>
        </div>
      </div>

      {/* Processing Indicator */}
      {processing && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            <span className="text-sm text-blue-800">
              Processing your payment...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

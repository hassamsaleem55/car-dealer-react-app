import { useState, useEffect } from "react";
import { toast } from "sonner";
import { postApi } from "@core-dir/services/Api.service";
import { useDealerContext } from "@core-dir/dealer-provider";
import DotLoader from "@components-dir/loader";
import { useStripeCard } from "@core-dir/hooks/useStripeCard";
import CardPreview from "../payment-card-preview";

type PaymentField = {
  name: string;
  value: string;
};

function getValue(form: PaymentField[], name: string) {
  return form.find((f) => f.name === name)?.value ?? "";
}

function updateValue(
  form: PaymentField[],
  setForm: (form: PaymentField[]) => void,
  name: string,
  value: string
) {
  setForm(form.map((f) => (f.name === name ? { ...f, value } : f)));
}

export default function PaymentCardForm({
  paymentForm,
  setPaymentForm,
  clientSecret,
  publishableKey,
  reservationSecret,
  onPaymentSuccess,
}: any) {
  const { dealerAuthToken } = useDealerContext();
  const [processing, setProcessing] = useState(false);
  const { stripe, cardElement, cardRef, brand } = useStripeCard(
    publishableKey,
    clientSecret
  );

  const cardholderName = getValue(paymentForm, "cardholderName");

  const submitPayment = async () => {
    if (!stripe || !cardElement || !clientSecret) {
      toast.error("Payment system not ready.");
      return false;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardholderName },
          },
        }
      );

      if (error) throw error;

      const response = await postApi(
        `/stocks/reserve/payment-confirmation`,
        {
          paymentIntentId: paymentIntent.id,
          reservationSecret,
        },
        dealerAuthToken
      );

      if (!response.isSuccess) throw new Error("Payment verification failed.");

      toast.success("Payment successful!");
      onPaymentSuccess?.();
      return true;
    } catch (e: any) {
      toast.error(e.message || "Payment failed.");
      return false;
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    (window as any).stripePaymentHandler = submitPayment;
  }, [stripe, cardElement, clientSecret, reservationSecret]);

  const inputClasses =
    "border border-gray-300 p-3 text-sm rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary w-full";

  return (
    <div className="space-y-6">
      <CardPreview brand={brand} cardholderName={cardholderName} />

      {/* Cardholder Name */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium">
          Cardholder Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Name as shown on card"
          value={cardholderName}
          onChange={(e) =>
            updateValue(
              paymentForm,
              setPaymentForm,
              "cardholderName",
              e.target.value
            )
          }
          className={inputClasses}
        />
      </div>

      {/* Stripe Card Element */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium">
          Card Details <span className="text-red-500">*</span>
        </label>
        <div
          ref={cardRef}
          className="border border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary"
        />
      </div>

      {processing && <DotLoader text="Processing payment..." />}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    Stripe: any;
  }
}

export function useStripeCard(publishableKey?: string, clientSecret?: string) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [stripe, setStripe] = useState<any>(null);
  const [cardElement, setCardElement] = useState<any>(null);
  const [brand, setBrand] = useState("generic");

  useEffect(() => {
    if (!publishableKey || !clientSecret) return;

    const loadStripe = () => {
      try {
        const stripeInstance = window.Stripe(publishableKey);
        const elements = stripeInstance.elements();
        const card = elements.create("card");
        card.mount(cardRef.current);

        card.on("change", (e: any) => {
          setBrand(e.complete ? e.brand ?? "generic" : "generic");
        });

        setStripe(stripeInstance);
        setCardElement(card);
      } catch (err) {
        console.error(err);
        toast.error("Failed to initialize payment system.");
      }
    };

    if (!window.Stripe) {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.async = true;
      script.onload = loadStripe;
      document.head.appendChild(script);
    } else {
      loadStripe();
    }
  }, [publishableKey, clientSecret]);

  return { stripe, cardElement, cardRef, brand };
}

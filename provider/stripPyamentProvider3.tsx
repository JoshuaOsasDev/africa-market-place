"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import axios from "axios";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
); // your key

export default function StripProvider() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    axios
      .post(
        "https://africarmarketplaceserver-9285e6ea6a8d.herokuapp.com/api/payment-intents",
        {
          amount: 5000,
          currency: "gbp",
          receipt_email: "ukonulucky@gmail.com",
          userId: "69736e1c3afb5291f8075c3d",
        },
      )
      .then((res) => setClientSecret(res.data.client_secret));
  }, []);

  if (!clientSecret) return <div>Loading payment...</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}

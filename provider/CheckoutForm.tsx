"use client";

import {
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });

      if (error) {
        toast.success("Payment failed")
      console.error(error.message);
      }
      toast.success("payment successful")
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 🔥 This shows Google Pay / Apple Pay */}
          <ExpressCheckoutElement
              onConfirm={() => { console.log("confrimed") }}
              
          />

      <div style={{ margin: "20px 0" }}>Or pay with card</div>

      {/* 💳 This shows card + saved cards */}
      <PaymentElement />

      <button type="submit">Pay now</button>
    </form>
  );
}

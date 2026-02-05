"use client";

import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();

      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement)!;
      if (!cardElement) throw new Error("Failed to load stripe");
      // Create payment intent on the backend
      const { data } = await axios.post(
        "http://localhost:9000/api/payment-intents",
        {
          amount: 5000,
          currency: "gbp",
          receipt_email: "ukonulucky@gmail.com",
          userId: "69736e1c3afb5291f8075c3d",
        },
      );

      //console.log("paymentIntent:", data)
      const { client_secret } = data;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Ukonu Lucky",
          },
        },
      });

      if (result.error) {
        // Show error to your customer

        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // Payment succeeded]
          // console.log("payment result:", result);
          // console.log("Payment successful!");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || error.message || "Payment error";
        toast.error(errorMessage);
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default page;

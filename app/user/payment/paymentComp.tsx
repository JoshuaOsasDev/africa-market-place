"use client";

import { getUserOrderId } from "@/services/apiServices/userDashboard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Styling for the Stripe Element
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function PaymentForm({ orderId }: { orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [order, setOrder] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const route = useRouter();
  // console.log(order?.data, "order");

  const orders = order?.data;
  const createPaymentIntent = async (orderData: any) => {
    try {
      const { data } = await axios.post(
        "https://africarmarketplaceserver-9285e6ea6a8d.herokuapp.com/api/payment-intents",
        {
          amount: 1,
          currency: orderData?.data.currency,
          receipt_email: orderData?.data.user?.email,
          userId: orderData?.data.user?._id,
          orderId: orderData?.data._id,
          email: orderData?.data.user?.email,
        },
      );

      setPaymentIntent(data.client_secret);
    } catch (error) {
      console.log(error, "Error 1");
      toast.error(
        "Payment intent not automatically created, Please fill in Card details to Proceed",
      );
    }
  };

  useEffect(() => {
    const initPayment = async () => {
      try {
        if (!orderId) return;

        // 1. Fetch order
        const res = await getUserOrderId(orderId);
        // console.log(res, "res");
        const orderData = res; //
        if (!orderData) throw new Error("Order not found");

        setOrder(orderData);

        // 2. Pass directly (DO NOT rely on state here)
        await createPaymentIntent(orderData);
      } catch (error) {
        console.log(error, "data fecth Error, 'Order'");
        toast.error("Fialed to fecth Orders Details");
      }
    };

    initPayment();
  }, [orderId]);
  const handleSubmit = async (event: any) => {
    try {
      setIsProcessing(true);
      event.preventDefault();

      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement)!;
      if (!cardElement) throw new Error("Failed to load stripe");

      let client_secret = paymentIntent;
      if (!paymentIntent) {
        // Create payment intent on the backend
        const { data } = await axios.post(
          "https://africarmarketplaceserver-9285e6ea6a8d.herokuapp.com/api/payment-intents",
          {
            amount: 1,
            currency: orders?.data.currency,
            receipt_email: orders?.data.user?.email,
            userId: orders?.data.user?._id,
            orderId: orders?.data._id,
            email: orders?.data.user?.email,
          },
        );

        client_secret = data.client_secret;
        //console.log(client_secret, "secret");
      }

      if (!client_secret) throw new Error("Payment Failed, please retry");
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: order.user?.firstName,
          },
        },
      });

      //console.log("result", result);

      if (result.error) {
        // Show error to your customer

        console.error(result.error.message);
        alert(result.error.message);
        console.log(result.error, "ERROR-2");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setPaymentIntent(null);
          route.replace(`/user/payment/payment-confirmation/${orderId}`);
          //toast.success("Payment succcessful");
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
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-6 my-10 max-w-sm rounded-xl border border-gray-100 bg-white p-3 shadow-lg sm:mx-auto md:mx-auto md:max-w-md md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        <p className="text-sm text-gray-500">
          Complete your purchase by providing your payment details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Card Details
          </label>
          <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 transition-all focus-within:ring-2 focus-within:ring-blue-500">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 py-4">
          <span className="text-gray-600">Total Amount</span>
          <span className="text-xl font-bold text-gray-900">
            £{orders?.total?.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isProcessing ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            "Pay Securely"
          )}
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          🔒 Secure payment powered by Stripe
        </p>
      </form>
    </div>
  );
}

export default PaymentForm;

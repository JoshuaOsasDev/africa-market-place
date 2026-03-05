// "use client";

// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
// import { useState } from "react";

// export default function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: "http://localhost:3000/success",
//       },
//     });

//     if (error) {
//       toast.error(error.message || "Payment failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
//       >
//         <h2 className="mb-6 text-2xl font-bold">Complete Payment</h2>

//         <PaymentElement />

//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className="mt-6 w-full rounded-lg bg-black py-3 text-white"
//         >
//           {loading ? "Processing..." : "Pay £50"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Replace with your actual return URL
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-md rounded-xl border border-gray-100 bg-white p-8 shadow-md"
    >
      <h2 className="mb-6 text-xl font-bold text-gray-800">Secure Checkout</h2>

      {/* Stripe's smart UI component */}
      <PaymentElement className="mb-6" />

      <button
        disabled={isProcessing || !stripe || !elements}
        className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition-all hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isProcessing ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
}

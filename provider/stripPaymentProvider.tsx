"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function StripProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

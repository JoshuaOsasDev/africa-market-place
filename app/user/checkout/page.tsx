import { getMockCheckoutSummary } from "@/lib/data/mockCheckout";
import { CheckoutPageClient } from "./checkoutPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Africa Marketplace",
  description: "Complete your purchase securely.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}

import { getMockCart } from "@/lib/data/mockCart";
import { CartPageClient } from "./CartPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - Africa Marketplace",
  description: "Review your cart and proceed to checkout.",
};

export default function CartPage() {
  const cart = getMockCart();

  return <CartPageClient initialCart={cart} />;
}
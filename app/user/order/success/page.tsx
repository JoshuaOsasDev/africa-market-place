import { getMockOrderDetails } from "@/lib/data/mockOrder";
import { OrderSuccessClient } from "./OrderSuccessClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful - Africa Marketplace",
  description: "Your order has been placed successfully.",
};

export default function OrderSuccessPage() {
  const orderDetails = getMockOrderDetails();

  return <OrderSuccessClient orderDetails={orderDetails} />;
}
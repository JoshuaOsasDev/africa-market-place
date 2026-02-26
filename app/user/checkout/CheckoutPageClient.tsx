"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContactInformationForm } from "@/components/checkout/ContactInformationForm";
import { ShippingAddressForm } from "@/components/checkout/ShippingAddressForm";
import { PaymentMethodForm } from "@/components/checkout/PaymentMethodForm";
import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary";
import {
  CheckoutFormData,
  CheckoutSummary,
  ContactInformation,
  ShippingAddress,
  PaymentMethod,
  CardPayment,
} from "@/types/checkout";

interface CheckoutPageClientProps {
  initialSummary: CheckoutSummary;
}

export function CheckoutPageClient({
  initialSummary,
}: CheckoutPageClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<CheckoutSummary>(initialSummary);

  const [contact, setContact] = useState<ContactInformation>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [shipping, setShipping] = useState<ShippingAddress>({
    streetAddress: "",
    country: "",
    townCity: "",
    state: "",
    zipCode: "",
  });

  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [cardDetails, setCardDetails] = useState<CardPayment>({
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const handleQuantityChange = (id: string, quantity: number) => {
    setSummary((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );

      const subtotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return {
        ...prev,
        items: updatedItems,
        subtotal,
        total: subtotal + (prev.shipping === "Free" ? 0 : prev.shipping),
      };
    });
  };

  const handleRemove = (id: string) => {
    setSummary((prev) => {
      const updatedItems = prev.items.filter((item) => item.id !== id);

      const subtotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return {
        ...prev,
        items: updatedItems,
        subtotal,
        total: subtotal + (prev.shipping === "Free" ? 0 : prev.shipping),
      };
    });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // console.log("Order placed:", {
      //   contact,
      //   shipping,
      //   useDifferentBilling,
      //   paymentMethod,
      //   cardDetails: paymentMethod === "card" ? cardDetails : null,
      //   summary,
      // });

      router.push("/order/success");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (summary.items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-[#111827]">
            Your cart is empty
          </h1>
          <p className="mb-6 text-[#6F6F6F]">
            Add some items to your cart before checking out.
          </p>
          <Link href="/products">
            <button className="rounded-full bg-[#2E7D32] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#246628]">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-[#111827] transition-colors hover:text-[#2E7D32]"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to shop</span>
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <ContactInformationForm values={contact} onChange={setContact} />

            <ShippingAddressForm
              values={shipping}
              onChange={setShipping}
              useDifferentBilling={useDifferentBilling}
              onBillingChange={setUseDifferentBilling}
            />

            <PaymentMethodForm
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              cardDetails={cardDetails}
              onCardDetailsChange={setCardDetails}
            />
          </div>

          <div className="h-fit lg:sticky lg:top-8">
            <CheckoutOrderSummary
              summary={summary}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              onPlaceOrder={handlePlaceOrder}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

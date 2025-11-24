"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactInformationForm } from "@/components/checkout/ContactInformationForm";
import { ShippingAddressForm } from "@/components/checkout/ShippingAddressForm";
import { PaymentMethodForm } from "@/components/checkout/PaymentMethodForm";
import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary";
import {
  CheckoutSummary,
  ContactInformation,
  ShippingAddress,
  PaymentMethod,
  CardPayment,
} from "@/types/checkout";

interface CheckoutPageClientProps {
  initialSummary: CheckoutSummary;
}

export function CheckoutPageClient({ initialSummary }: CheckoutPageClientProps) {
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
        item.id === id ? { ...item, quantity } : item
      );

      const subtotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
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
        0
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

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Order placed:", {
      contact,
      shipping,
      useDifferentBilling,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : null,
      summary,
    });

    alert("Order placed successfully!");
    setLoading(false);
  };

  if (summary.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827] mb-4">
            Your cart is empty
          </h1>
          <p className="text-[#6F6F6F] mb-6">
            Add some items to your cart before checking out.
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold rounded-full transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[#111827] hover:text-[#2E7D32] transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <ContactInformationForm
              values={contact}
              onChange={setContact}
            />

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

          <div className="lg:sticky lg:top-8 h-fit">
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
"use client";

import { useState } from "react";
import { CheckoutOrderItem } from "@/components/checkout/checkoutOrderItem";
import {
  CheckoutSummary,
  CheckoutOrderItem as OrderItemType,
} from "@/types/checkout";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { CartItem } from "@/types/cart";

interface CheckoutOrderSummaryProps {
  summary: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onPlaceOrder: () => void;
  loading?: boolean;
  className?: string;
}

export function CheckoutOrderSummary({
  summary,
  onQuantityChange,
  onRemove,
  onPlaceOrder,
  loading = false,
  className,
}: CheckoutOrderSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  const subtotal = useAppSelector((state) => state.product.checkout.subtotal);
  const total = useAppSelector((state) => state.product.checkout.total);
  const discount = useAppSelector((state) => state.product.checkout.discount);
  const shipping = useAppSelector((state) => state.product.checkout.shipping);

  const shippingDisplay = shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`;

  return (
    <div
      className={cn(
        "rounded-lg border border-[#E5E7EB] bg-white p-6",
        className,
      )}
    >
      <h2 className="mb-4 text-xl font-semibold text-[#111827]">
        Order summary
      </h2>

      <div className="mb-4 space-y-0">
        {summary.map((item) => (
          <CheckoutOrderItem
            key={item.pid}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      {/* <div className="flex items-center gap-2 border-t border-[#E5E7EB] py-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Input"
          className="flex-1 rounded-lg border border-[#E5E7EB] px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
        />
        <button className="rounded-full bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#246628]">
          Place Order
        </button>
      </div> */}

      <div className="space-y-3 border-t border-[#E5E7EB] pt-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#111827]">Shipping</span>
          <span className="font-medium text-[#111827]">{shippingDisplay}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-[#111827]">Subtotal</span>
          <span className="font-medium text-[#111827]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3">
          <span className="text-lg font-bold text-[#111827]">Total</span>
          <span className="text-xl font-bold text-[#111827]">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={loading || summary.length === 0}
        className="mt-6 w-full rounded-full bg-[#2E7D32] py-3 font-semibold text-white transition-colors hover:bg-[#246628] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}

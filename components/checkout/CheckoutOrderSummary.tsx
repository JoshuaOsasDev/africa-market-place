"use client";

import { useState } from "react";
import { CheckoutOrderItem } from "@/components/checkout/CheckoutOrderItem";
import { CheckoutSummary, CheckoutOrderItem as OrderItemType } from "@/types/checkout";
import { cn } from "@/lib/utils";

interface CheckoutOrderSummaryProps {
  summary: CheckoutSummary;
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

  const shippingDisplay =
    summary.shipping === "Free" ? "Free" : `$${summary.shipping.toFixed(2)}`;

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-[#E5E7EB] p-6",
        className
      )}
    >
      <h2 className="text-[#111827] text-xl font-semibold mb-4">Order summary</h2>

      <div className="space-y-0 mb-4">
        {summary.items.map((item) => (
          <CheckoutOrderItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 py-4 border-t border-[#E5E7EB]">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Input"
          className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
        />
        <button
          className="px-4 py-2 bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold text-sm rounded-full transition-colors"
        >
          Place Order
        </button>
      </div>

      <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <span className="text-[#111827] font-medium">Shipping</span>
          <span className="text-[#111827] font-medium">{shippingDisplay}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#111827] font-medium">Subtotal</span>
          <span className="text-[#111827] font-medium">
            ${summary.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <span className="text-[#111827] font-bold text-lg">Total</span>
          <span className="text-[#111827] font-bold text-xl">
            ${summary.total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={loading || summary.items.length === 0}
        className="w-full mt-6 py-3 bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
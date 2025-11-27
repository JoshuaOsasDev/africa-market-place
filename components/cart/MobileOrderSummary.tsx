"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CartItem, CartSummary } from "@/types/cart";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { cn } from "@/lib/utils";

interface MobileOrderSummaryProps {
  items: CartItem[];
  summary: CartSummary;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onApplyCoupon: (code: string) => void;
  className?: string;
}

export function MobileOrderSummary({
  items,
  summary,
  onQuantityChange,
  onRemove,
  onApplyCoupon,
  className,
}: MobileOrderSummaryProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim());
    }
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-4", className)}>
      <h2 className="text-[#111827] text-xl font-bold mb-4">Order summary</h2>

      <div className="space-y-0">
        {items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 py-4 border-t border-[#E5E7EB]">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Input"
          className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
        />
        <button
          onClick={handleApplyCoupon}
          className="px-4 py-2 bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold text-sm rounded-full transition-colors"
        >
          Place Order
        </button>
      </div>

      <div className="space-y-3 mt-4 pt-4 border-t border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <span className="text-[#111827] font-medium">Shipping</span>
          <span className="text-[#111827]">
            {summary.shipping === "Free" ? "Free" : `$${summary.shipping}`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#111827] font-medium">Subtotal</span>
          <span className="text-[#111827]">${summary.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <span className="text-[#111827] font-bold text-lg">Total</span>
          <span className="text-[#111827] font-bold text-xl">
            ${summary.total.toFixed(2)}
          </span>
        </div>
      </div>

      <Link href="/checkout" className="block mt-6">
        <button className="w-full py-3 bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold rounded-full transition-colors">
          Proceed to checkout
        </button>
      </Link>
    </div>
  );
}
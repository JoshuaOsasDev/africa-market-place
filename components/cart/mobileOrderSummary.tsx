"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CartItem } from "@/types/cart";
import { CartItemCard } from "@/components/cart/cartItemCard";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";

interface MobileOrderSummaryProps {
  items: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isRemoving: boolean;
  onApplyCoupon: (code: string) => void;
  removingVariables: any;
  className?: string;
}

export function MobileOrderSummary({
  items,
  onQuantityChange,
  onRemove,
  isRemoving,
  onApplyCoupon,
  removingVariables,
  className,
}: MobileOrderSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  //const subtotal = items.price * items?.quantity;
  const subtotal = useAppSelector((state) => state.product.checkout.subtotal);
  const total = useAppSelector((state) => state.product.checkout.total);
  const discount = useAppSelector((state) => state.product.checkout.discount);
  const shipping = useAppSelector((state) => state.product.checkout.shipping);

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim());
    }
  };

  return (
    <div className={cn("rounded-lg bg-white p-4 shadow-sm", className)}>
      <h2 className="mb-4 text-xl font-bold text-[#111827]">Order summary</h2>

      <div className="space-y-0">
        {items.map((item) => (
          <CartItemCard
            key={item.pid}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
            isRemoving={isRemoving && removingVariables?.pid?.pid === item?.pid}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-[#E5E7EB] py-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Input"
          className="flex-1 rounded-lg border border-[#E5E7EB] px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
        />
        <button
          onClick={handleApplyCoupon}
          className="rounded-full bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#246628]"
        >
          Place Order
        </button>
      </div>

      <div className="mt-4 space-y-3 border-t border-[#E5E7EB] pt-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#111827]">Shipping</span>
          <span className="text-[#111827]">
            {shipping === 0 ? "Free" : `£${shipping?.toFixed(2)}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6F6F6F]">Discount:</span>
            <span className="font-medium text-[#2E7D32]">
              -£{discount?.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="font-medium text-[#111827]">Subtotal</span>
          <span className="text-[#111827]">£{subtotal?.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3">
          <span className="text-lg font-bold text-[#111827]">Total</span>
          <span className="text-xl font-bold text-[#111827]">
            £{total?.toFixed(2)}
          </span>
        </div>
      </div>

      <Link href="/user/checkout" className="mt-6 block">
        <button className="w-full rounded-full bg-[#2E7D32] py-3 font-semibold text-white transition-colors hover:bg-[#246628]">
          Proceed to checkout
        </button>
      </Link>
    </div>
  );
}

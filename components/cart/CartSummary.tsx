"use client";

import React from "react";
import Link from "next/link";
import { CartSummary as CartSummaryType } from "@/types/cart";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  summary: CartSummaryType;
  className?: string;
}

export function CartSummary({ summary, className }: CartSummaryProps) {
  const shippingDisplay =
    summary.shipping === "Free" ? "Free" : `$${summary.shipping.toFixed(2)}`;

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-[#E5E7EB] p-6",
        className
      )}
    >
      <h2 className="text-[#111827] text-lg font-semibold mb-4">Cart Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-[#6F6F6F] text-sm">Subtotal:</span>
          <span className="text-[#111827] font-medium">
            ${summary.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#6F6F6F] text-sm">Shipping:</span>
          <span className="text-[#111827] font-medium">{shippingDisplay}</span>
        </div>

        {summary.discount && summary.discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[#6F6F6F] text-sm">Discount:</span>
            <span className="text-[#2E7D32] font-medium">
              -${summary.discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <span className="text-[#111827] font-semibold">Total:</span>
          <span className="text-[#111827] font-bold text-lg">
            ${summary.total.toFixed(2)}
          </span>
        </div>
      </div>

      <Link href="/checkout">
        <button className="w-full py-3 bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold rounded-full transition-colors">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}
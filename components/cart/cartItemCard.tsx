"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { QuantityInput } from "@/components/common/quantityInput";
import { CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  className?: string;
}

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  className,
}: CartItemCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 border-b border-[#E5E7EB] py-4",
        className,
      )}
    >
      {/* Product Image */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#F9FAFB]">
        {item?.images?.[0] && (
          <Image
            src={item?.images?.[0]?.url}
            alt={item.name}
            fill
            className="object-contain p-1"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-[#111827]">{item.name}</h3>
          <span className="text-sm font-semibold whitespace-nowrap text-[#111827]">
            £{(item.salePrice * item.quantity).toFixed(2)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantityInput
            value={item.quantity}
            onChange={(qty) => onQuantityChange(item.pid, qty)}
            min={1}
            // max={item.maxQuantity}
            className="origin-left scale-75"
          />
          <button
            onClick={() => onRemove(item.pid)}
            className="p-1 text-[#9CA3AF] transition-colors hover:text-[#FF0000]"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

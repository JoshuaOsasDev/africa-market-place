"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { QuantityInput } from "../common/quantityInput";
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
        "flex items-start gap-3 py-4 border-b border-[#E5E7EB]",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative w-16 h-16 bg-[#F9FAFB] rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-1"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[#111827] font-medium text-sm">{item.name}</h3>
          <span className="text-[#111827] font-semibold text-sm whitespace-nowrap">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <QuantityInput
            value={item.quantity}
            onChange={(qty) => onQuantityChange(item.id, qty)}
            min={1}
            max={item.maxQuantity}
            className="scale-75 origin-left"
          />
          <button
            onClick={() => onRemove(item.id)}
            className="text-[#9CA3AF] hover:text-[#FF0000] transition-colors p-1"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
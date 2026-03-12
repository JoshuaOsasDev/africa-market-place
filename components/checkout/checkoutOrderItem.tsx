"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { QuantityInput } from "@/components/common/quantityInput";
import { CheckoutOrderItem as OrderItemType } from "@/types/checkout";
import { cn } from "@/lib/utils";

interface CheckoutOrderItemProps {
  item: OrderItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  className?: string;
}

export function CheckoutOrderItem({
  item,
  onQuantityChange,
  onRemove,
  className,
}: CheckoutOrderItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 py-3 border-b border-[#E5E7EB] last:border-b-0",
        className
      )}
    >
      <div className="relative w-14 h-14 bg-[#F9FAFB] rounded-lg overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-1"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-[#111827] font-medium text-sm">{item.name}</h4>
          <span className="text-[#111827] font-semibold text-sm whitespace-nowrap">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <QuantityInput
            value={item.quantity}
            onChange={(qty) => onQuantityChange(item.id, qty)}
            min={1}
            max={99}
            className="scale-75 origin-left"
          />
          <button
            onClick={() => onRemove(item.id)}
            className="text-[#FF0000] hover:text-[#CC0000] transition-colors p-1"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
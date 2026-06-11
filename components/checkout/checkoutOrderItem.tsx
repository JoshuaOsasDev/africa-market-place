"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { QuantityInput } from "@/components/common/quantityInput";

import { cn } from "@/lib/utils";
import { CartItem } from "@/types/cart";

interface CheckoutOrderItemProps {
  item: CartItem;
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
  // console.log(item, "item");
  return (
    <div
      className={cn(
        "flex items-start gap-3 border-b border-[#E5E7EB] py-3 last:border-b-0",
        className,
      )}
    >
      {item?.images && (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F9FAFB]">
          <Image
            src={item?.images[0]?.url ?? ""}
            alt={item?.name}
            fill
            className="object-contain p-1"
          />
        </div>
      )}

      {/* Product Info */}
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-[#111827]">{item.name}</h4>
          <span className="text-sm font-semibold whitespace-nowrap text-[#111827]">
            £{(item.salePrice * item.quantity).toFixed(2)}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <QuantityInput
            value={item.quantity}
            onChange={(quantity) => onQuantityChange(item.pid, quantity)}
            min={1}
            max={99}
            className="origin-left scale-75"
          />
          <button
            onClick={() => onRemove(item?.slug)}
            className="p-1 text-[#FF0000] transition-colors hover:text-[#CC0000]"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

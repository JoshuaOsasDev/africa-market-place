"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { QuantityInput } from "@/components/common/quantityInput";
import { CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isRemoving: boolean;
  className?: string;
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
  isRemoving,
  className,
}: CartItemRowProps) {
  const subtotal = item?.salePrice || item?.price * item?.quantity;
  console.log(item, "item from cart");
  return (
    <div
      className={cn(
        "grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 border-b border-[#E5E7EB] py-4",
        className,
      )}
    >
      {/* Product */}
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F9FAFB]">
          {item?.images && (
            <Image
              src={item.images[0].url}
              alt={item.name}
              fill
              className="object-contain p-1"
            />
          )}
        </div>
        <span className="text-sm font-medium text-[#111827]">{item.name}</span>
      </div>

      <div className="text-sm text-[#111827]">
        £{item?.salePrice?.toFixed(2)}
      </div>

      <div className="flex justify-center">
        <QuantityInput
          value={item?.quantity}
          onChange={(qty) => onQuantityChange(item?.pid, qty)}
          min={1}
          // max={item.maxQuantity}
          className="scale-90"
        />
      </div>

      <div className="text-sm font-semibold text-[#111827]">
        £{subtotal?.toFixed(2)}
      </div>

      <button
        onClick={() => onRemove(item?.pid)}
        className="p-1 transition-colors hover:text-[#FF0000] disabled:cursor-not-allowed disabled:text-[#9CA3AF]"
        aria-label="Remove item"
        disabled={isRemoving}
      >
        <X size={18} />
      </button>
    </div>
  );
}

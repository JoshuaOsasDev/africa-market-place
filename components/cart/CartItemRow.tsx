"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { QuantityInput } from "../common/quantityInput";
import { CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  className?: string;
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
  className,
}: CartItemRowProps) {
  const subtotal = item.price * item.quantity;

  return (
    <div
      className={cn(
        "grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-4 border-b border-[#E5E7EB]",
        className
      )}
    >
      {/* Product */}
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 bg-[#F9FAFB] rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-1"
          />
        </div>
        <span className="text-[#111827] font-medium text-sm">{item.name}</span>
      </div>

      <div className="text-[#111827] text-sm">${item.price.toFixed(2)}</div>

      <div className="flex justify-center">
        <QuantityInput
          value={item.quantity}
          onChange={(qty) => onQuantityChange(item.id, qty)}
          min={1}
          max={item.maxQuantity}
          className="scale-90"
        />
      </div>

      <div className="text-[#111827] font-semibold text-sm">
        ${subtotal.toFixed(2)}
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-[#9CA3AF] hover:text-[#FF0000] transition-colors p-1"
        aria-label="Remove item"
      >
        <X size={18} />
      </button>
    </div>
  );
}
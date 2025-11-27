"use client";

import React from "react";
import { QuantityInput } from "@/components/common/quantityInput";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/common/iconButton";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
  onAddToCart: () => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
  inStock?: boolean;
  maxQuantity?: number;
  loading?: boolean;
  className?: string;
}

export function ProductQuantitySelector({
  quantity,
  onQuantityChange,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  inStock = true,
  maxQuantity = 999,
  loading = false,
  className,
}: ProductQuantitySelectorProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <QuantityInput
        value={quantity}
        onChange={onQuantityChange}
        min={1}
        max={maxQuantity}
        disabled={!inStock || loading}
      />

      <Button
        onClick={onAddToCart}
        disabled={!inStock || loading}
        className="flex-1 h-12 bg-[#2E7D32] hover:bg-[#246628] text-white rounded-full font-semibold text-base gap-2"
      >
        <ShoppingCart size={20} />
        {loading ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
      </Button>

      {onToggleWishlist && (
        <IconButton
          variant={isWishlisted ? "active" : "default"}
          size="lg"
          onClick={onToggleWishlist}
          icon={
            <Heart
              size={20}
              fill={isWishlisted ? "#FF0000" : "none"}
              className="transition-all"
            />
          }
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        />
      )}
    </div>
  );
}
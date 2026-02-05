"use client";

import React from "react";
import { QuantityInput } from "@/components/common/quantityInput";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/common/iconButton";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/store";
import { addCart } from "@/redux/slices/product";
import { Product } from "@/types/product";

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
  inStock?: boolean;
  maxQuantity?: number;
  loading?: boolean;
  className?: string;
  product: Product;
}

export function ProductQuantitySelector({
  quantity,
  onQuantityChange,
  onToggleWishlist,
  isWishlisted = false,
  inStock = true,
  maxQuantity = 999,
  loading = false,
  product,
  className,
}: ProductQuantitySelectorProps) {
  const dispacth = useAppDispatch();

  //console.log(isWishlisted, "isWishlisted");
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
        onClick={() => dispacth(addCart({ product, quantity }))}
        disabled={!inStock || loading}
        className="h-12 flex-1 gap-2 rounded-full bg-[#2E7D32] text-base font-semibold text-white hover:bg-[#246628]"
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

"use client";
import { QuantityInput } from "@/components/common/quantityInput";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/common/iconButton";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { useCart } from "@/lib/hooks/useCart";

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
  const { isInCart, addToCart, removeFromCart, isAdding, isRemoving } =
    useCart(product);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <QuantityInput
        value={quantity}
        onChange={onQuantityChange}
        min={1}
        max={maxQuantity}
        disabled={!inStock || loading}
      />

      {isInCart ? (
        <Button
          onClick={handleRemoveFromCart}
          disabled={isRemoving}
          className="h-12 flex-1 gap-2 rounded-full bg-red-500 text-base font-semibold text-white hover:bg-[#246628]"
        >
          <ShoppingCart size={20} />
          {isRemoving ? "Removing..." : "Remove from Cart"}
        </Button>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={!inStock || loading || isAdding}
          className="h-12 flex-1 gap-2 rounded-full bg-[#2E7D32] text-base font-semibold text-white hover:bg-[#246628]"
        >
          <ShoppingCart size={20} />
          {isAdding ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      )}

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

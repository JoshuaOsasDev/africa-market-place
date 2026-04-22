"use client";

import React, { useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextStyle from "@/components/common/textStyle";
import { Product } from "@/types/product";
import { useCart } from "@/lib/hooks/useCart";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export function CartButton({
  product,
  quantity = 1,
  className,
}: CartButtonProps) {
  const { isInCart, addToCart, removeFromCart, isAdding, isRemoving } =
    useCart(product);

  //console.log(isInCart, "isInCart");
  const isProcessing = isAdding || isRemoving;

  const handleCartAction = () => {
    //console.log(product, "cart product");
    if (!product) return;

    if (isInCart) {
      removeFromCart(product);
    } else {
      addToCart(product, quantity);
    }
  };

  const dynamicClasses = useMemo(() => {
    return isInCart
      ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
      : "border-[#2E7D32] bg-white text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white";
  }, [isInCart]);

  return (
    <Button
      onClick={handleCartAction}
      disabled={isProcessing}
      variant="ghost"
      className={cn(
        "flex h-10.25 items-center justify-center gap-2 rounded-[10px] border transition-colors",
        dynamicClasses,
        className,
      )}
    >
      {isProcessing ? (
        <TextStyle
          textContent={isAdding ? "Adding..." : "Removing..."}
          textStyle="animate-pulse"
        />
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          <TextStyle
            textContent={isInCart ? "Remove from Cart" : "Add To Cart"}
          />
        </>
      )}
    </Button>
  );
}

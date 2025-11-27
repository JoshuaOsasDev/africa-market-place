import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/common/badge";

interface ProductPriceProps {
  currentPrice: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
  showDiscount?: boolean;
}

export function ProductPrice({
  currentPrice,
  originalPrice,
  currency = "$",
  className,
  showDiscount = true,
}: ProductPriceProps) {
  const discountPercentage =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {/* Current Price */}
      <span className="text-[#2E7D32] text-[32px] lg:text-[40px] font-bold">
        {currency}
        {currentPrice.toFixed(2)}
      </span>

      {originalPrice && originalPrice > currentPrice && (
        <span className="text-[#9CA3AF] text-[18px] lg:text-[20px] line-through">
          {currency}
          {originalPrice.toFixed(2)}
        </span>
      )}

      {showDiscount && discountPercentage > 0 && (
        <Badge variant="discount" size="default">
          {discountPercentage}% Off
        </Badge>
      )}
    </div>
  );
}
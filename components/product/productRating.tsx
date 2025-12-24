import React from "react";
import { StarRating } from "@/components/common/starRating";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  sku?: string;
  className?: string;
  showSku?: boolean;
}

export function ProductRating({
  rating,
  reviewCount,
  sku,
  className,
  showSku = true,
}: ProductRatingProps) {
  return (
    <div className={cn("flex items-center gap-3 flex-wrap", className)}>
      <StarRating rating={rating} reviewCount={reviewCount} size={18} />

      {showSku && sku && (
        <>
          <span className="text-[#D1D5DB]">•</span>

          {/* SKU */}
          <div className="flex items-center gap-2">
            <span className="text-[#6F6F6F] text-sm font-medium">SKU:</span>
            <span className="text-[#111827] text-sm font-semibold">{sku}</span>
          </div>
        </>
      )}
    </div>
  );
}
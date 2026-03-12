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
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <StarRating rating={rating} reviewCount={reviewCount} size={18} />

      {showSku && sku && (
        <>
          <span className="text-[#D1D5DB]">•</span>

          {/* SKU */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#6F6F6F]">SKU:</span>
            <span className="text-sm font-semibold text-[#111827]">{sku}</span>
          </div>
        </>
      )}
    </div>
  );
}

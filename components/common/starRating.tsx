import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showRating?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 16,
  showRating = false,
  reviewCount,
  className,
}: StarRatingProps) {
  // Ensure rating is between 0 and maxRating
  const normalizedRating = Math.min(Math.max(rating, 0), maxRating);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starPosition = index + 1;
          const isFilled = starPosition <= normalizedRating;
          const isPartial =
            starPosition > normalizedRating &&
            starPosition - 1 < normalizedRating;

          return (
            <Star
              key={index}
              size={size}
              className={cn(
                "transition-colors",
                isFilled
                  ? "fill-[#FF8A00] text-[#FF8A00]"
                  : "fill-00000 text-00000",
              )}
            />
          );
        })}
      </div>

      {showRating && (
        <span className="text-sm font-medium text-[#111827]">
          {normalizedRating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-sm text-[#6F6F6F]">
          ({reviewCount} {reviewCount === 1 ? "Review" : "Reviews"})
        </span>
      )}
    </div>
  );
}

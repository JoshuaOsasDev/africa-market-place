"use client";

import React, { useState } from "react";
import { ReviewCard } from "@/components/product/reviewCard";
import { Review } from "@/types/review";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomerReviewsProps {
  reviews: Review[];
  className?: string;
}

export function CustomerReviews({ reviews, className }: CustomerReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMore = reviews.length > visibleCount;
  const displayedReviews = isExpanded ? reviews : reviews.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setVisibleCount(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsExpanded(true);
    }
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-[#6F6F6F] text-base mb-4">
          No reviews yet. Be the first to review this product!
        </p>
        <Button className="bg-[#2E7D32] hover:bg-[#246628]">
          Write a Review
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-0">
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center lg:justify-start">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2.5 bg-[#EAF2EA] text-[#2E7D32] rounded-lg font-semibold text-sm hover:bg-[#C0D8C1] transition-colors"
          >
            {isExpanded ? "Show Less" : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
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
  const displayedReviews = isExpanded
    ? reviews
    : reviews.slice(0, visibleCount);

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
      <div className={cn("py-12 text-center", className)}>
        <p className="mb-4 text-base text-[#6F6F6F]">
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
            className="rounded-lg bg-[#EAF2EA] px-6 py-2.5 text-sm font-semibold text-[#2E7D32] transition-colors hover:bg-[#C0D8C1]"
          >
            {isExpanded ? "Show Less" : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

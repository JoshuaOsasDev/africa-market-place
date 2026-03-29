"use client";
import React, { useState } from "react";
import { ReviewCard } from "@/components/product/reviewCard";
import { Review } from "@/types/review";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReviews } from "@/lib/hooks/userDashboard/useUser";
import WriteReviewModal from "../common/writeReviewModal";

interface CustomerReviewsProps {
  reviews: string;
  className?: string;
  isPaid: boolean;
}

export function CustomerReviews({
  reviews,
  isPaid,
  className,
}: CustomerReviewsProps) {
  const { data, isLoading } = useReviews(reviews);
  const review = data?.reviews;
  const [visibleCount, setVisibleCount] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setIsOpen] = useState(false);

  const hasMore = review?.length > visibleCount;
  const displayedReviews: Review[] = isExpanded
    ? review
    : review?.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setVisibleCount(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsExpanded(true);
    }
  };

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-12", className)}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2E7D32] border-t-transparent" />
      </div>
    );
  }

  // Empty state — vary CTA based on purchase status
  if (!review || review.length === 0) {
    return (
      <div className={cn("py-12 text-center", className)}>
        <p className="mb-4 text-base text-[#6F6F6F]">
          {isPaid
            ? "No reviews yet. Be the first to review this product!"
            : "No reviews yet. Purchase this product to leave the first review."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={cn("w-full", className)}>
        <div className="space-y-0">
          {displayedReviews.map((r) => (
            <ReviewCard key={r._id} review={r} />
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
    </>
  );
}

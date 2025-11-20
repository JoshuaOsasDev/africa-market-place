import React from "react";
import Image from "next/image";
import { StarRating } from "@/components/common/starRating";
import { CountryFlag } from "@/components/common/CountryFlag";
import { Review } from "@/types/review";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div
      className={cn(
        "py-4 border-b border-[#E5E7EB] last:border-b-0",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          {review.userAvatar ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#E5E7EB]">
              <Image
                src={review.userAvatar}
                alt={review.userName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#9CA3AF]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="text-[#111827] font-semibold text-sm lg:text-base">
              {review.userName}
            </h4>
            {review.countryFlag && (
              <CountryFlag countryCode={review.countryFlag} size="sm" />
            )}
          </div>

          <div className="mb-2">
            <StarRating rating={review.rating} size={14} />
          </div>

          <p className="text-[#6F6F6F] text-sm lg:text-base leading-relaxed mb-2">
            {review.comment}
          </p>

          <p className="text-[#9CA3AF] text-xs lg:text-sm">{review.date}</p>
        </div>
      </div>
    </div>
  );
}
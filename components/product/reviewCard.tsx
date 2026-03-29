import React from "react";
import Image from "next/image";
import { StarRating } from "@/components/common/starRating";
import { CountryFlag } from "@/components/common/countryFlag";
import { Review } from "@/types/review";
import { cn } from "@/lib/utils";
import { capitalize } from "@/lib/hooks/useOutsideClick";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  console.log(review, "Reviews");
  return (
    <div
      className={cn(
        "border-b border-[#E5E7EB] py-4 last:border-b-0",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          {review?.user ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#E5E7EB]">
              <Image
                src={review.user?.cover.url}
                alt={review.user?.firstName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E7EB]">
              <svg
                className="h-6 w-6 text-[#9CA3AF]"
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
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-[#111827] lg:text-base">
              {`${capitalize(review?.user?.firstName)} ${capitalize(review?.user?.lastName)}`}
            </h4>
            {/* {review.countryFlag && (
              <CountryFlag countryCode={review.countryFlag} size="sm" />
            )} */}
          </div>

          <div className="mb-2">
            <StarRating rating={review.rating} size={14} />
          </div>

          <p className="mb-2 text-sm leading-relaxed text-[#6F6F6F] lg:text-base">
            {review.review}
          </p>

          <p className="text-xs text-[#9CA3AF] lg:text-sm">
            {new Date(review.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

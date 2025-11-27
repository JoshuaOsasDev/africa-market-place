"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/common/badge";
import { StarRating } from "@/components/common/starRating";
import { cn } from "@/lib/utils";

interface RelatedItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
}

interface RelatedItemsProps {
  items: RelatedItem[];
  title?: string;
  viewAllLink?: string;
  className?: string;
}

export function RelatedItems({
  items,
  title = "Related Items",
  viewAllLink,
  className,
}: RelatedItemsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#111827] text-lg font-semibold">{title}</h2>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-[#2E7D32] text-sm font-medium hover:underline"
          >
            see all
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.slice(0, 6).map((item) => (
          <Link key={item.id} href={`/products/${item.slug}`}>
            <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-[#F9FAFB]">
                {item.discount && item.discount > 0 && (
                  <Badge
                    variant="danger"
                    size="sm"
                    className="absolute top-1 left-1 z-10 text-[8px] px-1.5"
                  >
                    {item.discount}%
                  </Badge>
                )}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover p-2"
                />
              </div>

              <div className="p-2 space-y-1">
                <h3 className="text-[#111827] text-xs font-medium line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="text-[#111827] text-sm font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-[#9CA3AF] text-[10px] line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {item.rating && (
                  <StarRating rating={item.rating} size={10} />
                )}
                <button className="w-full mt-2 py-1.5 text-[10px] font-medium text-[#2E7D32] border border-[#2E7D32] rounded hover:bg-[#2E7D32] hover:text-white transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
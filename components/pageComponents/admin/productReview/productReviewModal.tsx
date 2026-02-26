"use client";

import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductReviewModal(items: any) {
  const data = items.item;
  const formattedDate = new Date(data.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto max-w-6xl space-y-6 px-4">
        {/* PRODUCT SUMMARY */}
        <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
          <div className="grid gap-6 p-6 md:grid-cols-3">
            {/* IMAGE */}
            <div className="relative h-56 w-full overflow-hidden rounded-lg border border-[#E0E2E7] bg-[#F9F9FC]">
              {data.image?.url ? (
                <Image
                  src={data.image.url}
                  alt={data?.shop.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="space-y-3 md:col-span-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                {data?.name}
              </h1>

              <p className="text-sm text-gray-500">
                Sold by{" "}
                <span className="font-medium text-[#2E7D32]">
                  {data?.shop.name}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#2E7D32]">
                  ${data.salePrice}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${data.price}
                </span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {data.averageRating ?? "No ratings yet"}
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Heart className="h-4 w-4 text-red-500" />
                  {data.likes} Likes
                </div>
              </div>

              <div className="pt-2 text-sm text-gray-600">
                Stock:{" "}
                <span className="font-medium text-gray-900">
                  {data.stockQuantity}
                </span>
              </div>

              <div className="pt-1 text-sm text-gray-600 capitalize">
                Status:{" "}
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {data.status}
                </span>
              </div>

              <p className="pt-2 text-xs text-gray-400">
                Created on {formattedDate}
              </p>
            </div>
          </div>
        </div>

        {/* REVIEW OVERVIEW */}
        <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
          <div className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Review Overview
            </h2>

            {data.averageRating ? (
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-[#2E7D32]">
                  {data.averageRating}
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">No reviews yet.</div>
            )}
          </div>
        </div>

        {/* REVIEWS LIST */}
        <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
          <div className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Customer Reviews
            </h2>

            <div className="space-y-4 text-gray-500">
              No reviews available for this product.
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end">
          <Button className="rounded-lg bg-[#2E7D32] px-8 py-5 font-semibold text-white hover:bg-green-700">
            Write a Review
          </Button>
        </div>
      </div>
    </div>
  );
}

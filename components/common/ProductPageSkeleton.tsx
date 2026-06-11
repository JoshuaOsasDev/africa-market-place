"use client";

export default function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto max-w-7xl py-5 md:px-4">
        {/* Filter Bar Skeleton */}
        <div className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 md:w-64" />

          <div className="flex gap-2">
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="aspect-square animate-pulse bg-gray-200" />

              {/* Content */}
              <div className="space-y-3 p-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="h-3 w-full animate-pulse rounded bg-gray-200" />

                <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />

                <div className="mt-4 h-5 w-24 animate-pulse rounded bg-gray-200" />

                <div className="flex items-center justify-between pt-2">
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

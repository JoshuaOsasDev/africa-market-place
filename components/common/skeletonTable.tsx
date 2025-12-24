export default function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="mt-2 w-full overflow-x-auto">
      <div className="min-w-[1200px] overflow-hidden rounded-lg border-b border-[#F0F1F3] bg-white shadow-sm">
        {/* Header Skeleton */}
        <div className="grid items-center border-b border-[#F0F1F3] bg-[#F9F9FC] px-5.5 py-4.5">
          <div
            className="grid items-center gap-6"
            style={{
              gridTemplateColumns:
                "44px 2.5fr 0.85fr 1fr 1.1fr 1.1fr 1.3fr 1.3fr 1.1fr",
            }}
          >
            {/* Checkbox */}
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-pulse rounded-md bg-gray-300"></div>
            </div>

            {/* Product */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
            </div>

            {/* SKU */}
            <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>

            {/* Category */}
            <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>

            {/* Stock */}
            <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>

            {/* Price */}
            <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>

            {/* Status */}
            <div className="h-4 w-14 animate-pulse rounded bg-gray-300"></div>

            {/* Added */}
            <div className="h-4 w-14 animate-pulse rounded bg-gray-300"></div>

            {/* Action */}
            <div className="h-4 w-14 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>

        {/* Body Skeleton Rows */}
        <div className="my-1">
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className="grid items-center border-b border-[#F0F1F3] bg-white px-5.5 py-4.5 last:border-b-0"
              style={{
                gridTemplateColumns:
                  "44px 2.5fr 0.85fr 1fr 1.1fr 1.1fr 1.3fr 1.3fr 1.1fr",
              }}
            >
              {/* Checkbox */}
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-pulse rounded-md bg-gray-200"></div>
              </div>

              {/* Product with Image */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-32 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-2 w-24 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>

              {/* SKU */}
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>

              {/* Category */}
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>

              {/* Stock */}
              <div className="h-3 w-10 animate-pulse rounded bg-gray-200"></div>

              {/* Price */}
              <div className="h-3 w-14 animate-pulse rounded bg-gray-200"></div>

              {/* Status */}
              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>

              {/* Added */}
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>

              {/* Action */}
              <div className="flex items-center gap-1">
                <div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
                <div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
                <div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-4 flex items-center justify-between border-t border-[#F0F1F3] bg-white px-6 py-4">
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>

        <div className="flex items-center gap-2">
          <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="flex items-center gap-1">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
          </div>
          <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

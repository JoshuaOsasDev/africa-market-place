"use client";

export default function SliderSkeleton() {
  return (
    <div className="relative">
      {/* skeleton image */}
      <div className="h-[503px] w-full animate-pulse rounded-[30px] bg-gray-200 md:h-[320px] lg:h-[400px]" />

      {/* skeleton dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-2 w-2 animate-pulse rounded-full bg-gray-300"
          />
        ))}
      </div>
    </div>
  );
}

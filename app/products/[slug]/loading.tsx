export default function ProductLoading() {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-4 w-12 bg-[#E5E7EB] rounded animate-pulse" />
            <span>/</span>
            <div className="h-4 w-20 bg-[#E5E7EB] rounded animate-pulse" />
            <span>/</span>
            <div className="h-4 w-32 bg-[#E5E7EB] rounded animate-pulse" />
          </div>
  
          {/* Product Section Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <div className="w-full aspect-square bg-[#E5E7EB] rounded-2xl animate-pulse" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-24 h-24 bg-[#E5E7EB] rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
  
            {/* Product Info Skeleton */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-10 w-3/4 bg-[#E5E7EB] rounded animate-pulse" />
                <div className="h-6 w-20 bg-[#E5E7EB] rounded animate-pulse" />
              </div>
              <div className="h-6 w-full bg-[#E5E7EB] rounded animate-pulse" />
              <div className="h-12 w-48 bg-[#E5E7EB] rounded animate-pulse" />
              <div className="h-20 w-full bg-[#E5E7EB] rounded animate-pulse" />
              <div className="h-12 w-full bg-[#E5E7EB] rounded animate-pulse" />
            </div>
          </div>
  
          {/* Tabs Skeleton */}
          <div className="mb-16">
            <div className="flex gap-4 mb-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-32 bg-[#E5E7EB] rounded animate-pulse"
                />
              ))}
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-[#E5E7EB] rounded animate-pulse" />
              <div className="h-4 w-full bg-[#E5E7EB] rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-[#E5E7EB] rounded animate-pulse" />
            </div>
          </div>
  
          {/* Related Products Skeleton */}
          <div>
            <div className="h-8 w-48 bg-[#E5E7EB] rounded animate-pulse mb-6" />
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border border-[#E5E7EB] rounded-lg overflow-hidden"
                >
                  <div className="aspect-square bg-[#E5E7EB] animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-3/4 bg-[#E5E7EB] rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-[#E5E7EB] rounded animate-pulse" />
                    <div className="h-10 w-full bg-[#E5E7EB] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
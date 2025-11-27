export default function CartLoading() {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-6 w-32 bg-[#E5E7EB] rounded animate-pulse mb-6" />
          <div className="hidden lg:grid lg:grid-cols-[1fr_350px] gap-8">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-[#E5E7EB]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-[#E5E7EB] rounded animate-pulse"
                  />
                ))}
                <div className="w-6" />
              </div>
  
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-4 border-b border-[#E5E7EB]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-[#E5E7EB] rounded-lg animate-pulse" />
                    <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-16 bg-[#E5E7EB] rounded animate-pulse" />
                  <div className="h-10 w-24 bg-[#E5E7EB] rounded animate-pulse mx-auto" />
                  <div className="h-4 w-16 bg-[#E5E7EB] rounded animate-pulse" />
                  <div className="w-6 h-6 bg-[#E5E7EB] rounded animate-pulse" />
                </div>
              ))}
  
              <div className="pt-4 border-t border-[#E5E7EB] mt-4">
                <div className="flex gap-3">
                  <div className="h-10 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                  <div className="h-10 flex-1 bg-[#E5E7EB] rounded animate-pulse" />
                  <div className="h-10 w-32 bg-[#E5E7EB] rounded animate-pulse" />
                </div>
              </div>
            </div>
  
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 h-fit">
              <div className="h-6 w-32 bg-[#E5E7EB] rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-20 bg-[#E5E7EB] rounded animate-pulse" />
                    <div className="h-4 w-16 bg-[#E5E7EB] rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="h-12 w-full bg-[#E5E7EB] rounded-full animate-pulse mt-6" />
            </div>
          </div>
  
          <div className="lg:hidden">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="h-6 w-32 bg-[#E5E7EB] rounded animate-pulse mb-4" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 py-4 border-b border-[#E5E7EB]">
                  <div className="w-16 h-16 bg-[#E5E7EB] rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                    <div className="h-8 w-20 bg-[#E5E7EB] rounded animate-pulse" />
                  </div>
                </div>
              ))}
              <div className="h-12 w-full bg-[#E5E7EB] rounded-full animate-pulse mt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }
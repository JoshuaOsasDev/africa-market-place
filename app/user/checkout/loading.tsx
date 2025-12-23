export default function CheckoutLoading() {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-6 w-32 bg-[#E5E7EB] rounded animate-pulse mb-6" />
  
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <div className="h-6 w-48 bg-[#E5E7EB] rounded animate-pulse mb-6" />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                      <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                      <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                    </div>
                  </div>
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                      <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
  
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <div className="h-6 w-40 bg-[#E5E7EB] rounded animate-pulse mb-6" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                      <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                    </div>
                  ))}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                      <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                      <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <div className="h-6 w-40 bg-[#E5E7EB] rounded animate-pulse mb-6" />
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3 py-3 border-b border-[#E5E7EB]">
                      <div className="w-5 h-5 bg-[#E5E7EB] rounded-full animate-pulse" />
                      <div className="h-4 w-32 bg-[#E5E7EB] rounded animate-pulse" />
                    </div>
                  ))}
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                      <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                        <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                        <div className="h-12 w-full bg-[#E5E7EB] rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 h-fit">
              <div className="h-6 w-32 bg-[#E5E7EB] rounded animate-pulse mb-4" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-[#E5E7EB]">
                  <div className="w-14 h-14 bg-[#E5E7EB] rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                    <div className="h-8 w-20 bg-[#E5E7EB] rounded animate-pulse" />
                  </div>
                </div>
              ))}
              <div className="space-y-3 mt-4 pt-4 border-t border-[#E5E7EB]">
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
        </div>
      </div>
    );
  }
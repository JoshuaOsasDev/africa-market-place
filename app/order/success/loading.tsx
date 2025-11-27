export default function OrderSuccessLoading() {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center">
          <div className="h-8 w-48 bg-[#E5E7EB] rounded animate-pulse mx-auto mb-2" />
          <div className="h-10 w-80 bg-[#E5E7EB] rounded animate-pulse mx-auto mb-10" />
  
          <div className="flex items-center justify-center gap-4 mb-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-24 h-24 sm:w-28 sm:h-28 bg-[#E5E7EB] rounded-lg animate-pulse"
              />
            ))}
          </div>
  
          <div className="space-y-3 px-8 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between sm:justify-start gap-4">
                <div className="h-5 w-24 bg-[#E5E7EB] rounded animate-pulse" />
                <div className="h-5 w-32 bg-[#E5E7EB] rounded animate-pulse" />
              </div>
            ))}
          </div>
  
          <div className="h-12 w-48 bg-[#E5E7EB] rounded-full animate-pulse mx-auto" />
        </div>
      </div>
    );
  }
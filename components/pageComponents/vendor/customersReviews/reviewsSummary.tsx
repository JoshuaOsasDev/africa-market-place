import { ChevronDown, ShoppingBagIcon } from "lucide-react";

export default function ReviewsSummary() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className="flex w-full flex-col items-start gap-4 space-y-5.5 rounded-xl border border-[#E0E2E7] bg-white p-5">
        <div className="rounded-xl bg-[#EAF2EA] p-3">
          <ShoppingBagIcon className="text-[#2E7D32]" />
        </div>
        <div className="w-full">
          <h3 className="text-[14px] text-[#8B8D97]">Total Reviews</h3>
          <div className="">
            <span className="text-xl font-medium text-[#45464E]">430</span>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-start gap-4 space-y-5.5 rounded-xl border border-[#E0E2E7] bg-white p-5">
        <div className="flex w-full items-center justify-between">
          <div className="rounded-xl bg-[#FFF9EA] p-3">
            <ShoppingBagIcon className="text-[#FBC02D]" />
          </div>
          <p className="hidden space-x-1.5 text-[#BEC0CA] md:flex">
            <span>This Week</span>
            <span>
              <ChevronDown />
            </span>
          </p>
        </div>
        <div className="w-full">
          <h3 className="text-[14px] text-[#8B8D97]">Recent Reviews</h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-medium text-[#45464E]">30</span>
            <span className="text-[12px] text-[#CC5F5F]">-20%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import ShopsDetails from "@/components/pageComponents/admin/shops/shopsDetails";
import { useAdminShops } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { useTableFilters } from "@/lib/hooks/useTableFilters";
import { ProductReview } from "@/types/product";
import { ChevronDown, FolderKanban, UserRoundPen } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ShopsPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { limit, search, debouncedSearch, status, setSearch, setStatus } =
    useTableFilters();
  const { adminShops, isLoading: isLoadingShop } = useAdminShops(
    page,
    limit,
    debouncedSearch,
    status,
  );

  //Pending product

  const pendingNum: number = adminShops?.data?.filter((data: ProductReview) => {
    return data.status === "approved";
  }).length;

  return (
    <div className="w-full">
      <div className="mt-5 mb-4 grid grid-cols-2 gap-8">
        {/* TOTAL Product */}
        <div className="flex flex-col justify-between gap-5 rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5">
          <div className="w-fit rounded-xl bg-[#EAF2EA] p-4">
            <FolderKanban className="text-[#2E7D32]" size={30} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">All Shops</h3>
            <p className="text-xl font-medium">{adminShops?.data?.length}</p>
          </div>
        </div>
        {/* SHIPPING TODAY */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5">
          <div className="w-fit rounded-xl bg-[#FFF9EA] p-4">
            <UserRoundPen className="text-[#FBC02D]" size={30} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Approved Shops</h3>
            <p className="text-xl font-medium">{pendingNum}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-4">
        <div className="flex items-center justify-between py-1.5">
          <h3 className="text-xl text-black">All Shop</h3>
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="w-full md:w-xs">
              <div className="relative">
                <svg
                  className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
                  fill="none"
                  stroke="#949494"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search user..."
                  className="w-full rounded-xl border border-[#DEDEDE] py-3 pr-4 pl-10 text-[14px] text-[#949494] focus:border-[#2E7D32] focus:outline-none md:text-[16px]"
                />
              </div>
            </div>
            {/* Status */}
            <div className="relative hidden w-40 md:block">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none"
              >
                <option value={""}>Status</option>
                <option value={"approved"}>Approved</option>
                <option value={"pending"}>Pending</option>
                <option value={"in review"}>In Review</option>
                <option value={"rejected"}>Declined</option>
                <option value={"blocked"}>Blocked</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
            </div>
          </div>
        </div>
        <ShopsDetails
          adminShop={adminShops?.data}
          isLoadingShop={isLoadingShop}
        />
      </div>
      {/* PAYOUTDETAILS PAGE */}
    </div>
  );
}

"use client";
import ProductReviewDetailsPage from "@/components/pageComponents/admin/productReview/productReviewDetailsPage";
import { useAdminProducts } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { useTableFilters } from "@/lib/hooks/useTableFilters";
import { ProductReview } from "@/types/product";
import { ChevronDown, FolderKanban, UserRoundPen } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ProductReviewPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { limit, debouncedSearch, setStatus, status } = useTableFilters();
  const { adminProducts, isLoading: isLoadingAdmin } = useAdminProducts(
    page,
    limit,
    debouncedSearch,
    status,
  );

  //console.log(adminProducts, "admin pro");
  //Pending product
  const total = adminProducts?.total;
  const pendingNum: number = adminProducts?.data?.filter(
    (data: ProductReview) => {
      return data.status === "pending";
    },
  ).length;

  return (
    <div className="w-full">
      <div className="mt-5 mb-4 grid grid-cols-2 gap-8">
        {/* TOTAL Product */}
        <div className="flex flex-col justify-between gap-5 rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5">
          <div className="w-fit rounded-xl bg-[#EAF2EA] p-4">
            <FolderKanban className="text-[#2E7D32]" size={30} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">All Product</h3>
            <p className="text-xl font-medium">{total}</p>
          </div>
        </div>
        {/* SHIPPING TODAY */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5">
          <div className="w-fit rounded-xl bg-[#FFF9EA] p-4">
            <UserRoundPen className="text-[#FBC02D]" size={30} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Pending Product</h3>
            <p className="text-xl font-medium">{pendingNum}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-4">
        <div className="flex items-center justify-between py-1.5">
          <h3 className="text-xl text-black">All Product</h3>
          <div className="relative hidden w-40 md:block">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="in review">In Review</option>
              <option value="rejected">Declined</option>
              <option value="blocked">Blocked</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
          </div>
        </div>
        <ProductReviewDetailsPage
          isLoadingAdmin={isLoadingAdmin}
          adminProducts={adminProducts?.data}
          total={total}
        />
      </div>
    </div>
  );
}

"use client";
import { useVendorProductById } from "@/lib/hooks/vendorDashboard/useVendor";
// ProductDetailCell.tsx

import { Product } from "@/types/appTypes";
import { ChevronDown } from "lucide-react";

export function ProductDetailCell({ item }: { item: Product }) {
  // const { vendorProductById, isLoading, error } = useVendorProductById(
  //   item?.slug,
  // );

  // console.log(vendorProductById, "ID");
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center gap-8">
  //       <span className="text-sm text-gray-500">Loading...</span>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex items-center gap-8">
  //       <span className="text-sm text-red-500">Error</span>
  //     </div>
  //   );
  // }

  return (
    <div className="flex items-center gap-8">
      {/* SKU */}
      {/* <span className="min-w-fit text-sm font-semibold text-[#2E7D32]">
        {vendorProductById?.sku || item.sku}
      </span> */}

      {/* Category */}
      {/* <span className="min-w-fit truncate text-sm text-[#667085]">
        {vendorProductById?.category || item.category}
      </span> */}

      {/* Stock */}
      {/* <span className="min-w-fit text-sm text-[#333843]">
        {vendorProductById?.stock || item.stock}
      </span> */}
    </div>
  );
}

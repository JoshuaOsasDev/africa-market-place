"use client";
import TextStyle from "@/components/common/textStyle";
import Link from "next/link";
import { MoveRight, ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import ProductFilterBar from "./productFilterBar";

export default function NoProducts({
  currentFilters,
  onFilterChange,
  totalCount,
  totalPages,
  loading,
}: any) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <ProductFilterBar
        currentFilters={currentFilters}
        onFilterChange={onFilterChange}
        totalCount={totalCount}
        totalPages={totalPages}
        loading={loading}
      />
      {/* Icon */}
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EAF2EA]">
          <ShoppingBag className="h-10 w-10 text-[#2E7D32]" strokeWidth={1.5} />
        </div>
        {/* small badge */}
        <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2E7D32]">
          <span className="text-xs font-bold text-white">0</span>
        </div>
      </div>

      {/* Text */}
      <TextStyle
        textContent="No product found"
        textStyle="text-[#000000] font-bold text-xl sm:text-2xl mb-2"
      />
      <p className="max-w-xs text-sm leading-relaxed text-[#6F6F6F] sm:text-base">
        No products are available at the moment, Please check back soon for the
        latest products.
      </p>

      {/* Divider dots */}
      <div className="my-5 flex gap-1.5">
        {[false, false, true, false, false].map((active, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all ${
              active ? "w-3 bg-[#2E7D32]" : "bg-[#EAF2EA]"
            }`}
            style={{ border: "1px solid #2E7D32" }}
          />
        ))}
      </div>
    </div>
  );
}

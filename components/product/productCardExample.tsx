"use client";

import Loader from "@/components/common/loader";
import NoProducts from "@/components/common/noProducts";
import ProductCard from "@/components/common/productCardComp";
import { useUserProducts } from "@/lib/hooks/userDashboard/useUser";
import { Product } from "@/types/product";
import ProductFilterBar from "../common/productFilterBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUserProducts } from "@/services/apiServices/userDashboard";

export default function ProductCardExample() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Extract current filters from URL
  const filters = {
    page: searchParams.get("page") || "1",
    // limit: 10,
    category: searchParams.get("category") || undefined,
    prices: searchParams.get("prices") || undefined,
    isFeatured: searchParams.get("isFeatured") || undefined,
    price: searchParams.get("sortPrice") || undefined, // sorting
  };

  // Helper to update URL params
  const handleFilterChange = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Always reset to page 1 when a filter changes
    if (key !== "page") params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  const { userProducts, isLoading } = useUserProducts(filters);

  const product: Product[] = userProducts?.data;
  //console.log(product, "product");
  if (isLoading) return <Loader />;
  if (!product || product.length === 0) return <NoProducts />;
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto max-w-7xl py-5 md:px-4">
        <ProductFilterBar
          currentFilters={filters}
          onFilterChange={handleFilterChange}
          totalCount={userProducts?.total || 0}
          totalPages={userProducts?.count || 1}
          loading={isLoading}
        />
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {product?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import NoProducts from "@/components/common/noProducts";
import ProductCard from "@/components/common/productCardComp";
import { useUserProducts } from "@/lib/hooks/userDashboard/useUser";
import { Product } from "@/types/product";

export default function ProductCardExample() {
  const { userProducts } = useUserProducts();

  const product: Product[] = userProducts?.data;

  if (!product || product.length === 0) return <NoProducts />;
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="mx-auto max-w-7xl md:px-4">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {product?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

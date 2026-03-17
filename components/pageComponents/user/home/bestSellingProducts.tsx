"use client";
import TextStyle from "@/components/common/textStyle";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useUserProducts } from "@/lib/hooks/userDashboard/useUser";
import { ProductCard } from "@/components/product/productCard";
import { Product } from "@/types/product";

function BestSellingProducts() {
  //get product hook
  const { isLoading, userProducts } = useUserProducts();

  const product = userProducts?.data;

  if (isLoading) return;

  return (
    <div className="my-2 flex flex-col space-y-2 px-2">
      {/* top section starts */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-baseline space-x-2">
          <TextStyle
            textContent={"Best Selling Items"}
            textStyle="text-[#000000] font-bold text-2xl sm:text-3xl"
          />
        </div>
        <Link
          href={"/user/products"}
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
          })}
        >
          <TextStyle textContent="See all" />
          <MoveRight className="text-[10px] text-[#6F6F6F] lg:text-[12px]" />
        </Link>
      </div>
      {/* bottom section starts */}
      {!product || product?.length === 0 ? (
        <p className="py-6 text-center text-lg font-bold text-[#6F6F6F]">
          Vendors have not uploaded any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-3 px-4 sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {product?.map((data: Product) => (
            <ProductCard key={data._id} product={data} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BestSellingProducts;

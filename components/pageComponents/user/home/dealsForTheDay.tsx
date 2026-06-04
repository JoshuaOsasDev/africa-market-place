"use client";

import { MoveRight } from "lucide-react";
import TextStyle from "@/components/common/textStyle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ProductHoverCard from "./productHoverCard";

import { useUserProducts } from "@/lib/hooks/userDashboard/useUser";
import { DealsTodayProps } from "@/types/appTypes";
import { Product } from "@/types/product";

export default function DealsForTheDay() {
  const filter = "";
  const { userProducts: deals } = useUserProducts(filter);

  const filteredDeals =
    deals?.data?.filter((d: Product) => d.isDeal === true) || [];

  if (filteredDeals.length === 0) {
    return null; // Don't render the section if there are no deals
  }
  return (
    <div className="my-3 flex flex-col gap-5 px-2">
      {/* top section starts */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex max-w-75 flex-col items-baseline space-y-2 md:max-w-130">
          <TextStyle
            textContent={"Deals of the day"}
            textStyle="text-[#000000] font-bold text-2xl sm:text-3xl"
          />

          <TextStyle
            textContent={
              "The only supermarket that makes your life easier, makes you enjoy life and makes it better"
            }
            textStyle="text-[#6F6F6F] text-[14px]"
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {filteredDeals.map((product: DealsTodayProps) => (
          <ProductHoverCard
            key={product._id}
            _id={product._id}
            discount={product.discount}
            images={product.images}
            name={product.name}
            price={product.salePrice}
            salePrice={product.price}
            rate={product.rate}
            description={product.description || ""}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  );
}

"use client";
import TextStyle from "@/components/common/textStyle";
import Link from "next/link";
import { MoveRight, Star, Text } from "lucide-react";

import Image from "next/image";
import { MdStar } from "react-icons/md";

import { buttonVariants } from "@/components/ui/button";
import { useUserProducts } from "@/lib/hooks/userDashboard/useUser";

function BestSellingProducts() {
  //get product hook
  const { isLoading, userProducts, error } = useUserProducts();

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
          href={"/topcategories"}
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
      <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {product?.map((data: any) => (
          <div
            className="group col-span-1 shadow-md transition-shadow duration-300 hover:shadow-xl"
            key={data._id}
          >
            <Link href={`user/products/${data?.slug}`}>
              <div className="relative flex h-[300px] w-full flex-col space-y-2 border-0 bg-[#FCFCFCFC] px-2 py-2">
                {/* discount section starts */}
                <div className="absolute top-1 left-1 flex flex-row items-center justify-center rounded-[5px] border-0 bg-[#FF0000] px-2 py-1">
                  <TextStyle
                    textContent={`%${data.discount || 0}`}
                    textStyle=" text-white  text-center text-[8px]"
                  />
                </div>
                {/* discount section ends */}

                <div className="relative mx-auto mt-8 h-[175.67px] w-[175.67px]">
                  <Image
                    src={data?.images?.[0].url}
                    fill
                    alt={data?.images?.[0]._id}
                    className="rounded-lg transition-transform duration-500 group-hover:scale-140"
                  />
                </div>

                {/* discription section starts */}
                <div className="flex flex-1 flex-col justify-end space-y-1">
                  <TextStyle textContent={data.name} textStyle="" />
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-baseline space-x-1">
                      <TextStyle
                        textContent={"$" + data.salePrice.toString()}
                        textStyle="text-black text-[24px] text-tracking-[2px]"
                      />
                      <TextStyle
                        textContent={"$" + data.salePrice.toString()}
                        textStyle="text-[#6F6F6F] line-through"
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-0">
                      {/* star rating  starts */}
                      <div className="flex flex-row items-center space-x-1">
                        {[...Array(data.rate)].map((_, i) => (
                          <MdStar key={i} className="h-3 w-3 text-yellow-500" />
                        ))}
                      </div>
                      {/* star rating ends */}
                    </div>
                  </div>
                  <div className="lg-[205px] mx-auto flex h-[41px] w-3/4 flex-row items-center justify-center rounded-[10px] border border-[#2E7D32] text-center md:w-[180px]">
                    <TextStyle
                      textContent="Add To Cart"
                      textStyle="text-[#2E7D32] hover:animate-heartbeat"
                    />
                  </div>
                </div>
                {/* description section ends */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellingProducts;

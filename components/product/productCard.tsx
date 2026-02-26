"use client";

import Image from "next/image";
import Link from "next/link";
import TextStyle from "../common/textStyle";
import { MdStar } from "react-icons/md";
import { CartButton } from "../common/cartButton";
import { Product } from "@/types/product";

export function ProductCard(product: any) {
  const data = product?.product;

  return (
    <div className="group col-span-1 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <Link href={`user/products/${data?.slug}`}>
        <div className="relative flex h-75 w-full flex-col space-y-2 border-0 bg-[#FCFCFCFC] px-2 py-2">
          {/* discount section starts */}
          <div className="absolute top-1 left-1 flex flex-row items-center justify-center rounded-[5px] border-0 bg-[#FF0000] px-2 py-1">
            <TextStyle
              textContent={`%${data?.discount || 0}`}
              textStyle=" text-white  text-center text-[8px]"
            />
          </div>
          {/* discount section ends */}

          <div className="relative mx-auto mt-8 h-[175.67px] w-[175.67px]">
            {data?.images[0] && (
              <Image
                src={data?.images?.[0].url}
                fill
                alt={data?.images?.[0]._id}
                className="rounded-lg transition-transform duration-500 group-hover:scale-140"
              />
            )}
          </div>

          {/* discription section starts */}
          <div className="flex flex-1 flex-col justify-end space-y-1">
            <TextStyle textContent={data?.name} textStyle="" />
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-baseline space-x-1">
                <TextStyle
                  textContent={"$" + data?.salePrice?.toString()}
                  textStyle="text-black text-[24px] text-tracking-[2px]"
                />
                <TextStyle
                  textContent={"$" + data?.salePrice?.toString()}
                  textStyle="text-[#6F6F6F] line-through"
                />
              </div>
              <div className="flex flex-row items-center space-x-0">
                {/* star rating  starts */}
                <div className="flex flex-row items-center space-x-1">
                  {[...Array(data?.rate)].map((_, i) => (
                    <MdStar key={i} className="h-3 w-3 text-yellow-500" />
                  ))}
                </div>
                {/* star rating ends */}
              </div>
            </div>
            {/* Cart Button - prevents Link navigation */}
          </div>
        </div>
      </Link>
      <div className="pb-2">
        <CartButton
          product={product?.product}
          className="lg-[205px] mx-auto w-3/4 md:w-45"
        />
      </div>
    </div>
  );
}

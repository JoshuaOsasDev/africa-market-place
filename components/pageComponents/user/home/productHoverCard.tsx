"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DealsTodayProps } from "@/types/appTypes";
import { StarRating } from "@/components/common/starRating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function ProductHoverCard({
  images,
  name,
  price,
  rate,
  salePrice,
  description,
  slug,
}: DealsTodayProps) {
  const [isHovered, setIsHovered] = useState(false);

  //  Discount logic
  const hasDiscount = salePrice && salePrice > price;
  const displayPrice = hasDiscount ? price : salePrice;

  console.log(price, "price");
  console.log(salePrice, "sales");
  const discountPercent = hasDiscount
    ? `${Math.ceil(((price - salePrice) / price) * 100)}%`
    : "No Discount";

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-white shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative h-70 w-full bg-white md:h-75">
        <Image
          src={images?.[0]?.url ?? ""}
          alt={name}
          fill
          className="object-contain p-6"
        />

        {/* Discount Badge */}
        <div className="absolute top-4 left-4 rounded-md bg-red-500 px-1.5 py-1 text-xs font-semibold text-white">
          {discountPercent}
        </div>
      </div>

      {/* Animated Details Section */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 flex h-70 w-full flex-col justify-end bg-[#F6F6F6FC]/90 px-2 py-1 md:h-75 md:p-5"
          >
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

            {/* Price */}
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                {" "}
                £{displayPrice}
              </span>
              {hasDiscount && (
                <span className="text-[16px] text-[#BABABA] line-through">
                  €{price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mt-2 flex items-center space-x-1">
              <StarRating rating={rate} />
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-600">
              {description.slice(0, 150)}...
            </p>

            {/* Button */}
            <Link href={`user/products/${slug}`}>
              <Button className="mt-4 w-full cursor-pointer rounded-lg border border-[#2E7D32] bg-white py-2 text-sm font-medium text-[#2E7D32] transition hover:bg-[#2E7D32] hover:text-white">
                View This Deal
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

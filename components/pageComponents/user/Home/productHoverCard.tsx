"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DealsTodayProps } from "@/types/appTypes";
import { Star } from "lucide-react";
import { StarRating } from "@/components/common/starRating";
export default function ProductHoverCard({
  images,
  name,
  price,
  rate,
  salePrice,
  description,
}: DealsTodayProps) {
  const [isHovered, setIsHovered] = useState(false);

  //  Discount logic
  const hasDiscount = salePrice && price > salePrice;

  const discountPercent = hasDiscount
    ? Math.round(((price - salePrice) / price) * 100)
    : "No Discount";

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-white shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative h-50 w-full bg-white md:h-75">
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
            className="absolute bottom-0 left-0 flex h-50 w-full flex-col justify-end bg-[#F6F6F6FC]/90 px-2 py-1 md:h-75 md:p-5"
          >
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

            {/* Price */}
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                {" "}
                £{salePrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                £{price}
              </span>
            </div>

            {/* Rating */}
            <div className="mt-2 flex items-center space-x-1">
              <StarRating rating={rate} />
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-600">{description}</p>

            {/* Button */}
            <button className="mt-4 w-full cursor-pointer rounded-lg border border-[#2E7D32] py-2 text-sm font-medium text-[#2E7D32] transition hover:bg-[#2E7D32] hover:text-white">
              View This Deal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

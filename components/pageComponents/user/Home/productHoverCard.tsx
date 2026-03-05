"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DealsTodayProps } from "@/types/appTypes";
import { Star } from "lucide-react";
export default function ProductHoverCard({
  image,
  discount,
  title,
  price,
  oldPrice,
  description,
}: DealsTodayProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-white shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative h-75 w-full bg-white">
        <Image src={image} alt={title} fill className="object-contain p-6" />

        {/* Discount Badge */}
        <div className="absolute top-4 left-4 rounded-md bg-red-500 px-1.5 py-1 text-xs font-semibold text-white">
          {discount}
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
            className="absolute bottom-0 left-0 flex h-75 w-full flex-col justify-end bg-[#F6F6F6FC]/90 p-5"
          >
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

            {/* Price */}
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900"> £{price}</span>
              <span className="text-sm text-gray-400 line-through">
                £{oldPrice}
              </span>
            </div>

            {/* Rating */}
            <div className="mt-2 flex items-center space-x-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star className="h-4 w-4 text-gray-300" />
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

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  productName?: string;
}

export function ProductImageGallery({
  images,
  alt,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const imageList = images.length > 0 ? images : ["/placeholder-product.jpg"];

  const handleThumbnailClick = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setSelectedIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-[#F9FAFB] rounded-2xl overflow-hidden group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={selectedIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={imageList[selectedIndex]}
              alt={`${alt} - Image ${selectedIndex + 1}`}
              fill
              className="object-contain p-4"
              priority={selectedIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (only show if more than 1 image) */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F9FAFB]"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-[#111827]" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F9FAFB]"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-[#111827]" />
            </button>
          </>
        )}

        {imageList.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {imageList.length}
          </div>
        )}
      </div>

      {imageList.length > 1 && (
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {imageList.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all",
                  selectedIndex === index
                    ? "border-[#2E7D32] ring-2 ring-[#2E7D32]/20"
                    : "border-[#E5E7EB] hover:border-[#9CA3AF]"
                )}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Scroll Indicators */}
          {imageList.length > 4 && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-full bg-linear-to-l from-white to-transparent pointer-events-none" />
          )}
        </div>
      )}
    </div>
  );
}
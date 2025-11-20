"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Badge } from "@/components/common/badge";
import { StarRating } from "@/components/common/starRating";
import { IconButton } from "@/components/common/iconButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
  isWishlisted?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  name,
  slug,
  image,
  price,
  originalPrice,
  discount,
  rating = 0,
  reviewCount = 0,
  inStock = true,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  className,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && inStock) {
      onAddToCart(id);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("group", className)}
    >
      <Link href={`/products/${slug}`}>
        <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#2E7D32]/20 h-full flex flex-col">
          <div className="relative aspect-square bg-[#F9FAFB] overflow-hidden">
            {discount && discount > 0 && (
              <Badge
                variant="danger"
                size="sm"
                className="absolute top-2 left-2 z-10"
              >
                {discount}%
              </Badge>
            )}

            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <IconButton
                variant={isWishlisted ? "active" : "default"}
                size="sm"
                onClick={handleToggleWishlist}
                icon={
                  <Heart
                    size={16}
                    fill={isWishlisted ? "#FF0000" : "none"}
                    className="transition-all"
                  />
                }
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              />
            </div>

            <div className="relative w-full h-full p-4">
              <Image
                src={image}
                alt={name}
                fill
                className={cn(
                  "object-contain transition-all duration-500 group-hover:scale-110",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            {!inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" size="lg">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
            <h3 className="text-[#111827] font-semibold text-base line-clamp-2 group-hover:text-[#2E7D32] transition-colors">
              {name}
            </h3>

            {rating > 0 && (
              <StarRating rating={rating} reviewCount={reviewCount} size={14} />
            )}

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[#111827] text-xl font-bold">
                  ${price.toFixed(2)}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-[#9CA3AF] text-sm line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {rating > 0 && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.round(rating) }, (_, i) => (
                    <div key={i} className="w-3 h-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="#FBC642"
                        className="w-full h-full"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={cn(
                "w-full h-10 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2",
                inStock
                  ? "border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white"
                  : "border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
              )}
            >
              <ShoppingCart size={16} />
              <span>{inStock ? "Add To Cart" : "Out of Stock"}</span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
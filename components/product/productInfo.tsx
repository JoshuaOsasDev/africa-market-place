"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/common/badge";
import { ProductPrice } from "@/components/product/productPrice";
import { ProductRating } from "@/components/product/productRating";
import { ProductShareButtons } from "@/components/product/productShareButtons";
import { ProductQuantitySelector } from "@/components/product/productQuantitySelector";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
  inStock?: boolean;
  rating: number;
  reviewCount: number;
  sku: string;
  description: string;
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
  onAddToCart: (quantity: number) => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
  maxQuantity?: number;
  className?: string;
}

export function ProductInfo({
  name,
  price,
  originalPrice,
  inStock = true,
  rating,
  reviewCount,
  sku,
  description,
  category,
  tags,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  maxQuantity = 999,
  className,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await onAddToCart(quantity);
      // Optionally reset quantity after adding
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-[#111827] text-[1.3rem] lg:text-[36px] font-bold leading-tight mb-2">
          {name}
        </h1>
        
        <Badge variant={inStock ? "inStock" : "secondary"} size="default">
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <ProductRating rating={rating} reviewCount={reviewCount} sku={sku} />

      <ProductPrice
        currentPrice={price}
        originalPrice={originalPrice}
        showDiscount={true}
      />

      <ProductShareButtons title={name} description={description} />

      <div className="border-t border-b border-[#E5E7EB] py-6">
        <p className="text-[#6F6F6F] text-base leading-relaxed">
          {description}
        </p>
      </div>

      <ProductQuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
        onToggleWishlist={onToggleWishlist}
        isWishlisted={isWishlisted}
        inStock={inStock}
        maxQuantity={maxQuantity}
        loading={loading}
      />

      {/* Category and Tags */}
      <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#6F6F6F] text-sm font-medium">Category:</span>
          <Link
            href={`/categories/${category.slug}`}
            className="text-[#111827] text-sm font-medium hover:text-[#2E7D32] transition-colors"
          >
            {category.name}
          </Link>
        </div>

        {/* Tags */}
        <div className="flex items-start gap-2">
          <span className="text-[#6F6F6F] text-sm font-medium whitespace-nowrap pt-0.5">
            Tag:
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[#111827] text-sm font-medium hover:text-[#2E7D32] transition-colors"
              >
                {tag}
                {index < tags.length - 1 && (
                  <span className="text-[#6F6F6F] ml-2">,</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/common/badge";
import { ProductPrice } from "@/components/product/productPrice";
import { ProductRating } from "@/components/product/productRating";
import { ProductShareButtons } from "@/components/product/productShareButtons";
import { ProductQuantitySelector } from "@/components/product/productQuantitySelector";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

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
  product: Product;
  //onAddToCart: (quantity: number) => void;
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
  onToggleWishlist,
  isWishlisted,
  maxQuantity = 999,
  product,
  className,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  //console.log(isWishlisted, "info");
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
        <h1 className="mb-2 text-[1.3rem] leading-tight font-bold text-[#111827] lg:text-[36px]">
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
        <p className="text-base leading-relaxed text-[#6F6F6F]">
          {description}
        </p>
      </div>

      <ProductQuantitySelector
        product={product}
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
      <div className="space-y-3 border-t border-[#E5E7EB] pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[#6F6F6F]">Category:</span>
          <Link
            href={`#`}
            className="text-sm font-medium text-[#111827] transition-colors hover:text-[#2E7D32]"
          >
            {category?.name}
          </Link>
        </div>

        {/* Tags */}
        <div className="flex items-start gap-2">
          {tags.length > 0 && (
            <span className="pt-0.5 text-sm font-medium whitespace-nowrap text-[#6F6F6F]">
              Tag: {tags}
            </span>
          )}
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Link
                key={index}
                href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-[#111827] transition-colors hover:text-[#2E7D32]"
              >
                {tag}
                {index < tags.length - 1 && (
                  <span className="ml-2 text-[#6F6F6F]">,</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

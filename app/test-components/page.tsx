// app/test-components/page.tsx

"use client";

import { Badge } from "@/components/common/badge";
import { StarRating } from "@/components/common/starRating";
import { ProductPrice } from "@/components/product/productPrice";
import { QuantityInput } from "@/components/common/quantityInput";
import { IconButton } from "@/components/common/iconButton";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function TestComponentsPage() {
  const [quantity, setQuantity] = useState(5);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-[#111827]">
          Phase 1 Components Test
        </h1>

        {/* Badge Component */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">Badge Component</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">In Stock</Badge>
            <Badge variant="danger">64% Off</Badge>
            <Badge variant="warning">Limited</Badge>
            <Badge variant="secondary">Out of Stock</Badge>
            <Badge variant="outline">New</Badge>
            <Badge variant="inStock">In Stock</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="danger" size="sm">
              Small
            </Badge>
            <Badge variant="danger" size="default">
              Default
            </Badge>
            <Badge variant="danger" size="lg">
              Large
            </Badge>
          </div>
        </section>

        {/* StarRating Component */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            StarRating Component
          </h2>
          <div className="space-y-3">
            <StarRating rating={5} />
            <StarRating rating={4.5} showRating />
            <StarRating rating={4} reviewCount={127} />
            <StarRating rating={3.5} showRating reviewCount={45} />
            <StarRating rating={2} size={20} />
            <StarRating rating={0} reviewCount={0} />
          </div>
        </section>

        {/* ProductPrice Component */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductPrice Component
          </h2>
          <div className="space-y-4">
            <ProductPrice currentPrice={17.28} originalPrice={48.0} />
            <ProductPrice currentPrice={25.0} />
            <ProductPrice
              currentPrice={10.5}
              originalPrice={10.6}
              showDiscount={false}
            />
          </div>
        </section>

        {/* QuantityInput Component */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            QuantityInput Component
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#6F6F6F] mb-2">
                Controlled: {quantity}
              </p>
              <QuantityInput value={quantity} onChange={setQuantity} />
            </div>
            <div>
              <p className="text-sm text-[#6F6F6F] mb-2">Uncontrolled</p>
              <QuantityInput min={1} max={10} />
            </div>
            <div>
              <p className="text-sm text-[#6F6F6F] mb-2">Disabled</p>
              <QuantityInput disabled />
            </div>
          </div>
        </section>

        {/* IconButton Component */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            IconButton Component
          </h2>
          <div className="flex flex-wrap gap-4">
            <IconButton
              variant={isWishlisted ? "active" : "default"}
              onClick={() => setIsWishlisted(!isWishlisted)}
              icon={<Heart size={20} fill={isWishlisted ? "#FF0000" : "none"} />}
              aria-label="Add to wishlist"
            />
            <IconButton
              variant="ghost"
              icon={<ShoppingCart size={20} />}
              aria-label="Add to cart"
            />
            <IconButton
              variant="primary"
              icon={<Heart size={20} />}
              aria-label="Add to wishlist"
            />
            <IconButton
              variant="danger"
              icon={<Heart size={20} />}
              aria-label="Remove from wishlist"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <IconButton
              size="sm"
              icon={<Heart size={16} />}
              aria-label="Small"
            />
            <IconButton
              size="default"
              icon={<Heart size={20} />}
              aria-label="Default"
            />
            <IconButton
              size="lg"
              icon={<Heart size={24} />}
              aria-label="Large"
            />
          </div>
        </section>

        {/* Combined Example */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            Combined Example (Product Card Preview)
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6 max-w-md space-y-4">
            <div className="flex items-start justify-between">
              <Badge variant="inStock">In Stock</Badge>
              <IconButton
                variant={isWishlisted ? "active" : "ghost"}
                onClick={() => setIsWishlisted(!isWishlisted)}
                icon={<Heart size={20} fill={isWishlisted ? "#FF0000" : "none"} />}
              />
            </div>
            <h3 className="text-xl font-semibold text-[#111827]">
              Chinese Cabbage
            </h3>
            <StarRating rating={5} reviewCount={4} />
            <ProductPrice currentPrice={17.28} originalPrice={48.0} />
            <div className="flex items-center gap-4">
              <QuantityInput value={quantity} onChange={setQuantity} />
              <button className="flex-1 bg-[#2E7D32] text-white py-2.5 px-4 rounded-lg hover:bg-[#246628] transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
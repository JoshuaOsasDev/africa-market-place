// app/test-components-phase2/page.tsx

"use client";

import { ProductShareButtons } from "@/components/product/productShareButtons";
import { ProductQuantitySelector } from "@/components/product/productQuantitySelector";
import { ProductRating } from "@/components/product/productRating";
import { ProductImageGallery } from "@/components/product/productImageGallery";
import { ProductDescription } from "@/components/product/productDescription";
import { Badge } from "@/components/common/badge";
import { useState } from "react";

export default function TestComponentsPhase2Page() {
  const [quantity, setQuantity] = useState(5);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const mockImages = [
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
    "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=500",
    "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500",
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500",
  ];

  const mockDescription = `Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.

Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra.`;

  const mockFeatures = [
    "100 g of fresh leaves provides.",
    "Aliquam ac est at augue volutpat elementum.",
    "Quisque nec enim eget sapien molestie.",
    "Proin convallis odio volutpat finibus posuere.",
  ];

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Added ${quantity} items to cart!`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-[#111827]">
          Phase 2 Components Test
        </h1>

        {/* ProductShareButtons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductShareButtons Component
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6">
            <ProductShareButtons
              title="Chinese Cabbage"
              description="Fresh organic Chinese Cabbage"
            />
          </div>
        </section>

        {/* ProductQuantitySelector */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductQuantitySelector Component
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6 space-y-4">
            <ProductQuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
              isWishlisted={isWishlisted}
              loading={loading}
            />
          </div>
        </section>

        {/* ProductRating */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductRating Component
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6 space-y-4">
            <ProductRating rating={5} reviewCount={4} sku="2,51,594" />
            <ProductRating rating={4.5} reviewCount={127} sku="AB-1234" />
            <ProductRating rating={3} reviewCount={0} showSku={false} />
          </div>
        </section>

        {/* ProductImageGallery */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductImageGallery Component
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6">
            <div className="max-w-2xl mx-auto">
              <ProductImageGallery
                images={mockImages}
                alt="Chinese Cabbage"
                productName="Chinese Cabbage"
              />
            </div>
          </div>
        </section>

        {/* ProductDescription */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductDescription Component
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6">
            <ProductDescription
              description={mockDescription}
              features={mockFeatures}
            />
          </div>
        </section>

        {/* Combined Preview */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            Combined Product Info Preview
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[32px] font-bold text-[#111827] mb-2">
                  Chinese Cabbage
                </h3>
                <ProductRating rating={5} reviewCount={4} sku="2,51,594" />
              </div>
              <Badge variant="inStock">In Stock</Badge>
            </div>

            <ProductShareButtons title="Chinese Cabbage" />

            <p className="text-[#6F6F6F] text-base leading-relaxed">
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel
              consequat nec, ultrices et ipsum.
            </p>

            <ProductQuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
              isWishlisted={isWishlisted}
              loading={loading}
            />

            <div className="border-t border-[#E5E7EB] pt-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#6F6F6F]">Category:</span>
                <span className="text-[#111827] font-medium">Vegetables</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <span className="text-[#6F6F6F]">Tag:</span>
                <div className="flex gap-2">
                  {["Vegetables", "Healthy", "Chinese", "Cabbage"].map((tag) => (
                    <span key={tag} className="text-[#111827] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
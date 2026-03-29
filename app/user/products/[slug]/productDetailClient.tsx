"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductImageGallery } from "@/components/product/productImageGallery";
import { ProductInfo } from "@/components/product/productInfo";
import { ProductTabs } from "@/components/product/productTabs";
import { RelatedProducts } from "@/components/product/relatedProducts";
import {
  useUserProductsBySlug,
  useUserWishlist,
} from "@/lib/hooks/userDashboard/useUser";
import { UserProductLoader } from "@/components/common/skeletonTable";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

interface ProductDetailClientProps {
  // product: ProductMock & { reviews: Review[] };
  // relatedProducts: RelatedProduct[];
  resolvedParams: { slug: string };
}

export function ProductDetailClient({
  resolvedParams,
}: ProductDetailClientProps) {
  const wishlist = useAppSelector((state) => state.wishlist);
  const [wishlistedProducts, setWishlistedProducts] = useState(
    wishlist.wishlist?.data || [],
  );
  const router = useRouter();
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/user/categories?category=${categoryId}`);
  };

  //Hook to fecth Product Details
  const { userProductsSlug, isLoading } = useUserProductsBySlug(
    resolvedParams.slug,
  );

  const { mutate: postWishlist } = useUserWishlist();

  const product: Product = userProductsSlug?.data;
  const relatedProducts = product?.relatedProducts;

  //console.log(product, "product slug");

  if (isLoading) return <UserProductLoader />;

  const handleToggleWishlist = () => {
    if (!product?.slug) return;

    postWishlist(product._id);

    setWishlistedProducts((prev = []) => {
      const exists = prev.some((item: any) => item.slug === product.slug);

      return exists
        ? prev.filter((item: any) => item.slug !== product.slug)
        : [...prev, product];
    });
  };

  const handleRelatedProductAddToCart = (productId: string) => {
    //console.log("Add related product to cart:", productId);
    alert(`Added product ${productId} to cart!`);
  };

  const handleRelatedProductWishlist = (productId: string) => {
    setWishlistedProducts((prev: any) =>
      prev.includes(productId)
        ? prev.filter((id: any) => id !== productId)
        : [...prev, productId],
    );
  };
  // console.log("Add related product to cart:", wishlistedProducts);
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#6F6F6F]">
          <Link href="/" className="transition-colors hover:text-[#2E7D32]">
            Home
          </Link>
          <span>/</span>
          <button
            onClick={() => handleCategoryClick(product?.category?._id)}
            className="cursor-pointer transition-colors hover:text-[#2E7D32]"
          >
            {product?.category?.name}
          </button>
          <span>/</span>
          <span className="font-medium text-[#111827]">{product?.name}</span>
        </nav>

        {/* Product Section */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <ProductImageGallery
              images={product?.images}
              alt={product?.name}
              productName={product?.name}
            />
          </div>

          <div>
            <ProductInfo
              product={product}
              name={product?.name}
              price={product?.price}
              originalPrice={product?.salePrice}
              inStock={product?.inStock}
              rating={product?.rating || 0}
              reviewCount={product?.reviews?.length}
              sku={product?.sku}
              description={product?.description.split("\n")[0]}
              category={product?.category}
              tags={product?.tags}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlistedProducts?.some(
                (item: any) => item?.slug === product?.slug,
              )}
              maxQuantity={product?.stockQuantity}
            />
          </div>
        </div>

        {/* Product Tabs Section with Reviews */}
        <div className="mb-16">
          <ProductTabs
            isPaid={product?.isPurchased}
            description={product?.description}
            features={product?.isFeatures}
            reviews={product?._id}
            additionalInfo={
              product?.additionalInfo && (
                <div className="text-base text-[#6F6F6F]">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.additionalInfo).map(
                        ([key, value], index, array: any[]) => (
                          <tr
                            key={key}
                            className={
                              index < array.length - 1
                                ? "border-b border-[#E5E7EB]"
                                : ""
                            }
                          >
                            <td className="w-1/3 py-3 pr-4 font-medium text-[#111827] capitalize">
                              {key}
                            </td>
                            <td className="py-3 text-[#6F6F6F]">{value}</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              )
            }
          />
        </div>

        {/* Related Products Section */}
        <RelatedProducts
          products={relatedProducts}
          title="Related Products"
          viewAllLink="/products"
          onAddToCart={handleRelatedProductAddToCart}
          onToggleWishlist={handleRelatedProductWishlist}
          //wishlistedProducts={wishlistedProducts}
        />
      </div>
    </div>
  );
}

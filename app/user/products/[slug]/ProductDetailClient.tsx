"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, ProductMock, RelatedProduct } from "@/types/product";
import { Review } from "@/types/review";
import { ProductImageGallery } from "@/components/product/productImageGallery";
import { ProductInfo } from "@/components/product/productInfo";
import { ProductTabs } from "@/components/product/productTabs";
import { RelatedProducts } from "@/components/product/relatedProducts";
import {
  useUserProductsBySlug,
  useUserWishlist,
} from "@/lib/hooks/userDashboard/useUser";
import Loader from "@/components/common/loader";
import { UserProductLoader } from "@/components/common/skeletonTable";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

interface ProductDetailClientProps {
  // product: ProductMock & { reviews: Review[] };
  relatedProducts: RelatedProduct[];
  resolvedParams: { slug: string };
}

export function ProductDetailClient({
  relatedProducts,
  resolvedParams,
}: ProductDetailClientProps) {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);
  const [wishlistedProducts, setWishlistedProducts] = useState(
    wishlist.wishlist?.data || [],
  );
  const router = useRouter();
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/user/categories?category=${categoryId}`);
  };

  //Hook to fecth Product Details
  const { userProductsSlug, isLoading, error } = useUserProductsBySlug(
    resolvedParams.slug,
  );

  const {
    isPending,
    mutate: postWishlist,
    error: wishlistError,
  } = useUserWishlist();

  const product: Product = userProductsSlug?.data;

  if (isLoading) return <UserProductLoader />;
  // const handleAddToCart = async (quantity: number) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       console.log(`Added ${quantity} of ${product?.name} to cart`);
  //       alert(`Added ${quantity} ${product?.name} to cart!`);
  //       resolve(true);
  //     }, 500);
  //   });
  // };

  // const handleToggleWishlist = () => {
  //   if (product?._id) {
  //     postWishlist(product._id);

  //     setWishlistedProducts((prev) =>
  //       prev.includes(product?.slug)
  //         ? prev.filter((id) => id !== product.slug)
  //         : [...prev, product?.slug],
  //     );
  //   }

  //   // dispatch(setWishlistAction([...wishlistedProducts, product._id]));
  // };

  const handleToggleWishlist = () => {
    if (!product?.slug) return;

    postWishlist(product._id);

    // dispatch(setWishlistAction([...wishlistedProducts, product.slug]));

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
              rating={product?.rating || 5}
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
            description={product?.description}
            features={product?.isFeatures}
            reviews={product?.reviews}
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

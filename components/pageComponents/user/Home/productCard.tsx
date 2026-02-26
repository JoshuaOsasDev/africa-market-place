import TextStyle from "@/components/common/textStyle";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/hooks/useCart";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdStar } from "react-icons/md";

function ProductCard({ product }: { product: any }) {
  const { isInCart, addToCart, removeFromCart, isAdding, isRemoving } =
    useCart(product);

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling

    if (isInCart) {
      removeFromCart(product);
    } else {
      addToCart(product, 1);
    }
  };

  const isProcessing = isAdding || isRemoving;

  return (
    <div className="group col-span-1 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <Link href={`user/products/${product?.slug}`}>
        <div className="relative flex h-[300px] w-full flex-col space-y-2 border-0 bg-[#FCFCFCFC] px-2 py-2">
          {/* discount section starts */}
          {product.discount && product.discount > 0 && (
            <div className="absolute top-1 left-1 flex flex-row items-center justify-center rounded-[5px] border-0 bg-[#FF0000] px-2 py-1">
              <TextStyle
                textContent={`%${product.discount}`}
                textStyle="text-white text-center text-[8px]"
              />
            </div>
          )}
          {/* discount section ends */}

          <div className="relative mx-auto mt-8 h-[175.67px] w-[175.67px]">
            <Image
              src={product?.images?.[0]?.url}
              fill
              alt={product?.images?.[0]?._id || product.name}
              className="rounded-lg transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* description section starts */}
          <div className="flex flex-1 flex-col justify-end space-y-1">
            <TextStyle textContent={product.name} textStyle="" />
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-baseline space-x-1">
                <TextStyle
                  textContent={"$" + product?.salePrice.toString()}
                  textStyle="text-black text-[24px] text-tracking-[2px]"
                />
                {product.price !== product.salePrice && (
                  <TextStyle
                    textContent={"$" + product.price.toString()}
                    textStyle="text-[#6F6F6F] line-through text-sm"
                  />
                )}
              </div>
              <div className="flex flex-row items-center space-x-0">
                {/* star rating starts */}
                <div className="flex flex-row items-center space-x-1">
                  {[...Array(product.rate || 0)].map((_, i) => (
                    <MdStar key={i} className="h-3 w-3 text-yellow-500" />
                  ))}
                </div>
                {/* star rating ends */}
              </div>
            </div>

            {/* Cart Button - prevents Link navigation */}
            <Button
              onClick={handleCartAction}
              disabled={isProcessing}
              className={`lg-[205px] mx-auto flex h-[41px] w-3/4 flex-row items-center justify-center gap-2 rounded-[10px] border transition-colors md:w-[180px] ${
                isInCart
                  ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                  : "border-[#2E7D32] bg-white text-[#2E7D32] hover:bg-green-50"
              }`}
              variant="ghost"
            >
              {isProcessing ? (
                <TextStyle
                  textContent={isAdding ? "Adding..." : "Removing..."}
                  textStyle="animate-pulse"
                />
              ) : isInCart ? (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <TextStyle textContent="Remove from Cart" />
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <TextStyle textContent="Add To Cart" />
                </>
              )}
            </Button>
          </div>
          {/* description section ends */}
        </div>
      </Link>
    </div>
  );
}

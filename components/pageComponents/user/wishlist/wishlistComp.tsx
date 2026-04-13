"use client";

// types/wishlist.ts
export interface WishlistItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  images: { url: string }[];
  status?: string;
}

export interface WishlistState {
  data: WishlistItem[];
}

export interface WishlistSliceState {
  wishlist: WishlistState;
}

import Modal from "@/components/common/modal";
import Pagination from "@/components/common/pagination";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DeleteProductModal from "@/components/pageComponents/vendor/product/deleteProductModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import NoOrder from "@/components/pageComponents/vendor/order/noOrder";
import { setWishlistAction } from "@/redux/slices/wishlist";
import { PostUserWishlist } from "@/services/apiServices/userDashboard";
import { useCart } from "@/lib/hooks/useCart";

export default function WishListComp() {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const wishlistData = useAppSelector((state) => state.wishlist.wishlist.data);
  const { isProductInCart, addToCart, removeFromCart, isAdding, isRemoving } =
    useCart();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (wishlistData?.length === 0 || !wishlistData) {
    return (
      <div className="mt-15 flex flex-col items-center justify-center gap-5 md:mt-0">
        <NoOrder
          show={false}
          showFormNoOrder={false}
          productForm={<></>}
          type="Wishlist"
          paragraph="No wishlist yet, please add"
        />
      </div>
    );
  }

  const visibleItems = wishlistData?.slice(startIndex, endIndex);

  const handleRemoveFromWishlist = (itemId: string) => {
    if (!itemId) return;
    PostUserWishlist(itemId);
    const updatedWishlist = wishlistData.filter((item) => item._id !== itemId);
    dispatch(setWishlistAction({ data: updatedWishlist }));
  };

  const handleCartAction = (
    e: React.MouseEvent,
    product: any,
    quantity: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    if (isProductInCart(product?._id)) {
      removeFromCart(product);
    } else {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-6 px-4 py-6 md:mt-0 md:px-0 md:py-0">
      <h2 className="text-2xl font-semibold tracking-tight">Wishlist</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleItems?.map((item: WishlistItem) => (
          <div
            key={item._id}
            className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            {/* Product Info Row */}
            <div className="flex items-start gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#F6F6F6]">
                <Image
                  src={item?.images[0].url}
                  fill
                  alt={item.name}
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="truncate text-sm leading-snug font-medium text-gray-900">
                    {item.name}
                  </span>
                  {item.status && (
                    <span className="shrink-0 rounded-md bg-green-50 px-1.5 py-0.5 text-[11px] font-medium text-green-700">
                      {item.status}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    £{item.price}
                  </span>
                  {item.salePrice && (
                    <span className="text-sm text-gray-400 line-through">
                      £{item.salePrice}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gray-100" />

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <Modal>
                <Modal.Open opens={`delete-wishlist-${item._id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                    <span>Remove</span>
                  </Button>
                </Modal.Open>
                <Modal.Window
                  name={`delete-wishlist-${item._id}`}
                  className="max-w-md"
                >
                  <DeleteProductModal
                    onConfirm={() => handleRemoveFromWishlist(item._id)}
                    text="order"
                    productName={item.name}
                  />
                </Modal.Window>
              </Modal>

              <Button
                onClick={(e) => handleCartAction(e, item, 1)}
                size="sm"
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  isProductInCart(item?._id)
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "bg-green-50 text-green-700 hover:bg-green-100"
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isProductInCart(item?._id) ? "In cart" : "Add to cart"}
                </span>
                <span className="sm:hidden">
                  {isProductInCart(item?._id) ? "In cart" : "Add"}
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalItems={wishlistData?.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

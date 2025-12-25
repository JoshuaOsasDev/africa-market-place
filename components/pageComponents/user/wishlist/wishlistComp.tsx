"use client";

import Modal from "@/components/common/Modal";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { wishlistData } from "@/lib/data";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DeleteProductModal from "../../vendor/product/DeleteProductModal";

export default function WishListComp() {
  const itemsPerPage = 12; // 4 columns × 3 rows
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate visible items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = wishlistData.slice(startIndex, endIndex);

  return (
    <div className="mt-10 flex flex-col gap-5 md:mt-0">
      <h2 className="text-3xl font-semibold">Wishlist</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="flex w-full flex-col justify-center gap-5 rounded-[12px] bg-white px-4 py-6 md:w-[260px] md:gap-2.5 md:p-3"
          >
            <div className="flex items-center">
              <div className="relative h-15 w-15 rounded-xl bg-[#F6F6F6]">
                <Image src={item.image} fill alt={item.name} />
              </div>

              <div className="ml-2 flex flex-col gap-2">
                <div>
                  <span className="font-medium">{item.name}</span>{" "}
                  <span className="rounded-sm bg-[#2E7D321A] px-1 py-0.5 text-[12px] text-[#2E7D32]">
                    {item.status}
                  </span>
                  <p className="flex items-center space-x-2.5">
                    <span className="text-[20px] font-semibold">
                      ${item.price}
                    </span>
                    <span className="text-[16px] text-[#7D7D7D] line-through">
                      ${item.oldPrice}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 pr-3">
              <Modal>
                <Modal.Open opens={`delete-wishlist-${item.id}`}>
                  <Button className="rounded-[27px] bg-transparent px-3 py-2 font-medium text-[#FF7566]">
                    <Trash />
                    <span>Remove</span>
                  </Button>
                </Modal.Open>
                <Modal.Window
                  name={`delete-wishlist-${item.id}`}
                  className="max-w-md"
                >
                  <DeleteProductModal
                    onConfirm={() => console.log("DELETE:", item.id)}
                    text="order"
                    productName={item.name}
                  />
                </Modal.Window>
              </Modal>

              <Button className="w-fit items-center rounded-[27px] bg-transparent px-3 py-2 font-medium text-[#2E7D32]">
                <ShoppingBag />
                <span>Add to cart</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalItems={wishlistData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

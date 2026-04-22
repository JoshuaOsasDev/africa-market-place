"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Eye, Pen, Trash } from "lucide-react";

import { Product } from "@/types/appTypes";
import Modal from "@/components/common/modal";
import ReusableTable from "@/components/common/reusableTable";

import EditProduct from "./editProduct";
import DeleteProductModal from "./deleteProductModal";

const statusStyles: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft: "bg-yellow-100 text-yellow-700",
  pending: "bg-gray-100 text-gray-600",
  "Out of Stock": "bg-red-100 text-red-700",
};

export default function ProductTableReactTable({
  products,
  totalPages,
  isPending,
}: {
  totalPages: number;
  products: Product[];
  isPending: boolean;
}) {
  return (
    <div className="w-full">
      <ReusableTable
        // key={products?.id}
        order="product"
        data={products}
        totalPages={totalPages}
        columnsStyle="44px 2.5fr 1fr 1fr 1fr 1.3fr 1.3fr 1.1fr"
        columns={[
          {
            label: (
              <div className="flex items-center justify-between gap-2">
                <h3 className="pr-3 font-medium text-[#333843]">Product</h3>
                <ChevronDown className="h-4 w-4 text-[#858D9D]" />
              </div>
            ),
            renderCell: (item: Product) => (
              <div className="flex items-center gap-3">
                {item?.image?.url ? (
                  <div className="shrink-0 rounded-lg bg-[#F6F6F6]">
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-[#F6F6F6]"></div>
                )}
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="truncate text-sm font-medium text-[#333843]">
                    {item.name}
                  </span>
                  {/* <span className="text-[12px] text-[#667085]">
                    <span className="text-[12px] text-[#667085]">
                      {typeof item.category === "object"
                        ? item.category?.name
                        : item.category || "General"}
                    </span>
                  </span> */}
                </div>
              </div>
            ),
          },
          {
            label: (
              <div className="ml-2.5 text-lg font-medium text-[#333843]">
                <h3>SKU</h3>
              </div>
            ),
            renderCell: (item: Product) => (
              <span className="text-sm font-semibold text-[#2E7D32]">
                {item.sku}
              </span>
            ),
          },
          {
            label: (
              <div className="flex items-center gap-2">
                <h3 className="pr-3 font-medium text-[#333843]">Stock</h3>
                <ChevronDown className="h-4 w-4 text-[#858D9D]" />
              </div>
            ),
            renderCell: (item: Product) => (
              <span className="text-sm text-[#333843]">
                {item?.stockQuantity}
              </span>
            ),
          },
          {
            label: (
              <div className="flex items-center gap-2">
                <h3 className="pr-3 text-[#333843]">Price</h3>
                <ChevronDown className="h-4 w-4 text-[#858D9D]" />
              </div>
            ),
            renderCell: (item: Product) => (
              <span className="text-sm font-medium text-[#333843]">
                ${item.price.toFixed(2)}
              </span>
            ),
          },
          {
            label: (
              <div className="flex items-center gap-2">
                <h3 className="pr-3 text-[#333843]">Status</h3>
                <ChevronDown className="h-4 w-4 text-[#858D9D]" />
              </div>
            ),
            renderCell: (item: Product) => (
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
                  statusStyles[item.status] || "bg-gray-100"
                }`}
              >
                {item.status}
              </span>
            ),
          },
          {
            label: (
              <div className="flex items-center gap-2">
                <h3 className="pr-3 text-[#333843]">Added</h3>
                <ChevronDown className="h-4 w-4 text-[#858D9D]" />
              </div>
            ),
            renderCell: (item: Product) => {
              const formattedDate = new Date(
                item?.createdAt,
              ).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              return (
                <span className="text-sm whitespace-nowrap text-[#667085]">
                  {formattedDate}
                </span>
              );
            },
          },
          {
            label: (
              <div className="text-lg font-medium text-[#333843]">
                <h3>Action</h3>
              </div>
            ),
            renderCell: (item: Product) => (
              <div className="flex items-center gap-2">
                <Link href={`/vendor/dashboard/product/${item?.slug}`}>
                  <Eye className="h-5 w-5 text-[#667085] hover:text-gray-900" />
                </Link>

                <Modal>
                  <Modal.Open opens={`edit-product-${item.slug}`}>
                    <button type="button" className="hover:text-gray-900">
                      <Pen className="h-5 w-5 text-[#667085]" />
                    </button>
                  </Modal.Open>
                  <Modal.Window
                    name={`edit-product-${item.slug}`}
                    className="top-4.5 my-auto max-w-3xl overflow-y-scroll"
                  >
                    <EditProduct existingData={item.slug} />
                  </Modal.Window>
                </Modal>

                <Modal>
                  <Modal.Open opens={`delete-product-${item.id}`}>
                    <button
                      disabled={isPending}
                      type="button"
                      className="hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash className="h-5 w-5 text-[#667085]" />
                    </button>
                  </Modal.Open>
                  <Modal.Window
                    name={`delete-product-${item.id}`}
                    className="max-w-md"
                  >
                    <DeleteProductModal
                      productName={item.name}
                      text="product"
                      onConfirm={() => console.log(item.slug)}
                      disabled={isPending}
                    />
                  </Modal.Window>
                </Modal>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

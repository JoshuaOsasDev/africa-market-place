"use client";

import Table from "@/components/common/Table";
import { Product } from "@/types/appTypes";
import { Eye, Pen, Trash } from "lucide-react";
import Image from "next/image";

import Modal from "@/components/common/Modal";
import Link from "next/link";
import EditProduct from "./EditProduct";
import DeleteProductModal from "./DeleteProductModal";

interface ProductRenderProps {
  product: Product;
}

const statusStyles: Record<Product["status"], string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-gray-100 text-gray-600",
  "Low Stock": "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

export default function ProductRender({ product }: ProductRenderProps) {
  const formattedDate = new Date(product.addedDate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <Table.Row>
      {/* Checkbox */}

      <input
        className="h-5 w-5 rounded-md border-2 border-[#858D9D]"
        type="checkbox"
      />

      {/* Product */}
      <div className="flex items-center gap-3">
        <div className="shrink-0 rounded-lg bg-[#F6F6F6]">
          <Image
            src={product.image}
            alt={product.name}
            width={40}
            height={40}
            className="rounded-lg"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="truncate text-sm font-medium text-[#333843]">
            {product.name}
          </span>
          <span className="text-[12px] text-[#667085]">+ 3 other product</span>
        </div>
      </div>

      {/* SKU */}
      <div className="flex items-center">
        <span className="text-sm font-semibold text-[#2E7D32]">
          {product.sku}
        </span>
      </div>

      {/* Category */}
      <div className="flex items-center">
        <span className="truncate text-sm text-[#667085]">
          {product.category}
        </span>
      </div>

      {/* Stock */}
      <div className="flex items-center">
        <span className="text-sm text-[#333843]">{product.stock}</span>
      </div>

      {/* Price */}
      <div className="flex items-center">
        <span className="text-sm font-medium text-[#333843]">
          ${product.price.toFixed(2)}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center">
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${statusStyles[product.status]}`}
        >
          {product.status}
        </span>
      </div>

      {/* Added */}
      <div className="flex items-center">
        <span className="text-sm whitespace-nowrap text-[#667085]">
          {formattedDate}
        </span>
      </div>

      {/* Action */}
      <div className="flex items-center gap-1">
        <Link href={"/dashboard/product/details"}>
          <Eye className="h-5 w-5 text-[#667085] hover:text-gray-900" />
        </Link>

        <Modal>
          <Modal.Open opens="edit-product">
            <button type="button" className="flex items-center">
              <Pen className="h-5 w-5 text-[#667085] hover:text-gray-900" />
            </button>
          </Modal.Open>

          <Modal.Window
            name="edit-product"
            className="top-4.5 my-auto max-w-3xl overflow-y-scroll"
          >
            <EditProduct />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete-product">
            <button type="button" className="flex items-center">
              <Trash className="h-5 w-5 text-[#667085] hover:text-red-700" />
            </button>
          </Modal.Open>

          <Modal.Window name="delete-product" className="max-w-md">
            <DeleteProductModal
              productName={product.name}
              onConfirm={() => console.log("DELETE:", product.id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

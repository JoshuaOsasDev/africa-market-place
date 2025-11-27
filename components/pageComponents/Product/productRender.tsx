"use client";

import Table from "@/components/common/Table";
import { Product } from "@/types/appTypes";
import { Eye, Pen, Trash } from "lucide-react";
import Image from "next/image";
import DeleteProductModal from "./DeleteProductModal";
import Modal from "@/components/common/Modal";
import Link from "next/link";
import EditProduct from "./EditProduct";

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
      {/* Product */}
      <input
        className="h-5 w-5 rounded-md border-2 border-[#858D9D]"
        type="checkbox"
      />
      <div className="ml-5 flex items-center justify-start gap-2">
        <div className="rounded-lg bg-[#F6F6F6]">
          <Image
            src={product.image}
            alt={product.name}
            width={40}
            height={40}
            className="rounded-lg"
          />
        </div>
        {/* <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-200" /> */}

        <div className="flex flex-col items-center justify-center gap-1 text-sm text-[#333843]">
          <span className="text-sm font-medium">{product.name}</span>
          <span className="text-[12px] text-[#667085]">+ 3 other product</span>
        </div>
      </div>

      {/* SKU */}
      <span className="text-sm font-semibold text-[#2E7D32]">
        {product.sku}
      </span>

      {/* Category */}
      <span className="text-sm text-[#667085]">{product.category}</span>

      {/* Stock */}
      <span className="pl-2 text-sm text-[#333843]">{product.stock}</span>

      {/* Price */}
      <span className="text-sm font-medium text-[#333843]">
        ${product.price.toFixed(2)}
      </span>

      {/* Status */}
      <div>
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[product.status]}`}
        >
          {product.status}
        </span>
      </div>

      {/* Added */}
      <span className="text-sm text-[#667085]">{formattedDate}</span>

      {/* Action */}
      <button className="flex items-center justify-center gap-1 rounded p-1">
        <Link href={"/dashboard/product/details"}>
          <Eye className="h-5 w-5 text-[#667085] hover:text-gray-900" />
        </Link>

        <Modal>
          <Modal.Open opens="edit-product">
            <Pen className="h-5 w-5 text-[#667085] hover:text-gray-900" />
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
            <span className="flex items-center gap-1 p-1">
              <Trash className="h-5 w-5 text-[#667085] hover:text-red-700" />
            </span>
          </Modal.Open>

          <Modal.Window name="delete-product" className="max-w-md">
            <DeleteProductModal
              productName={product.name}
              onConfirm={() => console.log("DELETE:", product.id)}
            />
          </Modal.Window>
        </Modal>
        {/* <Trash className="h-5 w-5 text-[#667085] hover:text-gray-900" /> */}
      </button>
    </Table.Row>
  );
}

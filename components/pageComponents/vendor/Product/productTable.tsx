"use client";
import Table from "@/components/common/Table";
import { ChevronDown } from "lucide-react";
import ProductRender from "./productRender";
import { products } from "@/lib/data";
import { Product } from "@/types/appTypes";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";

export default function ProductTable({
  ITEMS_PER_PAGE = 5,
  TableBodyClassName,
}: {
  ITEMS_PER_PAGE: number;
  TableBodyClassName?: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <Table columns="2px 2.5fr 0.85fr 1fr 1.1fr 1.1fr 1.3fr 1.3fr 1.1fr">
        <Table.Header>
          <div className="">
            <input
              className="h-5 w-5 rounded-[6px] border-2 border-[#858D9D]"
              type="checkbox"
            />
          </div>
          {/* product heading */}

          <div className="ml-20 flex items-center justify-start gap-2">
            <h3 className="pr-3 pl-1 text-lg font-medium text-[#333843]">
              Product
            </h3>
          </div>

          {/* SKU */}
          <div className="ml-2.5 text-lg font-medium text-[#333843]">
            <h3>SKU</h3>
          </div>
          {/* Category */}
          <div className="text-lg font-medium text-[#333843]">
            <h3>Category</h3>
          </div>
          {/* Stock */}
          <div className="flex items-center justify-start gap-2">
            <h3 className="pr-3 font-medium text-[#333843]">Stock</h3>
            <ChevronDown className="text-[#858D9D]" />
          </div>

          {/* Price */}
          <div className="flex items-center justify-start gap-2">
            <h3 className="pr-3 text-[#333843]">Price</h3>
            <ChevronDown className="text-[#858D9D]" />
          </div>

          {/* Added */}
          <div className="flex items-center justify-start gap-2">
            <h3 className="pr-3 text-[#333843]">Status</h3>
            <ChevronDown className="text-[#858D9D]" />
          </div>

          {/* Action */}
          <div className="flex items-center justify-start gap-2">
            <h3 className="pr-3 text-[#333843]">Added</h3>
            <ChevronDown className="text-[#858D9D]" />
          </div>

          {/* Action */}
          <div className="text-lg font-medium text-[#333843]">
            <h3>Action</h3>
          </div>
        </Table.Header>

        <Table.Body
          TableBodyClassName={TableBodyClassName}
          data={paginatedProducts}
          render={(product: { product: Product }) => (
            <ProductRender key={product.id} product={product} />
          )}
        />
        {/* <Table.Footer>Footer</Table.Footer> */}
        <Table.Footer>
          <Pagination
            currentPage={currentPage}
            totalItems={products.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </Table.Footer>
      </Table>
    </>
  );
}

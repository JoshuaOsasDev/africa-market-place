"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useRowSelect } from "@table-library/react-table-library/select";
import { ChevronDown, Eye, Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/appTypes";

import Modal from "@/components/common/Modal";

import SkeletonTable from "@/components/common/skeletonTable";
import DeleteProductModal from "./DeleteProductModal";
import EditProduct from "./EditProduct";
import Pagination from "@/components/common/Pagination";

const statusStyles: Record<Product["status"], string> = {
  published: "bg-green-100 text-green-700",
  draft: "bg-yellow-100  text-yellow-700",
  pending: "bg-gray-100 text-gray-600",
  "Out of Stock": "bg-red-100 text-red-700",
};

// Header Checkbox Component with indeterminate support
function HeaderCheckbox({
  checked,
  onChange,
  isIndeterminate,
}: {
  checked: boolean;
  onChange: () => void;
  isIndeterminate: boolean;
}) {
  // Use ref to set indeterminate property
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <input
      ref={checkboxRef}
      className="h-5 w-5 rounded-[6px] border-2 border-[#858D9D]"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
}

const defaultImageUrl = "lib/public/images/meat.jpg"; // Path to a local image in your public folder

export default function ProductTableReactTable({
  ITEMS_PER_PAGE = 5,
  products: products,
  onDelete,
  isPending,
}: {
  ITEMS_PER_PAGE?: number;
  products: Product[];
  onDelete?: (id: string) => void;
  isPending?: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products
    ?.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    .map((product) => ({
      ...product,
      id: product.slug,
    }));

  const data = useMemo(
    () => ({ nodes: paginatedProducts }),
    [paginatedProducts],
  );

  //ThEME CUSTOMIZATION
  const theme = {
    ...getTheme(),
    Table: `
      --data-table-library_grid-template-columns: 
        44px 2.5fr 1fr 1.1fr 1.1fr 1.3fr 1.3fr 1.1fr;

      border-bottom: 1px solid #F0F1F3;
      background: white;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      border-radius: 8px;
    `,
    HeaderRow: `
      background: #F9F9FC;
      border-bottom: 1px solid #F0F1F3;
    `,
    HeaderCell: `
      font-weight: 600;
      padding: 18px 0px 18px 22px;
      font-size: 16px;
      color: #333843;
    `,
    Row: `
      border-bottom: 1px solid #F0F1F3;
      padding: 18px 0px 18px 22px;
      font-size: 14px;

      &:last-child { border-bottom: none; }
     &:hover { background: #FAFAFF; }

    `,
    Cell: `
      padding: 18px 0px 18px 22px;
    `,
  };

  //Select checkbox logic
  const select = useRowSelect(data, {
    onChange: (action, state) => {
     // console.log("Selected rows:", state.ids);
    },
  });

  //Table COLUMNS DEFINITION
  const COLUMNS = [
    {
      label: (
        <div className="flex items-center justify-center">
          <HeaderCheckbox
            checked={select.state.all}
            onChange={() => select.fns.onToggleAll({})}
            isIndeterminate={!select.state.all && !select.state.none}
          />
        </div>
      ),
      renderCell: (item: Product) => (
        <div className="flex items-center justify-center">
          <input
            className="h-5 w-5 rounded-md border-2 border-[#858D9D]"
            type="checkbox"
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
          />
        </div>
      ),
      pinLeft: true,
    },

    {
      label: (
        <div className="flex items-center justify-between gap-2">
          <h3 className="font--bold pr-3 font-medium text-[#333843]">
            Product
          </h3>
          <ChevronDown className="h-4 w-4 text-[#858D9D]" />
        </div>
      ),
      renderCell: (item: Product) => (
        <div className="flex items-center gap-3">
          {item?.image?.url && (
            <div className="shrink-0 rounded-lg bg-[#F6F6F6]">
              <Image
                src={item.image?.url}
                alt={item.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-sm font-medium text-[#333843]">
              {item.name}
            </span>
            <span className="text-[12px] text-[#667085]">
              + 3 other product
            </span>
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
        <span className="text-sm font-semibold text-[#2E7D32]">{item.sku}</span>
      ),
    },

    // {
    //   label: (
    //     <div className="text-lg font-medium text-[#333843]">
    //       <h3>Category</h3>
    //     </div>
    //   ),
    //   renderCell: (item: Product) => (
    //     <span className="truncate text-sm text-[#667085]">{item.category}</span>
    //   ),
    // },

    {
      label: (
        <div className="flex items-center gap-2">
          <h3 className="pr-3 font-medium text-[#333843]">Stock</h3>
          <ChevronDown className="h-4 w-4 text-[#858D9D]" />
        </div>
      ),
      renderCell: (item: Product) => (
        <span className="text-sm text-[#333843]">{item?.stockQuantity}</span>
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
          className={`inline-block rounded-full px-2.5 py-1 text-lg font-medium whitespace-nowrap ${statusStyles[item.status]}`}
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
        const formattedDate = new Date(item?.createdAt).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        );
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
        <div className="flex items-center gap-1">
          <Link href={`/vendor/dashboard/product/${item?.slug}`}>
            <Eye className="h-5 w-5 text-[#667085] hover:text-gray-900" />
          </Link>

          <Modal>
            <Modal.Open opens={`edit-product-${item.slug}`}>
              <button
                type="button"
                className="flex cursor-pointer items-center hover:text-gray-900"
              >
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
                className="flex cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash className="h-5 w-5 cursor-pointer text-[#667085]" />
              </button>
            </Modal.Open>

            <Modal.Window
              name={`delete-product-${item.id}`}
              className="max-w-md"
            >
              <DeleteProductModal
                productName={item.name}
                text="product"
                onConfirm={() => onDelete?.(item.slug)}
                disabled={isPending}
              />
            </Modal.Window>
          </Modal>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-2 w-full overflow-x-auto">
      <Suspense fallback={<SkeletonTable />}>
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={theme}
          layout={{ custom: true }}
          select={select}
        />
      </Suspense>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={products.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

"use client";

import { useMemo, useRef, useEffect, Suspense, ReactNode } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useRowSelect } from "@table-library/react-table-library/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SkeletonTable from "@/components/common/skeletonTable";
import { useRouter, useSearchParams } from "next/navigation";
//  REMOVED: stray `import page from "@/app/(auth)/auth-vendor/resetPassword/page"` — was unused and polluted the namespace

type Column = {
  label: ReactNode;
  renderCell: (item: any) => ReactNode;
  pinLeft?: boolean;
};

type ReusableTableProps = {
  order: string | string[] | undefined;
  data: any[];
  totalPages?: number;
  totalCount?: number;
  columnsStyle?: string;
  columns: Column[];
  itemsPerPage?: number;
  onSelectChange?: (selectedIds: string[] | number[]) => void;
};

function HeaderCheckbox({
  checked,
  onChange,
  isIndeterminate,
}: {
  checked: boolean;
  onChange: () => void;
  isIndeterminate: boolean;
}) {
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

export default function ReusableTable({
  order,
  data = [],
  columns,
  totalPages = 1,
  columnsStyle = "",
  onSelectChange,
}: ReusableTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = 10;

  const currentPage = Number(searchParams.get("page")) || 1;

  const totalItems = totalPages ?? data.length;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);
  const averagePage = totalPages / 10;
  const updateSearchParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  const tableData = useMemo(
    () => ({
      nodes: Array.isArray(data)
        ? data.map((item, index) => ({
            ...item,
            id: item.id || item._id || `row-${index}`,
          }))
        : [],
    }),
    [data],
  );

  const theme = {
    ...getTheme(),
    Table: `
      --data-table-library_grid-template-columns: ${columnsStyle};
      width: 100%;
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

  const select = useRowSelect(tableData, {
    onChange: (action, state) => {
      onSelectChange?.(state.ids);
    },
  });

  const tableColumns = [
    // {
    //   label: (
    //     <div className="flex items-center justify-center">
    //       <HeaderCheckbox
    //         checked={select.state.all}
    //         onChange={() => select.fns.onToggleAll({})}
    //         isIndeterminate={!select.state.all && !select.state.none}
    //       />
    //     </div>
    //   ),
    //   renderCell: (item: any) => (
    //     <div className="flex items-center justify-center">
    //       <input
    //         className="h-5 w-5 rounded-md border-2 border-[#858D9D]"
    //         type="checkbox"
    //         checked={select.state.ids.includes(item.id)}
    //         onChange={() => select.fns.onToggleById(item.id)}
    //       />
    //     </div>
    //   ),
    //   pinLeft: true,
    // },
    ...columns,
  ];

  const handlePrevious = () => {
    if (currentPage > 1) {
      updateSearchParams("page", currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      updateSearchParams("page", currentPage + 1);
    }
  };

  const getPageNumbers = (): (number | "...")[] => {
    // Calculate how many pages actually exist based on limit (10)
    // We use Math.ceil to account for remainders (e.g., 11 items = 2 pages)
    const actualTotalPages = Math.ceil(totalPages / limit);

    // If there are few pages, just show them all
    if (actualTotalPages <= 7) {
      return Array.from({ length: actualTotalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    // Logical gate for the start ellipsis
    if (currentPage > 3) pages.push("...");

    // Determine the range around the current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(actualTotalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Logical gate for the end ellipsis
    if (currentPage < actualTotalPages - 2) pages.push("...");

    // Always show the last page
    pages.push(actualTotalPages);

    return pages;
  };

  if (!tableData.nodes || tableData.nodes.length === 0) {
    return (
      <div className="w-full rounded-lg border border-[#E0E2E7] bg-white p-12">
        <div className="text-center">
          <p className="text-lg font-medium text-[#667085]">
            No data available
          </p>
          <p className="mt-2 text-sm text-[#858D9D]">
            There are no items to display at this time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <Suspense fallback={<SkeletonTable />}>
          <CompactTable
            columns={tableColumns}
            data={tableData}
            theme={theme}
            layout={{ custom: true }}
            select={select}
          />
        </Suspense>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center border-t border-[#E0E2E7] bg-white px-6 py-4 md:justify-between">
        <div className="hidden text-sm font-medium text-[#667085] md:block">
          Showing {startItem}–{endItem} of {totalItems}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E0E2E7] bg-[#EAF2EA] p-1.5 text-[#2E7D32] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex h-9 min-w-9 items-center justify-center text-sm text-[#667085]"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => updateSearchParams("page", page)}
                className={`h-9 min-w-9 rounded-xl px-3 text-sm font-semibold transition-colors ${
                  page === currentPage
                    ? "bg-[#2E7D32] text-white"
                    : "bg-[#EAF2EA] text-[#2E7D32] hover:bg-[#c8e6c9]"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={handleNext}
            disabled={currentPage === Math.ceil(totalPages / limit)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E0E2E7] bg-[#EAF2EA] p-1.5 text-[#2E7D32] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

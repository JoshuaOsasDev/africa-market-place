"use client";

import { useMemo, useRef, useEffect, Suspense, ReactNode } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
//import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useRowSelect } from "@table-library/react-table-library/select";
import { usePagination } from "@table-library/react-table-library/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SkeletonTable from "@/components/common/skeletonTable";

type Column = {
  label: ReactNode;
  renderCell: (item: any) => ReactNode;
  pinLeft?: boolean;
};

type ReusableTableProps = {
  order: string | string[] | undefined;
  data: any[];
  columnsStyle?: string;
  columns: Column[];
  itemsPerPage?: number;
  onSelectChange?: (selectedIds: string[] | number[]) => void;
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
  data,
  columns,
  columnsStyle = "",
  itemsPerPage = 5,
  onSelectChange,
}: ReusableTableProps) {
  const tableData = useMemo(
    () => ({
      nodes: data?.map((item) => ({
        ...item,
        id: item.id || item._id,
      })),
    }),
    [data],
  );
  console.log(order, "reuseable");
  // Theme customization
  const theme = {
    ...getTheme(),
    Table: `
      --data-table-library_grid-template-columns: 
        ${columnsStyle};
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

  // Pagination hook
  const pagination = usePagination(tableData, {
    state: {
      page: 0,
      size: itemsPerPage,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action: any, state: any) {
    console.log(action, state);
  }

  // Select checkbox logic
  const select = useRowSelect(tableData, {
    onChange: (action, state) => {
      onSelectChange?.(state.ids);
    },
  });

  //select is a functional object given by the library to manage row selection
  // console.log("Selected IDs:", select.fns);
  // Build columns with checkbox
  const tableColumns = [
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
      renderCell: (item: any) => (
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
    ...columns,
  ];

  const totalPages = pagination.state.getTotalPages(tableData.nodes);
  const pageNumbers = pagination.state.getPages(tableData.nodes);
  const currentPage = pagination.state.page;

  // Calculate item range
  const startItem = currentPage * itemsPerPage + 1;
  const endItem = Math.min((currentPage + 1) * itemsPerPage, data.length);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);

      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
      }

      if (currentPage >= totalPages - 3) {
        startPage = Math.max(1, totalPages - (maxVisiblePages - 1));
      }

      if (startPage > 1) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages - 1);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      pagination.fns.onSetPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      pagination.fns.onSetPage(currentPage + 1);
    }
  };

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
            pagination={pagination}
          />
        </Suspense>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center border-t border-[#E0E2E7] bg-white px-6 py-4 md:justify-between">
        <div className="hidden text-sm font-medium text-[#667085] md:block">
          Showing {startItem}-{endItem} from {data.length}
        </div>

        <div className="flex items-center gap-2 md:justify-center">
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E0E2E7] bg-[#EAF2EA] p-1.5 text-[#2E7D32] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === "number" && pagination.fns.onSetPage(page)
              }
              disabled={page === "..."}
              className={`flex h-9 min-w-9 items-center justify-center rounded-xl p-1.5 text-sm font-semibold transition-colors ${
                page === currentPage
                  ? "bg-[#2E7D32] text-white"
                  : page === "..."
                    ? "cursor-default border-transparent bg-transparent text-[#667085]"
                    : "bg-[#EAF2EA] text-[#2E7D32] hover:bg-gray-100"
              }`}
            >
              {typeof page === "number" ? page + 1 : page}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E0E2E7] bg-[#EAF2EA] p-1.5 text-[#2E7D32] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

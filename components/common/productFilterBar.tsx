// ProductFilterBar.tsx
import { useAppSelector } from "@/redux/store";
import {
  ChevronDown,
  SlidersHorizontal,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

export default function ProductFilterBar({
  currentFilters,
  onFilterChange,
  totalCount,
  totalPages,
  loading,
}: any) {
  const page = parseInt(currentFilters.page);
  const limit = 10;
  const startEntry = (page - 1) * limit + 1;
  const endEntry = Math.min(page * limit, totalCount);

  const categories = useAppSelector((state) => state.categories);
  const CategoryOptions = categories.categories?.category || [];
  console.log(categories, CategoryOptions, "categories");
  return (
    <div className="mb-5 flex flex-col gap-4 rounded-2xl bg-white p-2 lg:flex-row lg:items-center lg:justify-between">
      {/* Filters */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
        {/* Category Filter Example */}
        <select
          value={currentFilters.category || ""}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="h-10 rounded-lg border border-gray-100 bg-white px-4 text-sm font-medium outline-none"
        >
          {/* All Categories option */}
          <option value="">All Categories</option>

          {CategoryOptions.map((cat: any) => (
            <option key={cat._id || cat.name} value={cat.name.toLowerCase()}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Price Range Example */}
        <select
          value={currentFilters.prices || ""}
          disabled={loading}
          onChange={(e) => onFilterChange("prices", e.target.value)}
          className="h-10 rounded-lg border border-gray-100 bg-white px-4 text-sm font-medium outline-none"
        >
          <option value="">Any Price</option>
          <option value="0_50">$0 - $50</option>
          <option value="50_200">$50 - $200</option>
          <option value="200_100000000">$200+</option>
        </select>

        {/* Featured Toggle */}
        <button
          disabled={loading}
          onClick={() =>
            onFilterChange(
              "isFeatured",
              currentFilters.isFeatured ? undefined : "true",
            )
          }
          className={`h-10 rounded-lg border bg-white px-4 text-sm font-medium disabled:cursor-not-allowed ${currentFilters.isFeatured ? "border-green-200 bg-green-50 text-green-700" : "border-gray-100"}`}
        >
          Featured
        </button>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show:</span>
          <div className="flex h-10 items-center rounded-lg border px-4 text-sm font-bold">
            {totalCount > 0 ? `${startEntry} - ${endEntry}` : "0"}
          </div>

          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => onFilterChange("page", (page - 1).toString())}
              className="p-2 disabled:opacity-30"
            >
              <ChevronRight className="rotate-180" size={18} />
            </button>

            <button
              disabled={page >= totalPages}
              onClick={() => onFilterChange("page", (page + 1).toString())}
              className="p-2 disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() => onFilterChange("page", (page + 1).toString())}
              disabled={page >= totalPages}
              className="h-10 rounded-lg border px-4 text-sm font-bold hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useRef, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-fit">
      <button
        ref={buttonRef}
        type="button"
        className={`flex w-fit items-center justify-center gap-2 rounded-xl border border-[#E0E2E7] bg-white px-2.5 py-3.5 pr-4 text-[14px] font-medium shadow-sm transition-colors ${
          isOpen
            ? "border-[#2E7D32] bg-[#EAF2EA] text-[#2E7D32]"
            : "text-[#6B7280] hover:bg-gray-50"
        }`}
        onClick={handleToggle}
      >
        <SlidersHorizontal className="h-4 w-5" />
        <span className="text-[16px] font-medium">Filters</span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 mt-2 w-64 rounded-xl border border-[#E0E2E7] bg-white p-4 shadow-lg"
        >
          <h4 className="mb-3 border-b pb-2 text-sm font-semibold text-gray-800">
            Filter Options
          </h4>

          <div className="space-y-3">
            {/* Status Filter */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Status
              </label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-[#2E7D32] focus:ring-[#2E7D32]">
                <option value="">All</option>
                <option value="published">Published</option>
                <option value="low-stock">Low stock</option>
                <option value="out-of-stock">Out of stock</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-[#2E7D32] focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2 border-t pt-3">
            <button
              className="rounded-lg px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100"
              onClick={() => {
                /* Clear filters logic */
                setIsOpen(false);
              }}
            >
              Clear
            </button>
            <button
              className="rounded-lg bg-[#2E7D32] px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
              onClick={() => {
                /* Apply filters logic */
                setIsOpen(false);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;

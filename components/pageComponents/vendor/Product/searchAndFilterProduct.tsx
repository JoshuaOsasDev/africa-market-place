"use client";

import FilterDates from "@/components/common/FilterDates";
import FilterOptions from "@/components/common/filterOptions";
import SearchBar from "@/components/common/searchBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SearchAndFilterProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // ---------- SEARCH ----------
  const handleSearchChange = (value: string) => {
    console.log(value, "value");

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  // ---------- DATE ----------
  const handleDateChange = (date: Date | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (date) {
      params.set("date", date.toISOString());
    } else {
      params.delete("date");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between py-3">
        {/* SEARCH BAR */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleFilterChange={handleSearchChange}
          placeHolder="Search Products..."
          typeStyle="text-[#858D9D] text-sm leading-5 font-normal focus:outline-none tracking-[0.5%]"
        />

        {/* DATE + OPTIONS */}
        <div className="hidden items-center gap-2 md:flex">
          <FilterDates
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            className="px-2.5 py-3.5"
            handleFilterChange={handleDateChange} // important fix
          />

          <FilterOptions />
        </div>
      </div>
    </div>
  );
}

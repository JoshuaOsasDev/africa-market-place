"use client";
import FilterDates from "@/components/common/FilterDates";
import { Button } from "@/components/ui/button";
import { setShowForm } from "@/redux/slices/showFormSlice";
import { useAppDispatch } from "@/redux/store";
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const filters = [
  { id: "all-time", label: "All Time" },
  { id: "12-months", label: "12 Months" },
  { id: "30-days", label: "30 Days" },
  { id: "7-days", label: "7 Days" },
  { id: "24-hours", label: "24 Hours" },
];
export default function DashboardFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState("all-time");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // ---------- TIME ----------
  const handleTimeChange = (value: string) => {
    //console.log(value, "value");

    const params = new URLSearchParams(searchParams.toString());
    params.set("time", value);
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

  //SHOW APP PRoduct FORM
  const dispatch = useAppDispatch();
  const openForm = () => {
    dispatch(
      setShowForm({
        showform: {
          show: true,
          type: "product",
        },
      }),
    );
  };
  return (
    <div className="hidden h-10 items-center justify-between md:flex">
      <div className="flex items-center rounded-[6px] border border-[#E0E2E7] bg-white p-1">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant="ghost"
            onClick={() => {
              setSelected(filter.id);
              handleTimeChange(filter.id);
            }}
            className={`rounded-sm px-3 py-1.5 text-sm ${
              selected === filter.id
                ? "bg-[#EAF2EA] font-semibold text-[#2E7D32]"
                : "font-medium text-[#667085]"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <FilterDates
          selectedDate={selectedDate}
          handleFilterChange={handleDateChange}
          setSelectedDate={setSelectedDate}
          className="px-2 py-2.5"
        />
        <Button
          className="bg-[#2E7D32] px-3.5 py-5 text-white hover:bg-[#2E7D32]/80"
          onClick={openForm}
        >
          <Plus />
          Add Product
        </Button>
      </div>
    </div>
  );
}

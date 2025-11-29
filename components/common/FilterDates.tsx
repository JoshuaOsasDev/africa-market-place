"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import * as DateFNS from "date-fns";

type TFilterDate = (date: Date) => boolean;

export default function FilterDates({
  selectedDate,
  setSelectedDate,
  handleFilterChange,
  className = "",
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  handleFilterChange?: (date: Date | null) => void;
  className: string;
}) {
  const isWeekday: TFilterDate = (date) => {
    const day = DateFNS.getDay(date);
    return day !== 0 && day !== 6;
  };

  return (
    <div
      className={`relative flex w-fit items-center gap-2 rounded-xl border border-[#E0E2E7] bg-white shadow-sm ${className}`}
    >
      {/* Calendar icon */}
      <Calendar className="h-5 w-5 text-[#667085]" />

      {/* DatePicker input */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          handleFilterChange?.(date ? date : null);
        }}
        filterDate={isWeekday}
        placeholderText="Select a weekday"
        className="w-40 bg-transparent text-sm font-medium text-[#667085] outline-none placeholder:text-[#667085]"
      />
    </div>
  );
}

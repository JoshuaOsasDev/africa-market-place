"use client";

import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, required, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label
          htmlFor={selectId}
          className="text-[#111827] text-xs font-semibold uppercase tracking-wider"
        >
          {label}
          {required && <span className="text-[#2E7D32] ml-0.5">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] appearance-none bg-white",
              "focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent",
              "transition-all duration-200 cursor-pointer",
              error && "border-[#FF0000] focus:ring-[#FF0000]",
              !props.value && "text-[#9CA3AF]",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6F6F6F] pointer-events-none"
          />
        </div>
        {error && (
          <p className="text-[#FF0000] text-xs mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
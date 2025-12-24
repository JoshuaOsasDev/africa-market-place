"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label
          htmlFor={inputId}
          className="text-[#111827] text-xs font-semibold uppercase tracking-wider"
        >
          {label}
          {required && <span className="text-[#2E7D32] ml-0.5">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF]",
            "focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent",
            "transition-all duration-200",
            error && "border-[#FF0000] focus:ring-[#FF0000]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[#FF0000] text-xs mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
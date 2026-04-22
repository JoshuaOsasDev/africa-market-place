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
      <div className="flex w-full flex-col space-y-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wider text-[#111827] uppercase"
        >
          {label}
          {required && <span className="ml-0.5 text-[#2E7D32]">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] disabled:cursor-not-allowed",
            "focus:border-transparent focus:ring-2 focus:ring-[#2E7D32] focus:outline-none",
            "transition-all duration-200",
            error && "border-[#FF0000] focus:ring-[#FF0000]",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[#FF0000]">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

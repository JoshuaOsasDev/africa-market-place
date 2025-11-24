"use client";

import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, className, checked, onChange, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          "flex items-center gap-3 cursor-pointer group",
          className
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 border-2 border-[#E5E7EB] rounded transition-all duration-200",
              "peer-checked:bg-[#2E7D32] peer-checked:border-[#2E7D32]",
              "peer-focus:ring-2 peer-focus:ring-[#2E7D32]/20"
            )}
          />
          <Check
            size={14}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white",
              "opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
            )}
          />
        </div>
        <span className="text-[#6F6F6F] text-sm">{label}</span>
      </label>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";
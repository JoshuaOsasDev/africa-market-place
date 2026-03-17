"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormRadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  icon?: React.ReactNode;
}

export const FormRadio = forwardRef<HTMLInputElement, FormRadioProps>(
  ({ label, icon, className, checked, onChange, id, name, ...props }, ref) => {
    const radioId = id || `${name}-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <label
        htmlFor={radioId}
        className={cn(
          "group flex cursor-pointer items-center justify-between gap-3 border-b border-[#E5E7EB] py-3 last:border-b-0",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              disabled
              ref={ref}
              type="radio"
              id={radioId}
              name={name}
              checked={checked}
              onChange={onChange}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                "h-5 w-5 rounded-full border-2 border-[#E5E7EB] transition-all duration-200",
                "peer-checked:border-[#2E7D32]",
                "peer-focus:ring-2 peer-focus:ring-[#2E7D32]/20",
              )}
            />
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "h-2.5 w-2.5 rounded-full bg-[#2E7D32]",
                "opacity-0 transition-opacity duration-200 peer-checked:opacity-100",
              )}
            />
          </div>
          <span className="text-sm font-medium text-[#111827]">{label}</span>
        </div>
        {icon && <div className="text-[#2E7D32]">{icon}</div>}
      </label>
    );
  },
);

FormRadio.displayName = "FormRadio";

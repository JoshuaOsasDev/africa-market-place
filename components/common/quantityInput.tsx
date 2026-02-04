"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export function QuantityInput({
  value: controlledValue,
  onChange,
  min = 1,
  max = 999,
  disabled = false,
  className,
}: QuantityInputProps) {
  const [internalValue, setInternalValue] = useState(min);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, min), max);

    if (onChange) {
      onChange(clampedValue);
    } else {
      setInternalValue(clampedValue);
    }
  };

  const increment = () => {
    if (value < max) {
      handleChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      handleChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      handleChange(newValue);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-lg border border-[#E5E7EB]",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {/* Minus Button */}
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="flex h-10 w-10 items-center justify-center bg-white transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <Minus size={16} className="text-[#6F6F6F]" />
      </button>

      {/* Number Input */}
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        className="h-10 w-12 [appearance:textfield] border-x border-[#E5E7EB] text-center text-sm font-medium text-[#111827] focus:border-transparent focus:ring-2 focus:ring-[#2E7D32] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label="Quantity"
      />

      {/* Plus Button */}
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className="flex h-10 w-10 items-center justify-center bg-white transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Increase quantity"
      >
        <Plus size={16} className="text-[#6F6F6F]" />
      </button>
    </div>
  );
}

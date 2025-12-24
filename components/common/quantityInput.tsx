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
        "inline-flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Minus Button */}
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="flex items-center justify-center w-10 h-10 bg-white hover:bg-[#F9FAFB] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
        className="w-12 h-10 text-center text-[#111827] font-medium text-sm border-x border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Quantity"
      />

      {/* Plus Button */}
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className="flex items-center justify-center w-10 h-10 bg-white hover:bg-[#F9FAFB] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus size={16} className="text-[#6F6F6F]" />
      </button>
    </div>
  );
}
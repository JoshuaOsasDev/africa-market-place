"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CouponCodeProps {
  onApply: (code: string) => void;
  loading?: boolean;
  className?: string;
}

export function CouponCode({ onApply, loading = false, className }: CouponCodeProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onApply(code.trim());
    }
  };

  return (
    <div className={cn("py-4 border-t border-[#E5E7EB]", className)}>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <span className="text-[#111827] font-medium text-sm whitespace-nowrap">
          Coupon Code
        </span>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="flex-1 px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="px-6 py-2.5 bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold text-sm rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Applying..." : "Apply Coupon"}
        </button>
      </form>
    </div>
  );
}
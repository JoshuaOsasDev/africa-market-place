import React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ title, children, className }: SectionCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-[#E5E7EB] p-6",
        className
      )}
    >
      {title && (
        <h2 className="text-[#111827] text-xl font-semibold mb-6">{title}</h2>
      )}
      {children}
    </div>
  );
}
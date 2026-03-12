import { cn } from "@/lib/utils";

interface OrderDetailRowProps {
  label: string;
  value: string;
  className?: string;
}

export function OrderDetailRow({ label, value, className }: OrderDetailRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between sm:justify-start gap-4 py-2",
        className
      )}
    >
      <span className="text-[#6F6F6F] text-sm sm:text-base min-w-[120px] sm:min-w-[150px]">
        {label}:
      </span>
      <span className="text-[#111827] font-medium text-sm sm:text-base">
        {value}
      </span>
    </div>
  );
}
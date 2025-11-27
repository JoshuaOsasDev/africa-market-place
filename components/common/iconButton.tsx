import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#6F6F6F] hover:text-[#2E7D32] focus:ring-[#2E7D32]",
        ghost: "hover:bg-[#F9FAFB] text-[#6F6F6F] hover:text-[#2E7D32]",
        primary: "bg-[#2E7D32] hover:bg-[#246628] text-white focus:ring-[#2E7D32]",
        danger: "bg-white border border-[#E5E7EB] hover:bg-[#FEF2F2] text-[#6F6F6F] hover:text-[#FF0000] focus:ring-[#FF0000]",
        active: "bg-[#FEF2F2] border border-[#FF0000] text-[#FF0000]",
      },
      size: {
        sm: "w-8 h-8",
        default: "w-10 h-10",
        lg: "w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon?: React.ReactNode;
}

export function IconButton({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {icon || children}
    </button>
  );
}
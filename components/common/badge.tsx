import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors h-min",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        success: "bg-[#2E7D32] text-white",
        danger: "bg-[#FF0000] text-white",
        warning: "bg-[#FBC642] text-black",
        secondary: "bg-[#EAEAEA] text-[#6F6F6F]",
        outline: "border border-[#2E7D32] text-[#2E7D32] bg-transparent",
        inStock: "bg-[#EAF2EA] text-[#2E7D32] border border-[#C0D8C1]",
        discount: "bg-[#FFE8E5] text-[#FF6F5F]",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
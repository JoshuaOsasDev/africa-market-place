import Image from "next/image";
import { OrderItem } from "@/types/order";
import { cn } from "@/lib/utils";

interface OrderItemCardProps {
  item: OrderItem;
  className?: string;
}

export function OrderItemCard({ item, className }: OrderItemCardProps) {
  return (
    <div
      className={cn(
        "relative bg-[#F9FAFB] rounded-lg p-3 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center",
        className
      )}
    >
      <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-[#2E7D32] rounded-full flex items-center justify-center shadow-md z-10">
        <span className="text-white text-xs sm:text-sm font-semibold">
          {item.quantity}
        </span>
      </div>

      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
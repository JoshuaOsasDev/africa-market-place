import FilterOptions from "@/components/common/filterOptions";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function ProductDetailsButton() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className={`text-[#EAF2EA]] flex cursor-pointer items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-semibold hover:bg-[#EAF2EA]/80`}
      >
        <span className="">
          <X />
        </span>
        Cancel
      </Button>

      <Button className="flex cursor-pointer items-center justify-center gap-2 bg-[#2E7D32] px-3.5 py-6 text-sm font-semibold text-white hover:bg-[#2E7D32]/90 md:px-4 md:py-3">
        <span>
          <Plus />
        </span>
        <span className="">Add Product</span>
      </Button>
    </div>
  );
}

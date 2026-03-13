"use client";
import { Button } from "@/components/ui/button";
import { setShowForm } from "@/redux/slices/showFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Plus, X } from "lucide-react";

export default function ProductDetailsButton() {
  const show = useAppSelector((state) => state.showFormReducer.show);
  const dispatch = useAppDispatch();
  const openForm = () => {
    dispatch(setShowForm({ showform: { show: true, type: "type" } }));
  };
  return (
    <div className="flex items-center justify-center gap-2">
      {show && (
        <Button
          className={`text-[#EAF2EA]] flex cursor-pointer items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-semibold hover:bg-[#EAF2EA]/80`}
        >
          <span className="">
            <X />
          </span>
          Cancel
        </Button>
      )}

      <Button
        className="flex cursor-pointer items-center justify-center gap-2 bg-[#2E7D32] px-3.5 py-6 text-sm font-semibold text-white hover:bg-[#2E7D32]/90 md:px-4 md:py-3"
        onClick={openForm}
      >
        <span>
          <Plus />
        </span>
        <span className="">Add Product</span>
      </Button>
    </div>
  );
}

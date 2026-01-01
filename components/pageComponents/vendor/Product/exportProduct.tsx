import FilterOptions from "@/components/common/filterOptions";
import { Button } from "@/components/ui/button";
import { setShowForm } from "@/redux2/slice/showFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux2/store/store";
import { Plus, X } from "lucide-react";

export default function ExportProduct() {
  const dispatch = useAppDispatch();
  const showForm = useAppSelector((state) => state.showFormReducer.showForm);

  // console.log(showForm, "show");
  const openForm = () => {
    dispatch(setShowForm({ showform: true }));
  };

  const closeForm = () => {
    dispatch(setShowForm({ showform: false }));
  };

  return (
    <div className="flex items-center justify-between gap-2 md:justify-center">
      <div className="block md:hidden">
        {" "}
        <FilterOptions />
      </div>

      <div className="flex items-center space-x-2.5">
        {!showForm ? (
          <Button
            className={`flex cursor-pointer items-center justify-center gap-2 bg-[#EAF2EA] px-3.5 py-6 text-sm font-semibold text-[#2E7D32] hover:bg-[#EAF2EA]/80 md:px-4 md:py-3 ${showForm ? "border bg-[#FAFAFA] text-[#858D9D]" : ""}`}
          >
            <span className="text-[#2E7D32]">
              <svg
                fill="#2E7D32"
                // width="128"
                // height="128"
                style={{ width: "16.67px", height: "16.01px", fontWeight: 700 }}
                viewBox="0 0 256 256"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
                data-iconid="365360"
                data-svgname="Export thin"
              >
                <path d="M83.17139,60.81738a4.00059,4.00059,0,0,1,.00048-5.65722l42-41.98926a4.00207,4.00207,0,0,1,5.65625,0l42,41.98926a4.00026,4.00026,0,0,1-5.65625,5.6582L132,25.65527V128a4,4,0,0,1-8,0V25.65527L88.82812,60.81836A4.00089,4.00089,0,0,1,83.17139,60.81738ZM200,92H176a4,4,0,0,0,0,8h24a4.00427,4.00427,0,0,1,4,4V208a4.00427,4.00427,0,0,1-4,4H56a4.00427,4.00427,0,0,1-4-4V104a4.00427,4.00427,0,0,1,4-4H80a4,4,0,0,0,0-8H56a12.01343,12.01343,0,0,0-12,12V208a12.01343,12.01343,0,0,0,12,12H200a12.01343,12.01343,0,0,0,12-12V104A12.01343,12.01343,0,0,0,200,92Z"></path>
              </svg>
            </span>
            Export
          </Button>
        ) : (
          <Button
            onClick={() => closeForm()}
            className={`flex cursor-pointer items-center justify-center gap-2 bg-[#EAF2EA] px-3.5 py-6 text-sm font-semibold text-[#2E7D32] hover:bg-[#EAF2EA]/80 md:px-4 md:py-3 ${showForm ? "border bg-[#FAFAFA] text-[#858D9D]" : ""}`}
          >
            <span className="">
              <X />
            </span>
            Cancel
          </Button>
        )}

        <Button
          onClick={() => openForm()}
          className="flex cursor-pointer items-center justify-center gap-2 bg-[#2E7D32] px-3.5 py-6 text-sm font-semibold text-white hover:bg-[#2E7D32]/90 md:px-4 md:py-3"
        >
          <span>
            <Plus />
          </span>
          <span className="">Add Product</span>
        </Button>
      </div>
    </div>
  );
}

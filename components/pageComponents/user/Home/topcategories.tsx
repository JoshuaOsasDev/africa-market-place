"use client";
import TextStyle from "@/components/common/textStyle";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";

function Topcategories() {
  //get categoty state

  const categories = useAppSelector((state) => state.categories);
  //const categoryOptions = categories.categories?.category || [];

  const SubCategoryOptions = categories.categories?.category || [];
  // const { isLoading, userProducts, error } = useUserProducts();

  // const product = userProducts?.data;

  return (
    <div className="my-2 flex flex-col space-y-4 px-2">
      {/* top section starts */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-baseline space-x-2">
          <TextStyle
            textContent={"Top Categories"}
            textStyle="text-[#000000] font-bold text-2xl sm:text-3xl"
          />
          <TextStyle
            textContent={"New products with updated stocks."}
            textStyle="text-[#9CA3AF] hidden sm:block "
          />
        </div>
        <Link
          href={"/topcategories"}
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
          })}
        >
          <TextStyle textContent="See all" />
          <MoveRight className="text-[10px] text-[#6F6F6F] lg:text-[12px]" />
        </Link>
      </div>
      {/* bottom section starts */}
      <div className="no-scrollbar flex flex-row items-center space-x-3 overflow-x-scroll">
        {SubCategoryOptions.map((data: any) => (
          <div
            key={data._id}
            className="flex flex-col items-center space-y-2 border-0 bg-[#FCFCFCFC] px-2 py-4"
          >
            <div className="relative h-[86.7px] w-[130px]">
              <Image
                src={data?.cover?.url}
                fill
                alt={data.name}
                className="rounded-lg object-cover"
              />
            </div>
            <TextStyle textContent={data.name} textStyle="text-center" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topcategories;

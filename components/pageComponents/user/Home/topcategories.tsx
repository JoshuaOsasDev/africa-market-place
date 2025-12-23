import TextStyle from "@/components/common/textStyle";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { topCategoriesData } from "@/lib/data";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

function Topcategories() {
  return (
    <div className="my-2 flex flex-col space-y-4 px-2">
      {/* top section starts */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row space-x-2 items-baseline">
          <TextStyle
            textContent={"Top Categories"}
            textStyle="text-[#000000] font-bold text-2xl sm:text-3xl"
          />
          <TextStyle
            textContent={"New products with updated stocks."}
            textStyle="text-[#9CA3AF] hidden sm:block "
          />
        </div>
        <Link href={"/topcategories"}
         className={buttonVariants({
          variant: "secondary",
          size: "lg",
        })}
        >
          
         <TextStyle textContent="See all"   />
         <MoveRight className="text-[#6F6F6F] text-[10px]  lg:text-[12px]"   />
        </Link>
      </div>
      {/* bottom section starts */}
      <div className="flex flex-row space-x-3 items-center overflow-x-scroll">
        {topCategoriesData.map((data) => (
          <Link href={data.url} key={data.id}>
            <div className="flex flex-col bg-[#FCFCFCFC] space-y-2 items-center border-0 py-4 px-2 w-[150px] h-40">
              <Image
                src={data.imgurl}
                width={130}
                height={86.7}
                alt={data.heading}
                className="rounded-lg"
              />
              <TextStyle textContent={data.heading} textStyle="text-center" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topcategories;

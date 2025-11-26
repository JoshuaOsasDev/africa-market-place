import TextStyle from "@/components/common/textStyle";
import Link from "next/link";
import { MoveRight, Star, Text } from "lucide-react";
import { bestSellingProductData } from "@/lib/data";
import Image from "next/image";
import { MdStar } from "react-icons/md";
import { buttonVariants } from "@/components/ui/button";

function BestSellingProducts() {
  return (
    <div className="my-2 flex flex-col space-y-2 px-2">
      {/* top section starts */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row space-x-2 items-baseline">
          <TextStyle
            textContent={"Best Selling Items"}
            textStyle="text-[#000000] font-bold text-2xl sm:text-3xl"
          />
        </div>
        <Link href={"/topcategories"}
                className={buttonVariants({
                 variant: "secondary",
                 size: "lg",
               })}
               >
                 
                <TextStyle textContent="See all"  />
                <MoveRight className="text-[#6F6F6F] text-[10px]  lg:text-[12px]"   />
               </Link>
      </div>
      {/* bottom section starts */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4   gap-4 ">
        {bestSellingProductData.map((data) => (
          <div className="col-span-1 shadow-md hover:shadow-xl transition-shadow duration-300 group" key={data.id} >
            <Link href={data.url} >
              <div className="flex relative flex-col bg-[#FCFCFCFC] space-y-2  border-0 py-2 px-2 w-full h-[300px] ">
                {/* discount section starts */}
                <div className="flex flex-row items-center justify-center bg-[#FF0000] absolute top-1 left-1 rounded-[5px] border-0 py-1 px-2">
                  <TextStyle
                    textContent={`%${data.discount}`}
                    textStyle=" text-white  text-center text-[8px]"
                  />
                </div>
                {/* discount section ends */}

                <div className="mx-auto  mt-8">
                  <Image
                    src={data.imgurl}
                    width={175.67}
                    height={175.67}
                    alt={data.heading}
                    className="rounded-lg transition-transform duration-500 group-hover:scale-140"
                  />
                </div>

                {/* discription section starts */}
                <div className="flex-1 flex flex-col space-y-1  justify-end ">
                  <TextStyle textContent={data.heading} textStyle="" />
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-baseline space-x-1">
                      <TextStyle
                        textContent={"$" + data.presentPrice.toString()}
                        textStyle="text-black text-[24px] text-tracking-[2px]"
                      />
                      <TextStyle
                        textContent={"$" + data.pastPrice.toString()}
                        textStyle="text-[#6F6F6F] line-through"
                      />
                    </div>
                    <div className="flex flex-row space-x-0 items-center">
                                    {/* star rating  starts */}
                                    <div className="flex flex-row items-center space-x-1">
                                    { 
                                      
                                      [...Array(data.starRating)].map((_, i) => <MdStar
                                          key={ i}
                                          className="text-yellow-500 w-3 h-3" />)
                                  }
                                   </div>
                                    {/* star rating ends */}
                     
                    </div>
                  </div>
                  <div className="flex  flex-row items-center  text-center border rounded-[10px] border-[#2E7D32]  mx-auto  md:w-[180px] lg-[205px] h-[41px]  w-3/4 justify-center   ">
                  <TextStyle
                        textContent="Add To Cart"
                        textStyle="text-[#2E7D32] hover:animate-heartbeat"
                      />
                  </div>
                </div>
                {/* description section ends */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellingProducts;

"use client";
import React, { useEffect, useState } from "react";
import TextStyle from "@/components/common/textStyle";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useUserProducts } from "@/lib/hooks/userDashboard/useUser";
import { ProductCard } from "@/components/product/productCard";
import { Product } from "@/types/product";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi, // Import the API type
} from "@/components/ui/carousel";

function BestSellingProducts() {
  const filter = "";
  const { isLoading, userProducts } = useUserProducts(filter);

  // State for dots and disabling arrows
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const product = userProducts?.data;

  console.log(product, "best selling products");
  // Initialize carousel state
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length); // Assuming 2 items per view, adjust if needed
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isLoading) return null;

  return (
    <div className="my-2 flex flex-col space-y-4 px-2">
      {/* Top section */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-baseline space-x-2">
          <TextStyle
            textContent={"Best Selling Items"}
            textStyle="text-[#000000] font-bold text-2xl sm:text-3xl"
          />
        </div>
        <Link
          href={"/user/products"}
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
          })}
        >
          <TextStyle textContent="See all" />
          <MoveRight className="ml-2 h-4 w-4 text-[#6F6F6F]" />
        </Link>
      </div>

      {/* Bottom section / Carousel */}
      {!product || product?.length === 0 ? (
        <p className="py-6 text-center text-lg font-bold text-[#6F6F6F]">
          Vendors have not uploaded any products yet.
        </p>
      ) : (
        <div className="w-full px-4">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false, // Must be false to disable arrows at start/end
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {product?.map((data: Product) => (
                <CarouselItem
                  key={data._id}
                  className="basis-1/2 pl-2 md:pl-4 lg:basis-1/5"
                >
                  <div className="p-1">
                    <ProductCard product={data} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation & Pagination UI */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* CarouselPrevious and CarouselNext automatically disable themselves 
                       if loop: false and they hit the boundary */}

                  <CarouselPrevious className="static h-8 w-8 translate-y-0" />

                  {/* Dots Logic */}
                  <div className="flex gap-1.5">
                    {Array.from({ length: count }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => api?.scrollTo(i)}
                        className={`h-4 w-4 rounded-full transition-all duration-300 ${
                          i === current
                            ? "h-4 w-4 bg-[#2E7D32]"
                            : "w-2 bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <CarouselNext className="static h-8 w-8 translate-y-0" />
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default BestSellingProducts;

"use client";
import TextStyle from "@/components/common/textStyle";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { Category } from "@/types/categories";
import { useRouter } from "next/navigation";

function Topcategories() {
  const router = useRouter();
  const categories = useAppSelector((state) => state.categories);
  const CategoryOptions = categories.categories?.category || [];

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/user/categories?category=${categoryId}`);
  };

  return (
    <div className="my-4 flex flex-col space-y-6 px-2">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Top Categories
          </h2>
          <p className="hidden text-sm text-gray-500 sm:block">
            Discover our most popular categories, carefully curated to help you
            find the best products quickly and easily.
          </p>
        </div>

        <Link
          href={"/user/categories"}
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
          })}
        >
          See all
          <MoveRight className="ml-1 text-gray-500" />
        </Link>
      </div>

      {/* CATEGORY LIST */}
      <div className="no-scrollbar flex items-center space-x-6 overflow-x-auto">
        {CategoryOptions.map((data: Category) => (
          <div
            key={data._id}
            onClick={() => handleCategoryClick(data._id)}
            className="group flex min-w-[150px] cursor-pointer flex-col items-center text-center transition-transform duration-500"
          >
            {/* CIRCLE IMAGE */}
            <div className="relative h-[86.7px] w-[130px]">
              <Image
                src={data?.cover?.url}
                fill
                alt={data.name}
                className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full border-2 border-gray-200 bg-white p-3 shadow-sm transition hover:scale-105 hover:border-[#2E7D32] hover:shadow-md md:h-[200px] md:w-[200px]">
              <div className="full relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={data?.cover?.url}
                  alt={data.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div> */}

            {/* TITLE */}
            <p className="mt-3 text-sm font-semibold text-gray-800">
              {data.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topcategories;

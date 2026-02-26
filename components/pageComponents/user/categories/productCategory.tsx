"use client";
import { CartButton } from "@/components/common/cartButton";
import Loader from "@/components/common/loader";
import TextStyle from "@/components/common/textStyle";
import { bestSellingProductData } from "@/lib/data";
import { setLoaderAction } from "@/redux/slices/user";
import { useAppDispatch } from "@/redux/store";
import { getFilterProductsByChildCategory } from "@/services/apiServices/userApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProductCategory({ category }: { category: string }) {
  const [data, setData] = useState<any>(null);

  console.log(data, "pdata");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: getFilterProductsByChildCategory,
  });
  // getFilterProductsByChildCategory

  const dispatch = useAppDispatch();
  const handleFetchProducts = async () => {
    try {
      dispatch(setLoaderAction(true));

      const result = await mutateAsync(category);
      setData(result);
      //console.log("result", result);
    } catch (err) {
      //console.log("error ", err);
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message ||
            "Failed to fetch products, please try again.",
        );
      } else {
        toast.error("Unknown error");
      }
    } finally {
      dispatch(setLoaderAction(false));
    }
  };

  useEffect(() => {
    handleFetchProducts();
    // setData(bestSellingProductData);
  }, []);

  // const handleWish = (id: number) => {
  //   const item = data.filter((i: any) => {
  //     if (i.id === id) {
  //       //   console.log("index:", i, "data list:", data);
  //       data[i.id].wished = !data[i.id].wished;
  //       setData(data);
  //     }
  //   });
  // };

  // console.log("new data state", data);
  if (!data?.data) return <Loader />;
  if (data?.data?.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="rounded-full bg-gray-100 p-6">
          <Heart size={48} className="text-gray-400" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          No products found
        </h2>

        <p className="max-w-md text-sm text-gray-500">
          There are currently no products available under this category. Please
          check back later or explore other categories.
        </p>

        <Link
          href="/user/categories"
          className="mt-2 rounded-lg border border-[#2E7D32] px-6 py-2 text-sm font-medium text-[#2E7D32] transition hover:bg-[#2E7D32] hover:text-white"
        >
          Browse categories
        </Link>
      </div>
    );
  }

  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
      {data?.data?.map((data: any) => (
        <div
          key={data._id}
          className="col-span-1 overflow-hidden rounded-lg bg-[#FCFCFCFC] shadow-md"
        >
          {/* CLICKABLE PRODUCT AREA */}
          <Link
            href={`/user/products/${data.slug}`}
            className="relative flex flex-col space-y-2 px-2 py-3"
          >
            {/* Wishlist */}
            {/* <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWish(data._id);
              }}
              className="absolute top-1.5 right-1.5 rounded-full bg-white p-2"
            >
              <Heart
                size={20}
                color={data.wished ? "red" : "gray"}
                fill={data.wished ? "red" : "none"}
              />
            </div> */}

            {/* Image */}
            <div className="relative mx-auto mt-8 h-[175.67px] w-[175.67px]">
              {data?.images && (
                <Image
                  src={data?.images?.[0].url}
                  fill
                  alt={data?.images?.[0]._id}
                  className="rounded-lg transition-transform duration-500 group-hover:scale-140"
                />
              )}
            </div>

            {/* Description */}
            <div className="mt-4 flex flex-col space-y-1">
              <TextStyle textContent={data?.name} />
              <div className="flex items-baseline space-x-1">
                <TextStyle
                  textContent={"$" + data.price.toString()}
                  textStyle="text-black text-[18px]"
                />
                <TextStyle
                  textContent={"$" + data.price.toString()}
                  textStyle="text-[#6F6F6F] line-through text-[14px]"
                />
              </div>
            </div>
          </Link>

          {/* CART BUTTON AREA (Outside Link) */}
          <div className="p-3 pt-0">
            <CartButton
              product={data}
              className="hover:animate-heartbeat w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCategory;

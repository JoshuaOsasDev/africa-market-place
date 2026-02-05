"use client";
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

  const { mutateAsync } = useMutation({
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

  const handleWish = (id: number) => {
    const item = data.filter((i: any) => {
      if (i.id === id) {
        //   console.log("index:", i, "data list:", data);
        data[i.id].wished = !data[i.id].wished;
        setData(data);
      }
    });
  };

  console.log("new data state", data);
  if (!data?.data) return <Loader />;

  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
      {data?.data?.map((data: any) => (
        <div className="col-span-1 bg-[#FCFCFCFC] shadow-md" key={data._id}>
          <div className="relative flex h-[300px] w-full flex-col space-y-2 border-0 px-2 py-3">
            {/* wish section starts */}
            <div
              onClick={() => handleWish(data._id)}
              className="absolute top-1.5 right-1.5 flex flex-row items-center justify-center rounded-full border-0 bg-white p-2 py-1"
            >
              {data.wished ? (
                <Heart
                  color="red"
                  className=""
                  fill="red"
                  /* onClick={() => { }} */

                  size={20}
                />
              ) : (
                <Heart
                  color="gray"
                  className=""
                  /* onClick={() => { }} */

                  size={20}
                />
              )}
            </div>
            {/* wish section ends */}

            <div className="mx-auto mt-8">
              <Image
                src={data.images[0].url}
                width={175.67}
                height={175.67}
                alt={category}
                className="rounded-lg transition-transform duration-500 group-hover:scale-140"
              />
            </div>

            {/* discription section starts */}
            <div className="flex flex-1 flex-row items-end justify-between md:flex-col md:items-start md:space-y-2 lg:flex-row lg:items-end lg:space-y-0">
              <div className="flex flex-1 flex-col justify-end space-y-1">
                <TextStyle textContent={data?.name} textStyle="" />
                <div className="flex flex-row items-baseline space-x-1">
                  <TextStyle
                    textContent={"$" + data.price.toString()}
                    textStyle="text-black text-[18px] text-tracking-[2px]"
                  />
                  <TextStyle
                    textContent={"$" + data.price.toString()}
                    textStyle="text-[#6F6F6F] line-through text-[14]"
                  />
                </div>
              </div>

              <div className="ml-auto flex h-10.25 w-26 flex-row items-center justify-center rounded-[10px] border border-[#2E7D32] text-center md:ml-0 md:w-full lg:ml-auto lg:w-26">
                <TextStyle
                  textContent="Add To Cart"
                  textStyle="text-[#2E7D32] hover:animate-heartbeat"
                />
              </div>
            </div>
            {/* description section ends */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCategory;

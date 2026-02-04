"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categorySectionList } from "@/lib/data";
import Link from "next/link";
import TextStyle from "@/components/common/textStyle";
import { AppleIcon, ChevronDown, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/redux/store";

function HomeAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  //get categories from local storage
  const categories = useAppSelector((state) => state.categories);
  const categoryOptions = categories.categories?.category || [];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col space-y-2">
        {categoryOptions.map((item: any, index: any) => {
          const subCategories =
            categories.categories?.subCategory?.filter(
              (sub: any) => sub.parentCategory === item._id,
            ) || [];

          return (
            <div
              key={index}
              className={`border-gray-200 ${
                index != categorySectionList.length - 1 && "border-b"
              }`}
            >
              <motion.div
                onClick={() => toggleAccordion(index)}
                initial={false}
              >
                <div className="group flex w-full flex-row items-center justify-between">
                  <motion.div
                    //     whileHover={{ color: " #F27C22" }}
                    className={`font-['General Sans'] flex flex-1 flex-row py-2 text-base font-medium text-[#6F6F6F] group-hover:text-[#F27C22]`}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      {/* <Image
                        src={item?.cover.url}
                        width={20}
                        height={20}
                        alt={item?.name}
                      /> */}
                      <AppleIcon />
                      <TextStyle textContent={item?.name} />
                    </div>
                  </motion.div>
                  {openIndex === index ? (
                    <ChevronDown
                      size={24}
                      //    color="#6F6F6F"
                      className="text-black group-hover:text-[#F27C22]"
                    />
                  ) : (
                    <ChevronRight
                      size={24}
                      className="text-black group-hover:text-[#F27C22]"
                    />
                  )}
                </div>
              </motion.div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="mt-4 flex flex-row text-sm text-[#6F6F6F]">
                      <div className="flex flex-col space-y-3">
                        {subCategories.map((i) => (
                          <div key={i._id}>
                            <TextStyle textContent={i.name} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link href={"/categories"}>
          <TextStyle
            textContent="View All Categorires"
            textStyle="bg-[#2E7D32] px-4 py-[10px] rounded-[10px] text-white border-0 "
          />
        </Link>
      </div>
    </div>
  );
}

export default HomeAccordion;

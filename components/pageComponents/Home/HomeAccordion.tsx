"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categorySectionList } from "@/lib/data";
import Link from "next/link";
import TextStyle from "@/components/common/textStyle";
import { ChevronDown, ChevronRight } from "lucide-react";

function HomeAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-between  h-full">
      <div className="flex flex-col space-y-2">
        {categorySectionList.map((item, index) => (
          <div
            key={index}
            className={` border-gray-200 ${
              index != categorySectionList.length - 1 && "border-b"
            }`}
          >
            <motion.div onClick={() => toggleAccordion(index)} initial={false}>
              <div className="flex flex-row items-center justify-between w-full group ">
                <motion.div
                  //     whileHover={{ color: " #F27C22" }}
                  className={`
           text-base flex-1  font-medium font-['General Sans']  flex flex-row  text-[#6F6F6F] py-2 group-hover:text-[#F27C22]`}
                >
                  <div className="flex  flex-row space-x-2 items-center">
                    <Image
                      src={item.imgUrl}
                      width={20}
                      height={20}
                      alt={item.category}
                    />
                    <TextStyle textContent={item.category} />
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
                  <p className="text-sm text-[#6F6F6F] mt-4  flex flex-row ">
                    <div className="flex flex-col space-y-3">
                      {item.subcategory.map((i) => (
                        <div key={i.id}>
                          <Link href={i.url}>
                            <TextStyle textContent={i.name} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
       
          </div>
          <div className="flex flex-col justify-center items-center ">
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

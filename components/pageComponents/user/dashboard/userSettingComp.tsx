"use client";
import { TbLockPassword } from "react-icons/tb";

import { IoIosNotificationsOutline } from "react-icons/io";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { userSettingList } from "@/lib/data";
import Link from "next/link";
import TextStyle from "@/components/common/textStyle";
import { ChevronDown, ChevronRight } from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

function UserSettingComp() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const data = {
    settings: [],
  };
  return (
    <div className="flex h-full flex-col justify-between px-3">
      <div className="flex flex-col space-y-2">
        {userSettingList.map((item, index) => (
          <div
            key={index}
            className={`border-gray-200 ${
              index != userSettingList.length - 1 && "border-b"
            }`}
          >
            <motion.div onClick={() => toggleAccordion(index)} initial={false}>
              <div className="group flex w-full flex-row items-center justify-between">
                <motion.div
                  //     whileHover={{ color: " #F27C22" }}
                  className={`font-['General Sans'] flex flex-1 flex-row py-2 text-base font-medium text-[#6F6F6F]`}
                >
                  <div className="flex flex-row items-center space-x-2">
                    {/* <Image
                      src={item.imgUrl}
                      width={20}
                      height={20}
                      alt={item.category}
                    /> */}
                    <IoSettingsOutline width={40} height={40} size={""} />

                    <TextStyle textContent={item.category} textStyle="text-sm" />
                  </div>
                </motion.div>
                {openIndex === index ? (
                  <ChevronDown
                    size={24}
                    //    color="#6F6F6F"
                    className="text-black"
                  />
                ) : (
                  <ChevronRight size={24} className="text-black" />
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
                      {item.subcategory.map((i) => (
                       <Link
                       key={i.id}
                       href={i.url}
                       className="flex flex-row items-center space-x-2"
                     >
                       {i.id == 1 ? (
                         <FaRegUser />
                       ) : i.id == 2 ? (
                         <TbLockPassword />
                       ) : (
                         <IoIosNotificationsOutline />
                       )}
                       <TextStyle textContent={i.name} />
                     </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSettingComp;

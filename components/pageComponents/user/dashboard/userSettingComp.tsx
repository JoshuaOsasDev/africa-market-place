"use client";
import { TbLockPassword } from "react-icons/tb";

import { IoIosNotificationsOutline } from "react-icons/io";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { userSettingList } from "@/lib/data";
import Link from "next/link";
import TextStyle from "@/components/common/textStyle";
import { ChevronDown, ChevronRight } from "lucide-react";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import clsx from "clsx";

function UserSettingComp() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const data = {
    settings: [],
  };
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col space-y-2">
        {userSettingList.map((item, index) => (
          <div
            key={index}
            className={`border-gray-200 ${
              index != userSettingList.length - 1 && "border-b"
            }`}
          >
            <motion.div onClick={() => toggleAccordion(index)} initial={false}>
              <div className="group flex w-full flex-row items-center justify-between rounded-lg hover:bg-[#EAF2EA]">
                <motion.div
                  //    whileHover={{ color: "#EAF2EA" }}
                  className={`font-['General Sans'] flex flex-1 flex-row rounded-lg text-base font-medium text-[#6F6F6F]`}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Link
                      href={""}
                      className={clsx(
                        "hidden grow place-items-start justify-center gap-2 rounded-xl p-3 px-3 py-2 text-[14px] font-bold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex md:flex-none md:justify-start md:p-2 md:px-3",
                      )}
                    >
                      <IoSettingsSharp size={20} color="grey" />

                      <div className="hidden md:block">Setting</div>
                    </Link>
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
                    <div className="flex w-full flex-col space-y-3">
                      {item.subcategory.map((i) => (
                        <Link key={i.id} href={i.url}>
                          <div className="flex flex-row items-center space-x-2 rounded-xl p-2 px-3 hover:bg-[#EAF2EA] hover:text-[#2E7D32]">
                            {i.id == 1 ? (
                              <FaRegUser />
                            ) : i.id == 2 ? (
                              <TbLockPassword />
                            ) : (
                              <IoIosNotificationsOutline />
                            )}
                            <TextStyle textContent={i.name} />
                          </div>
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

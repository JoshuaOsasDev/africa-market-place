"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import TextStyle from "@/components/common/textStyle";
import { useAppSelector } from "@/redux/store";

function HomeAccordion() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
  const categories = useAppSelector((state) => state.categories);
  const categoryOptions = categories.categories?.category || [];
  const subCategoryOptions = categories.categories?.subCategory || [];
  const childCategoryOptions = categories.categories?.childCategory || [];

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        {categoryOptions.map((category: any, index: number) => {
          const subCategories = subCategoryOptions.filter(
            (sub: any) => sub.parentCategory === category._id,
          );

          return (
            <div key={category._id} className="border-b border-gray-200">
              {/* CATEGORY */}
              <div
                onClick={() =>
                  setOpenCategory(openCategory === index ? null : index)
                }
                className="flex cursor-pointer items-center justify-between py-3 transition-colors hover:bg-gray-50"
              >
                <TextStyle textContent={category.name} />
                <motion.div
                  animate={{ rotate: openCategory === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </motion.div>
              </div>

              {/* SUBCATEGORIES */}
              <AnimatePresence initial={false}>
                {openCategory === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="space-y-1 pb-2 pl-4">
                      {subCategories.map((sub: any) => {
                        const childCategories = childCategoryOptions.filter(
                          (child: any) => child.subCategory === sub._id,
                        );

                        return (
                          <div key={sub._id}>
                            {/* SUBCATEGORY */}
                            <div
                              onClick={() =>
                                setOpenSubCategory(
                                  openSubCategory === sub._id ? null : sub._id,
                                )
                              }
                              className="flex cursor-pointer items-center justify-between rounded px-2 py-2 text-sm text-[#6F6F6F] transition-colors hover:bg-orange-50 hover:text-[#F27C22]"
                            >
                              <span>{sub.name}</span>
                              {childCategories.length > 0 && (
                                <motion.div
                                  animate={{
                                    rotate:
                                      openSubCategory === sub._id ? 90 : 0,
                                  }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </motion.div>
                              )}
                            </div>

                            {/* CHILD CATEGORIES */}
                            <AnimatePresence initial={false}>
                              {openSubCategory === sub._id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.25,
                                    ease: "easeInOut",
                                  }}
                                  style={{ overflow: "hidden" }}
                                >
                                  <div className="space-y-1 py-1 pl-4">
                                    {childCategories.map((child: any) => (
                                      <Link
                                        key={child._id}
                                        href={`/user/categories/${child.slug}`}
                                        className="block rounded px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-orange-50 hover:text-[#F27C22]"
                                      >
                                        {child.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <Link
        href="/user/categories"
        className="rounded-[10px] bg-[#2E7D32] px-4 py-2.5 text-center text-white hover:bg-[#2E7D32]/80"
      >
        Veiw Category
      </Link>
    </div>
  );
}

export default HomeAccordion;

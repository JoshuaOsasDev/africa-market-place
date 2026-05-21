// app/categories/page.tsx
"use client";
import { useCategory } from "@/lib/hooks/useCategory";
import { useAppSelector } from "@/redux/store";
import { CategoriesData } from "@/types/categories";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function CategoryComp() {
  const categories = useAppSelector((state) => state.categories);
  const categoriesData = categories?.categories as CategoriesData;
  const { selectedCategory } = useCategory();

  // Track which child category cards are expanded
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Get subcategories for the selected category
  const getSubCategories = () => {
    if (!selectedCategory) return [];
    return categoriesData.subCategory.filter((sub) =>
      selectedCategory.subCategories?.includes(sub._id),
    );
  };

  // Get child categories for a specific subcategory
  const getChildCategories = (subCategoryId: string) => {
    const subCat = categoriesData.subCategory.find(
      (sub) => sub._id === subCategoryId,
    );
    if (!subCat || !subCat.childCategories) return [];
    return categoriesData.childCategory.filter((child) =>
      subCat.childCategories.includes(child._id),
    );
  };

  const subCategories = getSubCategories();

  const DESCRIPTION_LIMIT = 80; // characters before truncation

  return (
    <div className="col-span-9 bg-white">
      <div className="p-6">
        {/* Display all subcategories and their children */}
        <div className="space-y-8">
          {subCategories.map((subcategory) => {
            const children = getChildCategories(subcategory._id);
            return (
              <div key={subcategory._id}>
                {/* Subcategory Heading */}
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800">
                  {subcategory.name}
                </h3>

                {/* Children Grid */}
                {children.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {children.map((child) => {
                      const isExpanded = expandedIds.has(child._id);
                      const isLong =
                        child.description?.length > DESCRIPTION_LIMIT;
                      const displayText =
                        isExpanded || !isLong
                          ? child.description
                          : `${child.description.slice(0, DESCRIPTION_LIMIT).trimEnd()}...`;

                      return (
                        <div
                          key={child._id}
                          className="cursor-pointer rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 transition-shadow hover:shadow-md"
                        >
                          {/* Image — links to category page */}
                          <Link href={`/user/categories/${child.slug}`}>
                            {child.cover && (
                              <div className="relative h-52 w-full">
                                <Image
                                  src={child.cover.url}
                                  alt={child.name}
                                  fill
                                  className="mb-3 rounded-md object-cover"
                                />
                              </div>
                            )}
                            {/* Child Category Name */}
                            <p className="mt-3 font-medium text-gray-700">
                              {child.name}
                            </p>
                          </Link>

                          {/* Description with show more / less */}
                          {child.description && (
                            <div className="mt-1">
                              <p className="text-sm text-gray-500">
                                {displayText}
                              </p>
                              {isLong && (
                                <button
                                  type="button"
                                  onClick={() => toggleExpand(child._id)}
                                  className="text-grey-500 mt-1 text-xs font-medium hover:underline focus:outline-none"
                                >
                                  {isExpanded ? "Show less" : "Show more"}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No items in this category yet.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Show message if no subcategories */}
        {subCategories.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No subcategories available for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryComp;

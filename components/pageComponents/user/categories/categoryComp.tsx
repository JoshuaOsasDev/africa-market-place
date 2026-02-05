// app/categories/page.tsx
"use client";

import { useCategory } from "@/lib/hooks/useCategory";
import { useAppSelector } from "@/redux/store";
import { CategoriesData } from "@/types/categories";
import Link from "next/link";

function CategoryComp() {
  const categories = useAppSelector((state) => state.categories);
  const categoriesData = categories?.categories as CategoriesData;
  const { selectedCategory } = useCategory();
  //console.log(selectedCategory, "int");
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
                  <div className="grid grid-cols-3 gap-4">
                    {children.map((child) => (
                      <Link
                        href={`/user/categories/${child.slug}`}
                        key={child._id}
                        className="cursor-pointer rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 transition-shadow hover:shadow-md"
                      >
                        {/* Child Category Image */}
                        {child.cover && (
                          <img
                            src={child.cover.url}
                            alt={child.name}
                            className="mb-3 h-32 w-full rounded-md object-cover"
                          />
                        )}
                        {/* Child Category Name */}
                        <p className="font-medium text-gray-700">
                          {child.name}
                        </p>
                        {/* Child Category Description */}
                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                          {child.description}
                        </p>
                      </Link>
                    ))}
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

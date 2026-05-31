// import CategoryComp from "@/components/pageComponents/user/categories/categoryComp";
// import CategorySideBar from "@/components/pageComponents/user/categories/categorySideBar";

// function page() {
//   return (
//     <div className="grid min-h-screen grid-cols-[20rem_1fr]">
//       <aside className="h-full">
//         <CategorySideBar />
//       </aside>
//       <div className="">
//         <CategoryComp />
//       </div>
//     </div>
//   );
// }

// export default page;

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CategoryComp from "@/components/pageComponents/user/categories/categoryComp";
import CategorySideBar from "@/components/pageComponents/user/categories/categorySideBar";
import { useCategory } from "@/lib/hooks/useCategory";
import { useAppSelector } from "@/redux/store";
import { CategoriesData } from "@/types/categories";

/**
 * Page Component (User Categories Viewer)
 *
 * Purpose:
 * Coordinates the display layout for product category filtering.
 * It intercepts category selections via URL query strings, matches them with Redux state cached data,
 * and hydrates a shared state hook context to keep the sidebar and catalog grid seamlessly aligned.
 */
function Page() {
  /* ── ROUTING & STATE HOOKS ── */

  // Extracts active search variables from the URL query string (e.g., `?category=123`)
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  // Destructures the state manager updater to register the currently highlighted catalog node globally
  const { setSelectedCategory } = useCategory();

  // Connects directly to the global Redux store to pull down the synchronized master list of system categories
  const categories = useAppSelector((state) => state.categories);
  const categoriesData = categories?.categories as CategoriesData;

  /* ── URL SYNCHRONIZATION SIDE-EFFECTS ── */

  /**
   * Deep-watches changes to the URL parameter `categoryId` or the global Redux dataset.
   * If an active ID is present, it sweeps through the category definitions list to isolate
   * the exact matching object schema and syncs it down to the runtime context state.
   */
  useEffect(() => {
    if (categoryId && categoriesData?.category) {
      // Sweeps data models to isolate the document record matching the query token
      const category = categoriesData.category.find(
        (cat) => cat._id === categoryId,
      );

      // Updates the globally accessible runtime state if a validation match is established
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [categoryId, categoriesData, setSelectedCategory]);

  /* ── RENDER OUTLINE ── */
  return (
    /**
     * Outer Interface Canvas:
     * Leverages Tailwind CSS CSS-Grid formatting rules to manage layout distributions.
     * Transitions from a single vertical column flow stack on small touch viewports up into a
     * fixed structural split layout configuration beginning exactly at the medium `md:` viewport threshold.
     *
     * Column Balance:
     * - Sidebar Column (`aside`): Fixed width allocation constraint hardset at `20rem` (320px).
     * - Content Canvas (`div`): Flexible expansion wrapper (`1fr`) taking up all remaining horizontal area.
     */
    <div className="grid min-h-screen md:grid-cols-[20rem_1fr]">
      {/* ── LEFT PANEL: ASYNCHRONOUS CATEGORY NAVIGATION SIDEBAR ── */}
      <aside className="h-full">
        <CategorySideBar />
      </aside>

      {/* ── RIGHT PANEL: PRODUCT TIMELINE DISPLAY GRID CANVAS ── */}
      <div className="">
        <CategoryComp />
      </div>
    </div>
  );
}

export default Page;

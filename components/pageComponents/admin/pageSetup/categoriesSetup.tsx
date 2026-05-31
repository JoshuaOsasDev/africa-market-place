"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { CldUploadWidget } from "next-cloudinary";
import {
  useCreateCategory,
  useCreateSubCategory,
  useCreateChildCategory,
  useGetCategories,
  useGetSubCategories,
} from "@/lib/hooks/adminDashboardApi/useAdmin";

export type CategoryPayload = {
  name: string;
  slug: string;
  description: string;
  status: "active" | "inactive";
  metaTitle: string;
  metaDescription: string;
  cover: {
    _id: string;
    url: string;
  };
};

export type SubCategoryPayload = CategoryPayload & {
  parentCategory: string;
};

export type ChildCategoryPayload = CategoryPayload & {
  subCategory: string; // _id of the subcategory
};

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

// ─── Reusable empty state factories ───────────────────────────────────────────

const emptyCategoryData = (): CategoryPayload => ({
  name: "",
  slug: "",
  description: "",
  status: "active",
  metaTitle: "",
  metaDescription: "",
  cover: { _id: "", url: "" },
});

const emptySubCategoryData = (): SubCategoryPayload => ({
  ...emptyCategoryData(),
  parentCategory: "",
});

const emptyChildCategoryData = (): ChildCategoryPayload => ({
  ...emptyCategoryData(),
  subCategory: "",
});

// ─── Shared cover-upload button ───────────────────────────────────────────────

function CoverUploader({
  url,
  onUpload,
}: {
  url: string;
  onUpload: (id: string, url: string) => void;
}) {
  return (
    <CldUploadWidget
      uploadPreset="africamarketplace"
      onSuccess={(result: any) => {
        document.body.style.overflow = "auto";
        const info = result.info;
        onUpload(info.public_id, info.secure_url);
      }}
      options={{
        showPoweredBy: false,
        multiple: false,
        clientAllowedFormats: ["png", "jpg", "jpeg"],
        folder: "category-covers",
        maxFileSize: 2 * 1024 * 1024,
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="relative flex h-[180px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-[#2E7D32] bg-[#F9FAFB] transition hover:bg-[#F1F5F9] md:w-1/2"
        >
          {url ? (
            <Image
              src={url}
              alt="cover preview"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <>
              <FiCamera className="text-3xl text-[#2E7D32]" />
              <p className="px-4 text-center text-sm text-gray-500">
                Click to upload cover image <br />
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  PNG / JPG · Max 2MB
                </span>
              </p>
            </>
          )}
        </button>
      )}
    </CldUploadWidget>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const CategorySettings = () => {
  // ── Category state ──
  const [categoryData, setCategoryData] =
    useState<CategoryPayload>(emptyCategoryData());

  // ── SubCategory state — fully independent ──
  const [subCategoryData, setSubCategoryData] = useState<SubCategoryPayload>(
    emptySubCategoryData(),
  );

  // ── ChildCategory state — fully independent ──
  const [childCategoryData, setChildCategoryData] =
    useState<ChildCategoryPayload>(emptyChildCategoryData());

  console.log("Child Category State:", childCategoryData);
  // ── Hooks ──
  const { mutate: createCategory, isPending: categoryLoading } =
    useCreateCategory();
  const { mutate: createSubCategory, isPending: subCategoryLoading } =
    useCreateSubCategory();
  const { mutate: createChildCategory, isPending: childCategoryLoading } =
    useCreateChildCategory();

  // Fetch existing categories to populate parentCategory dropdown
  const { allCategoriesAdmin } = useGetCategories();
  const { allSubCategoriesAdmin } = useGetSubCategories();

  const categories = allCategoriesAdmin?.data;
  // Track which parent category is selected in the child form
  // so we can filter its subcategories for the subCategory dropdown
  const [childParentId, setChildParentId] = useState("");

  // ── Category handlers ──
  const handleCategoryChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setCategoryData((prev) => {
      if (name === "name") {
        return {
          ...prev,
          name: value,
          slug: generateSlug(value),
          metaTitle: value,
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCategory(categoryData, {
      onSuccess: () => setCategoryData(emptyCategoryData()),
    });
  };

  // ── SubCategory handlers ──
  const handleSubCategoryChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => {
      if (name === "name") {
        return {
          ...prev,
          name: value,
          slug: generateSlug(value),
          metaTitle: value,
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSubCategory(subCategoryData, {
      onSuccess: () => setSubCategoryData(emptySubCategoryData()),
    });
  };

  // ── ChildCategory handlers ──
  const handleChildCategoryChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setChildCategoryData((prev) => {
      if (name === "name") {
        return {
          ...prev,
          name: value,
          slug: generateSlug(value),
          metaTitle: value,
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleChildCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createChildCategory(childCategoryData, {
      onSuccess: () => {
        setChildCategoryData(emptyChildCategoryData());
        setChildParentId("");
      },
    });
  };

  // Derive subcategories for the selected parent in the child form
  const subCategories = allSubCategoriesAdmin?.data ?? [];

  const availableSubCategories = childParentId
    ? subCategories.filter(
        (sub: { parentCategory: { _id: string } | string }) => {
          // handle both populated { _id } and plain string id
          const parentId =
            typeof sub.parentCategory === "object"
              ? sub.parentCategory._id
              : sub.parentCategory;
          return parentId === childParentId;
        },
      )
    : [];
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-5xl">
        {/* ── Category Setup ─────────────────────────────────────────────── */}
        <div className="mb-8 w-full rounded-[10px] border border-[#E6E6E6] bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Category Setup
          </h1>
          <p className="mb-6 text-[16px] text-[#595959]">
            Create a new top-level product category for the marketplace
          </p>

          <form onSubmit={handleCategorySubmit} className="flex flex-col gap-6">
            {/* Name + Slug */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[16px] font-medium text-[#424242]">
                  Category Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  value={categoryData.name}
                  onChange={handleCategoryChange}
                  placeholder="e.g. Fresh Vegetables"
                  required
                  className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[16px] font-medium text-[#424242]">
                  Slug
                </span>
                <input
                  type="text"
                  name="slug"
                  value={categoryData.slug}
                  onChange={handleCategoryChange}
                  placeholder="auto-generated from name"
                  className="rounded-lg border border-[#E0E0E0] bg-[#F9FAFB] px-[14px] py-3 text-sm text-[#888] focus:border-[#2E7D32] focus:outline-none"
                />
                <span className="text-[11px] text-[#aaa]">
                  Auto-generated. Edit if needed.
                </span>
              </label>
            </div>

            {/* Description */}
            <label className="flex flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Description
              </span>
              <textarea
                name="description"
                value={categoryData.description}
                onChange={handleCategoryChange}
                placeholder="Brief description of this category..."
                rows={3}
                className="resize-none rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
              />
            </label>

            {/* Status */}
            <label className="flex w-full flex-col gap-2 sm:w-fit">
              <span className="text-[16px] font-medium text-[#424242]">
                Status
              </span>
              <select
                name="status"
                value={categoryData.status}
                onChange={handleCategoryChange}
                className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            {/* Cover Image */}
            <div className="flex flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Cover Image
              </span>
              <CoverUploader
                url={categoryData.cover.url}
                onUpload={(id, url) =>
                  setCategoryData((prev) => ({
                    ...prev,
                    cover: { _id: id, url },
                  }))
                }
              />
            </div>

            {/* SEO */}
            <div className="rounded-lg border border-[#E6E6E6] p-4">
              <p className="mb-4 text-[15px] font-semibold text-[#424242]">
                SEO / Meta
              </p>
              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-[14px] font-medium text-[#595959]">
                    Meta Title
                  </span>
                  <input
                    type="text"
                    name="metaTitle"
                    value={categoryData.metaTitle}
                    onChange={handleCategoryChange}
                    placeholder="e.g. Fresh Vegetables — Africa Marketplace"
                    className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[14px] font-medium text-[#595959]">
                    Meta Description
                  </span>
                  <textarea
                    name="metaDescription"
                    value={categoryData.metaDescription}
                    onChange={handleCategoryChange}
                    placeholder="Short SEO description shown in search results..."
                    rows={2}
                    className="resize-none rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={categoryLoading}
                className="w-fit cursor-pointer rounded-[27px] bg-[#2E7D32] px-8 py-3 font-medium text-white transition-colors hover:bg-[#256629] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {categoryLoading ? "Creating..." : "Create Category"}
              </button>
            </div>
          </form>
        </div>

        {/* ── Sub-Category Setup ──────────────────────────────────────────── */}
        <div className="mb-8 w-full rounded-[10px] border border-[#E6E6E6] bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Sub-Category Setup
          </h1>
          <p className="mb-6 text-[16px] text-[#595959]">
            Create a sub-category and link it to an existing parent category
          </p>

          <form
            onSubmit={handleSubCategorySubmit}
            className="flex flex-col gap-6"
          >
            {/* Parent Category */}
            <label className="flex w-full flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Parent Category <span className="text-red-500">*</span>
              </span>
              <select
                name="parentCategory"
                value={subCategoryData.parentCategory}
                onChange={handleSubCategoryChange}
                required
                className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
              >
                <option value="">Select parent category</option>
                {categories?.map((cat: { _id: string; name: string }) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Name + Slug */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[16px] font-medium text-[#424242]">
                  Sub-Category Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  value={subCategoryData.name}
                  onChange={handleSubCategoryChange}
                  placeholder="e.g. Smoked Fish"
                  required
                  className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[16px] font-medium text-[#424242]">
                  Slug
                </span>
                <input
                  type="text"
                  name="slug"
                  value={subCategoryData.slug}
                  onChange={handleSubCategoryChange}
                  placeholder="auto-generated from name"
                  className="rounded-lg border border-[#E0E0E0] bg-[#F9FAFB] px-[14px] py-3 text-sm text-[#888] focus:border-[#2E7D32] focus:outline-none"
                />
                <span className="text-[11px] text-[#aaa]">
                  Auto-generated. Edit if needed.
                </span>
              </label>
            </div>

            {/* Description */}
            <label className="flex flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Description
              </span>
              <textarea
                name="description"
                value={subCategoryData.description}
                onChange={handleSubCategoryChange}
                placeholder="Brief description of this sub-category..."
                rows={3}
                className="resize-none rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
              />
            </label>

            {/* Status */}
            <label className="flex w-full flex-col gap-2 sm:w-fit">
              <span className="text-[16px] font-medium text-[#424242]">
                Status
              </span>
              <select
                name="status"
                value={subCategoryData.status}
                onChange={handleSubCategoryChange}
                className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            {/* Cover Image */}
            <div className="flex flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Cover Image
              </span>
              <CoverUploader
                url={subCategoryData.cover.url}
                onUpload={(id, url) =>
                  setSubCategoryData((prev) => ({
                    ...prev,
                    cover: { _id: id, url },
                  }))
                }
              />
            </div>

            {/* SEO */}
            <div className="rounded-lg border border-[#E6E6E6] p-4">
              <p className="mb-4 text-[15px] font-semibold text-[#424242]">
                SEO / Meta
              </p>
              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-[14px] font-medium text-[#595959]">
                    Meta Title
                  </span>
                  <input
                    type="text"
                    name="metaTitle"
                    value={subCategoryData.metaTitle}
                    onChange={handleSubCategoryChange}
                    placeholder="e.g. Smoked Fish — Africa Marketplace"
                    className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[14px] font-medium text-[#595959]">
                    Meta Description
                  </span>
                  <textarea
                    name="metaDescription"
                    value={subCategoryData.metaDescription}
                    onChange={handleSubCategoryChange}
                    placeholder="Short SEO description shown in search results..."
                    rows={2}
                    className="resize-none rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={subCategoryLoading}
                className="w-fit cursor-pointer rounded-[27px] bg-[#2E7D32] px-8 py-3 font-medium text-white transition-colors hover:bg-[#256629] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {subCategoryLoading ? "Creating..." : "Create Sub-Category"}
              </button>
            </div>
          </form>
        </div>

        {/* ── Child Category Setup ───────────────────────────────────────── */}
        <div className="mb-8 w-full rounded-[10px] border border-[#E6E6E6] bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Child Category Setup
          </h1>
          <p className="mb-6 text-[16px] text-[#595959]">
            Create a child category and link it to an existing sub-category
          </p>

          <form
            onSubmit={handleChildCategorySubmit}
            className="flex flex-col gap-6"
          >
            {/* Step 1: Pick parent category to filter subcategories */}
            <label className="flex w-full flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Parent Category
                <span className="ml-1 text-[12px] font-normal text-[#aaa]">
                  (filter sub-categories)
                </span>
              </span>
              <select
                value={childParentId}
                onChange={(e) => {
                  setChildParentId(e.target.value);
                  // reset subCategory when parent changes
                  setChildCategoryData((prev) => ({
                    ...prev,
                    subCategory: "",
                  }));
                }}
                className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
              >
                <option value="">Select parent category</option>
                {categories?.map((cat: { _id: string; name: string }) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Step 2: Pick sub-category */}
            <label className="flex w-full flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Sub-Category <span className="text-red-500">*</span>
              </span>
              <select
                name="subCategory"
                value={childCategoryData.subCategory}
                onChange={handleChildCategoryChange}
                required
                disabled={!childParentId}
                className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:text-[#aaa]"
              >
                <option value="">
                  {childParentId
                    ? "Select sub-category"
                    : "Select a parent category first"}
                </option>
                {availableSubCategories?.map(
                  (sub: { _id: string; name: string }) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ),
                )}
              </select>
            </label>

            {/* Name + Slug */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[16px] font-medium text-[#424242]">
                  Child Category Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  value={childCategoryData.name}
                  onChange={handleChildCategoryChange}
                  placeholder="e.g. Soft Drinks"
                  required
                  className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[16px] font-medium text-[#424242]">
                  Slug
                </span>
                <input
                  type="text"
                  name="slug"
                  value={childCategoryData.slug}
                  onChange={handleChildCategoryChange}
                  placeholder="auto-generated from name"
                  className="rounded-lg border border-[#E0E0E0] bg-[#F9FAFB] px-[14px] py-3 text-sm text-[#888] focus:border-[#2E7D32] focus:outline-none"
                />
                <span className="text-[11px] text-[#aaa]">
                  Auto-generated. Edit if needed.
                </span>
              </label>
            </div>

            {/* Description */}
            <label className="flex flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Description
              </span>
              <textarea
                name="description"
                value={childCategoryData.description}
                onChange={handleChildCategoryChange}
                placeholder="Brief description of this child category..."
                rows={3}
                className="resize-none rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
              />
            </label>

            {/* Status */}
            <label className="flex w-full flex-col gap-2 sm:w-fit">
              <span className="text-[16px] font-medium text-[#424242]">
                Status
              </span>
              <select
                name="status"
                value={childCategoryData.status}
                onChange={handleChildCategoryChange}
                className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            {/* Cover Image */}
            <div className="flex flex-col gap-2">
              <span className="text-[16px] font-medium text-[#424242]">
                Cover Image
              </span>
              <CoverUploader
                url={childCategoryData.cover.url}
                onUpload={(id, url) =>
                  setChildCategoryData((prev) => ({
                    ...prev,
                    cover: { _id: id, url },
                  }))
                }
              />
            </div>

            {/* SEO */}
            <div className="rounded-lg border border-[#E6E6E6] p-4">
              <p className="mb-4 text-[15px] font-semibold text-[#424242]">
                SEO / Meta
              </p>
              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-[14px] font-medium text-[#595959]">
                    Meta Title
                  </span>
                  <input
                    type="text"
                    name="metaTitle"
                    value={childCategoryData.metaTitle}
                    onChange={handleChildCategoryChange}
                    placeholder="e.g. Soft Drinks — Africa Marketplace"
                    className="rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[14px] font-medium text-[#595959]">
                    Meta Description
                  </span>
                  <textarea
                    name="metaDescription"
                    value={childCategoryData.metaDescription}
                    onChange={handleChildCategoryChange}
                    placeholder="Short SEO description shown in search results..."
                    rows={2}
                    className="resize-none rounded-lg border border-[#E0E0E0] px-[14px] py-3 text-sm focus:border-[#2E7D32] focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={childCategoryLoading}
                className="w-fit cursor-pointer rounded-[27px] bg-[#2E7D32] px-8 py-3 font-medium text-white transition-colors hover:bg-[#256629] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {childCategoryLoading ? "Creating..." : "Create Child Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategorySettings;

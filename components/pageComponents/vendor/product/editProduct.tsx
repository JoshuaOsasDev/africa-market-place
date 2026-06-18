"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRouter } from "next/navigation";
import {
  useVendorProductById,
  useVendorUpdateProduct,
} from "@/lib/hooks/vendorDashboard/useVendor";
import { CategoryType, Product } from "@/types/product";
import Image from "next/image";
import EditProductSkeleton from "@/components/common/editProductSkeleton";
import { useAppSelector } from "@/redux/store";
import { CldUploadWidget } from "next-cloudinary";

// Product validation schema
const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  sku: yup.string().required("SKU is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  salePrice: yup.number().nullable(),
  description: yup.string().required("Product description is required"),
  category: yup.object({
    id: yup.string().required("Category is required"),
    name: yup.string().required(),
  }),
  subCategory: yup
    .object({
      id: yup.string().nullable(),
      name: yup.string().nullable(),
    })
    .nullable(),
  childCategory: yup
    .object({
      id: yup.string().nullable(),
      name: yup.string().nullable(),
    })
    .nullable(),
  tags: yup.array().nullable(),
  status: yup.string().required("Status is required"),
  stockQuantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required"),
  isFeatured: yup.boolean().default(false),
  images: yup.mixed().nullable(),
  deliveryType: yup.string().default("physical"),
});

type EditProductProps = {
  existingData?: Product | string;
};

export default function EditProduct({ existingData }: EditProductProps) {
  const router = useRouter();
  const [images, setImages] = useState<string | null>(null);

  // Redux category state
  const categories = useAppSelector((state) => state.categories);

  const isSlug = typeof existingData === "string";
  const slug = isSlug ? existingData : existingData?.slug;
  const productData = !isSlug ? existingData : null;

  const { vendorProductById, isLoading: isFetching } = useVendorProductById(
    isSlug ? slug : "",
  );

  const data = productData || vendorProductById?.data;

  const categoryOptions = categories.categories?.category || [];
  const subCategoryOptions = categories.categories?.subCategory || [];
  const childCategoryOptions = categories.categories?.childCategory || [];

  const restoreScroll = () => {
    document.body.style.overflow = "";
  };

  const {
    mutate: updateProduct,
    isPending,
    error,
    isSuccess,
  } = useVendorUpdateProduct(slug || "");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      salePrice: 0,
      description: "",
      category: { id: "", name: "" },
      subCategory: { id: "", name: "" },
      childCategory: { id: "", name: "" },
      tags: [],
      status: "draft",
      stockQuantity: 0,
      isFeatured: false,
      deliveryType: "physical",
      images: [],
    },
  });

  const status = watch("status");
  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subCategory");

  // Normalized Filtering handles differences between incoming API payload structural schemes
  const currentCategoryId = selectedCategory?.id;
  const currentSubCategoryId = selectedSubCategory?.id;

  const filteredSubCategories = currentCategoryId
    ? subCategoryOptions.filter(
        (sub: any) => sub.parentCategory === currentCategoryId,
      )
    : [];

  const filteredChildCategories = currentSubCategoryId
    ? childCategoryOptions.filter(
        (child: any) => child.subCategory === currentSubCategoryId,
      )
    : [];

  // Synchronize form values on initial dataset load
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        sku: data.sku || "",
        price: data.price || 0,
        salePrice: data.salePrice || 0,
        description: data.description || "",
        category: {
          id: data.category?._id || data.category?.id || "",
          name: data.category?.name || "",
        },
        subCategory: {
          id: data.subCategory?._id || data.subCategory?.id || "",
          name: data.subCategory?.name || "",
        },
        childCategory: {
          id: data.childCategory?._id || data.childCategory?.id || "",
          name: data.childCategory?.name || "",
        },
        tags: data.tags || [],
        status: data.status || "draft",
        stockQuantity: data.stockQuantity || 0,
        isFeatured: data.isFeatured || false,
        deliveryType: data.deliveryType || "physical",
        images: data.images || [],
      });

      if (data.images?.length > 0) {
        setImages(data.images[0]?.url);
      }
    }
  }, [data, reset]);

  const handleRemoveImage = () => {
    setImages(null);
    setValue("images", null);
  };

  const onSubmit = async function (
    formData: any,
    e?: React.BaseSyntheticEvent,
  ) {
    e?.preventDefault();
    const submitData: any = {
      slug: data?.slug || slug,
      name: formData.name,
      sku: formData.sku,
      price: Number(formData.price),
      salePrice: Number(formData.salePrice),
      description: formData.description,
      category: formData.category?.id || null,
      subCategory: formData.subCategory?.id || null,
      childCategory: formData.childCategory?.id || null,
      tags: Array.isArray(formData.tags) ? formData.tags : [],
      status: formData.status,
      stockQuantity: Number(formData.stockQuantity),
      isFeatured: formData.isFeatured,
      deliveryType: formData.deliveryType,
      images: images ? [{ _id: "img_123", url: images }] : [],
    };

    updateProduct(submitData);
  };

  const onError = (formErrors: any) => {
    console.log("Form validation errors:", formErrors);
  };

  useEffect(() => {
    if (isSuccess) {
      const targetSlug = data?.slug || slug;
      const timer = setTimeout(() => {
        router.push(`/vendor/dashboard/product/${targetSlug}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router, data, slug]);

  if (isFetching) return <EditProductSkeleton />;

  return (
    <div className="min-h-screen py-6">
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error updating product</p>
          <p className="text-sm">
            {error instanceof Error
              ? error.message
              : "Failed to update product"}
          </p>
        </div>
      )}

      {isSuccess && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          <p className="font-medium">✓ Product updated successfully!</p>
          <p className="text-sm">Redirecting to products list...</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid max-w-7xl grid-cols-1 gap-6 px-2 lg:grid-cols-3"
      >
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* General Information */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                General Information
              </h2>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-[#4D5464]">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Type product name here..."
                  className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Type product description here..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Media
              </h2>
              <label className="mb-2 block text-sm font-medium text-[#4D5464]">
                Photo
              </label>

              <div className="relative mb-4 flex min-h-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E0E2E7] bg-[#F9F9FC] p-4">
                {images && (
                  <div className="relative mb-4 h-48 w-full max-w-sm">
                    <Image
                      src={images}
                      alt="Product"
                      fill
                      className="rounded-lg object-contain"
                    />

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <CldUploadWidget
                  uploadPreset="africamarketplace"
                  onSuccess={(result: any) => {
                    restoreScroll();

                    if (result?.info?.secure_url) {
                      setImages(result.info.secure_url);
                      setValue("images", result.info.secure_url);
                    }
                  }}
                  options={{
                    showPoweredBy: false,
                    multiple: false,
                    clientAllowedFormats: ["png", "jpg", "jpeg"],
                    folder: "products",
                    maxFileSize: 2 * 1024 * 1024,
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open?.()}
                      className="rounded-lg bg-[#EAF2EA] px-6 py-2 text-sm font-medium text-[#2E7D32] transition hover:bg-green-700 hover:text-white"
                    >
                      {images ? "Change Image" : "Add Image"}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Price
              </h2>
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-[#4D5464]">
                  Base Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price")}
                  placeholder="£ Type base price here..."
                  className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("salePrice")}
                    placeholder="£ Type sale price here..."
                    className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Inventory
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4D5464]">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("sku")}
                    placeholder="Product SKU..."
                    className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                  />
                  {errors.sku && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.sku.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4D5464]">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("stockQuantity")}
                    placeholder="Product quantity..."
                    className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                  />
                  {errors.stockQuantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.stockQuantity.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Category Selection Card */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Category
              </h2>

              {/* Category */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <select
                        value={field.value?.id || ""}
                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedObj = categoryOptions.find(
                            (cat: any) => cat._id === selectedId,
                          );
                          if (selectedObj) {
                            field.onChange({
                              id: selectedObj._id,
                              name: selectedObj.name,
                            });
                          } else {
                            field.onChange({ id: "", name: "" });
                          }
                          setValue("subCategory", { id: "", name: "" });
                          setValue("childCategory", { id: "", name: "" });
                        }}
                      >
                        <option value="">Select a category</option>
                        {categoryOptions.map((cat: any) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Sub Category */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sub Category
                </label>
                <div className="relative">
                  <Controller
                    name="subCategory"
                    control={control}
                    render={({ field }) => (
                      <select
                        value={field.value?.id || ""}
                        disabled={
                          !currentCategoryId ||
                          filteredSubCategories.length === 0
                        }
                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedObj = filteredSubCategories.find(
                            (sub: any) => sub._id === selectedId,
                          );
                          if (selectedObj) {
                            field.onChange({
                              id: selectedObj._id,
                              name: selectedObj.name,
                            });
                          } else {
                            field.onChange({ id: "", name: "" });
                          }
                          setValue("childCategory", { id: "", name: "" });
                        }}
                      >
                        <option value="">
                          {!currentCategoryId
                            ? "Select a category first"
                            : filteredSubCategories.length === 0
                              ? "No subcategories available"
                              : "Select a subcategory"}
                        </option>
                        {filteredSubCategories.map((sub: any) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Child Category */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Child Category
                </label>
                <div className="relative">
                  <Controller
                    name="childCategory"
                    control={control}
                    render={({ field }) => (
                      <select
                        value={field.value?.id || ""}
                        disabled={
                          !currentSubCategoryId ||
                          filteredChildCategories.length === 0
                        }
                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedObj = filteredChildCategories.find(
                            (child: any) => child._id === selectedId,
                          );
                          if (selectedObj) {
                            field.onChange({
                              id: selectedObj._id,
                              name: selectedObj.name,
                            });
                          } else {
                            field.onChange({ id: "", name: "" });
                          }
                        }}
                      >
                        <option value="">
                          {!currentSubCategoryId
                            ? "Select a subcategory first"
                            : filteredChildCategories.length === 0
                              ? "No child categories available"
                              : "Select a child category"}
                        </option>
                        {filteredChildCategories.map((child: any) => (
                          <option key={child._id} value={child._id}>
                            {child.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Status Configuration */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Status</h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 capitalize">
                  {status}
                </span>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("status")}
                    className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="published">Published</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="h-5 w-5 cursor-pointer rounded-md border border-gray-400 accent-[#2E7D32]"
                />
                <label className="cursor-pointer text-sm font-medium text-gray-700">
                  Featured Product
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex w-full items-center justify-center gap-4 lg:col-span-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg bg-gray-200 px-12 py-2.5 font-medium text-gray-700 transition hover:bg-gray-300"
          >
            Go back
          </button>
          <button
            type="submit"
            disabled={isPending || isSuccess}
            className="flex items-center gap-2 rounded-lg bg-[#2E7D32] px-12 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Updating...
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

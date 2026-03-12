"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ChevronDown, ImageOff, X } from "lucide-react";

import {
  useVendorProductById,
  useVendorUpdateProduct,
} from "@/lib/hooks/vendorDashboard/useVendor";
import { DeliveryType, ImageProp, ProductStatus } from "@/types/product";

// ==================
// Validation schema
// ==================
const productSchema = yup.object({
  name: yup.string().required("Product name is required"),
  sku: yup.string().required("SKU is required"),
  price: yup.number().required("Price is required"),
  salePrice: yup.number().nullable().default(null),
  description: yup.string().required("Description is required"),
  category: yup
    .object({
      id: yup.string().required("Category is required"),
      name: yup.string().required(),
    })
    .required("Category is required"),

  subCategory: yup
    .object({
      id: yup.string().default(""),
      name: yup.string().default(""),
    })
    .nullable()
    .default(null),

  childCategory: yup
    .object({
      id: yup.string().default(""),
      name: yup.string().default(""),
    })
    .nullable()
    .default(null),

  tags: yup.array(yup.string()).default([]),

  status: yup
    .mixed<ProductStatus>()
    .oneOf(["published", "draft", "pending"])
    .default("pending"),
  stockQuantity: yup.number().required("Stock quantity is required"),
  isFeatured: yup.boolean().default(false),
  images: yup.mixed<ImageProp>().nullable().optional().default(null),
  deliveryType: yup
    .mixed<DeliveryType>()
    .oneOf(["physical", "digital"])
    .required("Delivery type is required"),
});

type FormValues = yup.InferType<typeof productSchema>;

export default function EditProductIconPage({ slug }: { slug: string }) {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Mock category data - replace with your actual data source
  const categoryOptions = [
    { _id: "cat1", name: "Shoes", slug: "shoes" },
    { _id: "cat2", name: "Electronics", slug: "electronics" },
    { _id: "cat3", name: "Clothing", slug: "clothing" },
    { _id: "cat4", name: "Food & Beverages", slug: "food" },
  ];

  const subCategoryOptions = [
    {
      _id: "sub1",
      name: "Running Shoes",
      slug: "running-shoes",
      categoryId: "cat1",
    },
    {
      _id: "sub2",
      name: "Casual Shoes",
      slug: "casual-shoes",
      categoryId: "cat1",
    },
    { _id: "sub3", name: "Laptops", slug: "laptops", categoryId: "cat2" },
    { _id: "sub4", name: "Phones", slug: "phones", categoryId: "cat2" },
    {
      _id: "sub5",
      name: "Men's Clothing",
      slug: "mens-clothing",
      categoryId: "cat3",
    },
    {
      _id: "sub6",
      name: "Women's Clothing",
      slug: "womens-clothing",
      categoryId: "cat3",
    },
  ];

  const childCategoryOptions = [
    {
      _id: "child1",
      name: "Nike Running",
      slug: "nike-running",
      subCategoryId: "sub1",
    },
    {
      _id: "child2",
      name: "Adidas Running",
      slug: "adidas-running",
      subCategoryId: "sub1",
    },
    {
      _id: "child3",
      name: "Gaming Laptops",
      slug: "gaming-laptops",
      subCategoryId: "sub3",
    },
    {
      _id: "child4",
      name: "Business Laptops",
      slug: "business-laptops",
      subCategoryId: "sub3",
    },
  ];

  // Update mutation
  const {
    mutate: updateProduct,
    isPending,
    isSuccess,
    error,
  } = useVendorUpdateProduct(slug);

  // Fetch product
  const { vendorProductById, isLoading } = useVendorProductById(slug);

  console.log("Product data:", vendorProductById, "Slug:", slug);

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(productSchema),
  });

  const status = watch("status");
  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subCategory");

  // Filter subcategories based on selected category
  const filteredSubCategories = selectedCategory?.id
    ? subCategoryOptions.filter((sub) => sub.categoryId === selectedCategory.id)
    : [];

  // Filter child categories based on selected subcategory
  const filteredChildCategories = selectedSubCategory?.id
    ? childCategoryOptions.filter(
        (child) => child.subCategoryId === selectedSubCategory.id,
      )
    : [];

  // Populate form when data loads
  useEffect(() => {
    if (!vendorProductById?.data) return;

    const product = vendorProductById.data;

    reset({
      name: product.name,
      sku: product.sku,
      price: product.price,
      salePrice: product.salePrice,
      description: product.description,
      category: product.category || { id: "", name: "" },
      subCategory: product.subCategory || { id: "", name: "" },
      childCategory: product.childCategory || { id: "", name: "" },
      status: product.status,
      stockQuantity: product.stockQuantity,
      isFeatured: product.isFeatured,
      deliveryType: product.deliveryType,
      tags: product.tags ?? [],
    });

    // Set image preview
    if (product.images?.length) {
      setImages(product.images[0].url);
    }
  }, [vendorProductById, reset]);

  // Image handlers
  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImages(imageUrl);

        // Create proper ImageProp object
        const imageData: ImageProp = {
          _id: `img_${Date.now()}`, // Generate unique ID
          url: imageUrl,
        };

        setValue("images", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files?.length > 0) {
      handleImageChange(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setImages(null);
    setValue("images", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ FIXED: Submit handler
  const onSubmit = (formData: FormValues) => {
   // console.log("Form submitted with data:", formData);
    console.log("Form errors:", errors);

    // Don't pass slug here - the hook already has it
    updateProduct({
      name: formData.name,
      sku: formData.sku,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : null,
      description: formData.description,
      category: formData.category,
      subCategory: formData.subCategory,
      childCategory: formData.childCategory,
      tags: Array.isArray(formData.tags) ? formData.tags : [],
      status: formData.status,
      stockQuantity: Number(formData.stockQuantity),
      isFeatured: formData.isFeatured,
      deliveryType: formData.deliveryType,
      images: images ? [{ _id: "img_123", url: images }] : [],
    } as any);
  };

  // ✅ ADDED: Error handler for form validation
  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  if (isLoading) return <p>Loading product...</p>;

  return (
    <div className="min-h-screen py-6">
      {/* Error Message */}
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

      {/* Success Message */}
      {isSuccess && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          <p className="font-medium">✓ Product updated successfully!</p>
          <p className="text-sm">Redirecting to products list...</p>
        </div>
      )}

      {/* ✅ FIXED: Added onError handler */}
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

              {/* Product Name */}
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

              {/* Description */}
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

              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center space-y-4 rounded-xl border-2 border-dashed px-3 py-6 transition-colors ${
                  isDragging
                    ? "border-green-500 bg-green-50"
                    : "border-[#E0E2E7] bg-[#F9F9FC]"
                }`}
              >
                {images ? (
                  <div className="relative w-full">
                    <div className="p-5">
                      <img
                        src={images}
                        className="mx-auto h-48 w-auto rounded-lg object-contain"
                        alt="Product"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white transition hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="rounded-full border-4 border-[#EFEFFD] bg-[#EAF2EA] p-2">
                      <ImageOff className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <p className="text-center text-sm text-gray-600">
                      Drag and drop image here, or click add image
                    </p>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleAddImageClick}
                  className="rounded-lg bg-[#EAF2EA] px-6 py-2 text-sm font-medium text-[#2E7D32] transition hover:bg-green-700 hover:text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                >
                  {images ? "Change Image" : "Add Image"}
                </button>
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
                  placeholder="$ Type base price here..."
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
                    placeholder="$ Type sale price here..."
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

          {/* Shipping */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Shipping
              </h2>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("deliveryType")}
                  value="physical"
                  className="h-5 w-5 cursor-pointer rounded-md border border-gray-400 accent-[#2E7D32] transition-all"
                />
                <label className="cursor-pointer text-sm font-semibold text-[#4D5464]">
                  This is a physical product
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Category */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Category
              </h2>

              {/* Product Category */}
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
                        {...field}
                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedCategory = categoryOptions.find(
                            (cat) => cat._id === selectedId,
                          );
                          if (selectedCategory) {
                            field.onChange({
                              id: selectedCategory._id,
                              name: selectedCategory.name,
                            });
                            // Reset subcategory and child category when category changes
                            setValue("subCategory", { id: "", name: "" });
                            setValue("childCategory", { id: "", name: "" });
                          } else {
                            field.onChange({ id: "", name: "" });
                            setValue("subCategory", { id: "", name: "" });
                            setValue("childCategory", { id: "", name: "" });
                          }
                        }}
                        value={field.value?.id || ""}
                      >
                        <option value="">Select a category</option>
                        {categoryOptions.map((cat) => (
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
                        {...field}
                        disabled={
                          !selectedCategory?.id ||
                          filteredSubCategories.length === 0
                        }
                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedSubCat = filteredSubCategories.find(
                            (sub) => sub._id === selectedId,
                          );
                          if (selectedSubCat) {
                            field.onChange({
                              id: selectedSubCat._id,
                              name: selectedSubCat.name,
                            });
                            // Reset child category when subcategory changes
                            setValue("childCategory", { id: "", name: "" });
                          } else {
                            field.onChange({ id: "", name: "" });
                            setValue("childCategory", { id: "", name: "" });
                          }
                        }}
                        value={field.value?.id || ""}
                      >
                        <option value="">
                          {!selectedCategory?.id
                            ? "Select a category first"
                            : filteredSubCategories.length === 0
                              ? "No subcategories available"
                              : "Select a subcategory"}
                        </option>
                        {filteredSubCategories.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.subCategory && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subCategory.message}
                  </p>
                )}
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
                        {...field}
                        disabled={
                          !selectedSubCategory?.id ||
                          filteredChildCategories.length === 0
                        }
                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedChild = filteredChildCategories.find(
                            (child) => child._id === selectedId,
                          );
                          if (selectedChild) {
                            field.onChange({
                              id: selectedChild._id,
                              name: selectedChild.name,
                            });
                          } else {
                            field.onChange({ id: "", name: "" });
                          }
                        }}
                        value={field.value?.id || ""}
                      >
                        <option value="">
                          {!selectedSubCategory?.id
                            ? "Select a subcategory first"
                            : filteredChildCategories.length === 0
                              ? "No child categories available"
                              : "Select a child category"}
                        </option>
                        {filteredChildCategories.map((child) => (
                          <option key={child._id} value={child._id}>
                            {child.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.childCategory && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.childCategory.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
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

        {/* Footer Submit Button */}
        <div className="bg-white lg:col-span-3">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:justify-center">
            <div className="flex items-center justify-center gap-5 md:gap-3">
              <button
                type="button"
                className="rounded-lg bg-[#D5E5D6] px-20 py-2.5 font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Go back
              </button>
              <button
                type="submit"
                disabled={isPending || isSuccess}
                className="flex items-center gap-2 rounded-lg bg-[#2E7D32] px-10 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating...
                  </>
                ) : isSuccess ? (
                  <>
                    <span>✓</span>
                    Updated
                  </>
                ) : (
                  "Update Product"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

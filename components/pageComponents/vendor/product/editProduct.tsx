import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, ImageOff, X } from "lucide-react";
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
  subCategory: yup.object({
    id: yup.string().nullable(),
    name: yup.string().nullable(),
  }),
  childCategory: yup.object({
    id: yup.string().nullable(),
    name: yup.string().nullable(),
  }),
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
  existingData?: Product | string; // Can be full product data or just slug
};

export default function EditProduct({ existingData }: EditProductProps) {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //Redux category state
  const categories = useAppSelector((state) => state.categories);

  // Determine if existingData is a slug (string) or product object
  const isSlug = typeof existingData === "string";
  //console.log(isSlug, "slug");
  const slug = isSlug ? existingData : existingData?.slug;
  const productData = !isSlug ? existingData : null;

  const { vendorProductById, isLoading: isFetching } = useVendorProductById(
    isSlug ? slug : "",
  );

 //console.log(vendorProductById, "slug id");

  // Use fetched data or provided data
  const data = productData || vendorProductById?.data;

  // const matchedCategory = categories.categories.category?.find(
  //   (cat) => cat.slug === productData?.category.slug,
  // );

  //console.log(categories.categories?.category, "all cat");

  const categoryOptions = categories.categories?.category || [];
  const subCategoryOptions = categories.categories?.subCategory || [];
  const childCategoryOptions = categories.categories?.childCategory || [];

  //console.log(childCategoryOptions, "child options");
  // Get the update mutation hook
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
      category: {
        id: "",
        name: "",
      },
      subCategory: {
        id: "",
        name: "",
      },
      childCategory: {
        id: "",
        name: "",
      },
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

 // console.log(selectedCategory.id, "selected");
  // Filter subcategories based on selected category
  // const filteredSubCategories = selectedCategory?.id
  //   ? subCategoryOptions.filter((sub) => sub._id === selectedCategory.id)
  //   : [];

  const filteredSubCategories = selectedCategory?.id
    ? subCategoryOptions.filter(
        (sub: any) => sub.parentCategory === selectedCategory.id,
      )
    : [];

  // Filter child categories based on selected subcategory
  // const filteredChildCategories = selectedSubCategory?.id
  //   ? childCategoryOptions.filter((child) => {
  //       return child._id === selectedSubCategory.id;
  //     })
  //   : [];

  const filteredChildCategories = selectedSubCategory?.id
    ? childCategoryOptions.filter(
        (child: any) => child.subCategory === selectedSubCategory.id,
      )
    : [];

 // console.log(subCategoryOptions[0], "sub");
  // Update form when data is loaded
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        sku: data.sku || "",
        price: data.price || 0,
        salePrice: data.salePrice || 0,
        description: data.description || "",
        category: {
          id: data.category._id,
          name: data.category.name,
        },
        subCategory: data.subCategory || "",
        childCategory: data.childCategory || "",
        tags: data.tags || [],
        status: data.status || "draft",
        stockQuantity: data.stockQuantity || 0,
        isFeatured: data.isFeatured || false,
        deliveryType: data.deliveryType || "physical",
        images: data.images || [],
      });

      // Set image preview
      if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        const firstImage = data.images[0]?.url;
        if (firstImage) {
          setImages(firstImage);
        }
      }
    }
  }, [data, reset]);

  // Set initial image preview from existing data
  useEffect(() => {
    if (productData?.images?.length) {
      setImages(productData.images[0].url);
    }
  }, [productData]);
  // Handle image upload
  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(reader.result as string);
        setValue("images", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
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
    if (files && files.length > 0) {
      handleImageChange(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImages(null);
    setValue("images", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Open file picker
  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async function (data: any, e?: React.BaseSyntheticEvent) {
    // Map form data to UpdateProductPayload
    e?.preventDefault(); // 👈 optional safety
    const submitData: any = {
      slug: productData?.slug,
      name: data.name,
      sku: data.sku,
      price: Number(data.price),
      salePrice: Number(data.salePrice),
      description: data.description,
      category: data.category.id,
      subCategory: data.subCategory.id,
      childCategory: data.childCategory.id,
      tags: Array.isArray(data.tags) ? data.tags : [],
      status: data.status,
      stockQuantity: Number(data.stockQuantity),
      isFeatured: data.isFeatured,
      deliveryType: data.deliveryType,
      images: images ? [{ _id: "img_123", url: images }] : [],
    };

   // console.log(productData?.slug || "", submitData, "submit");
    // Call the mutation
    updateProduct(submitData);
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  // Redirect on success
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push(`/vendor/dashboard/product/${productData?.slug || slug}`);
      }, 1500);
    }
  }, [isSuccess, router, productData, slug]);

  if (isFetching) return <EditProductSkeleton />;
  return (
    <div className="min-h-screen py-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error updating product</p>
          <p className="text-sm">
            {error instanceof Error ? error.name : "Failed to update product"}
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
                  <div className="w-full">
                    <div className="relative h-48 w-auto p-5">
                      <Image
                        src={images}
                        className="mx-auto rounded-lg object-contain"
                        alt="Product"
                        fill
                      />

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="right- absolute top-0 right-0 rounded-full bg-red-500 p-1.5 text-white transition hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
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
                  multiple
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
                            (cat: CategoryType) => cat._id === selectedId,
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
                        {...field}
                        disabled={
                          !selectedCategory?.id ||
                          filteredSubCategories.length === 0
                        }
                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          console.log(selectedId, "selectedId");
                          const selectedSubCat = filteredSubCategories.find(
                            (sub: any) => sub._id === selectedId,
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
                            (child: any) => child._id === selectedId,
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
                onClick={() => router.back()}
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
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-2">
                    <span>✓</span>
                    Updated
                  </span>
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

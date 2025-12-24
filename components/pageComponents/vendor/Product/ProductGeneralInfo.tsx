import React, { ChangeEvent, useRef, useState } from "react";
import { ChevronDown, ImageOff, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";

// Product validation schema
const productSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  sku: yup.string().required("SKU is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  productDescription: yup.string().required("Product description is required"),
  category: yup.string().required("Category is required"),
  tags: yup.string().nullable(),
  status: yup.string().required("Status is required"),
  quantity: yup.string().required("Quantity is required"),
  barcode: yup.string().required("Barcode is required"),
  percentage: yup.number().nullable(),
  checked: yup.boolean().default(true),
  discountType: yup.string().nullable(),
  imagePreview: yup.mixed().nullable(),
  weight: yup.string().nullable(),
});

export default function ProductGeneralInfo() {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<null | HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      productName: "",
      sku: "",
      price: 0,
      productDescription: "",
      category: "",
      tags: "",
      status: "Draft",
      quantity: "",
      barcode: "",
      percentage: 0,
      checked: true,
      discountType: "",
      imagePreview: null,
      weight: "",
    },
  });

  // Watch form values
  const category = watch("category");
  const tags = watch("tags");
  const status = watch("status");
  const checked = watch("checked");
  const discountType = watch("discountType");
  const percentage = watch("percentage");

  // Handle image upload
  const handleImageChange = (file:File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setValue("imagePreview", reader.result); // Register with RHF
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDragEnter = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageChange(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("imagePreview", null); // Update RHF
    if (fileInputRef.current) {
      fileInputRef.current.value  = "";
    }
  };

  // Open file picker
  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Product saved successfully! Check console for data.");
  };

  return (
    <div className="min-h-screen py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
                  {...register("productName")}
                  placeholder="Type product name here..."
                  className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                />
                {errors.productName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.productName.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("productDescription")}
                  placeholder="Type product description here..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                />
                {errors.productDescription && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.productDescription.message}
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
                {imagePreview ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="mx-auto h-48 w-auto rounded-lg object-contain"
                    />
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
                  Add Image
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
                    Discount Type
                  </label>
                  <div className="relative">
                    <select
                      {...register("discountType")}
                      className="w-full cursor-pointer appearance-none rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                    >
                      <option value="">Select a discount type</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="bogo">Buy One Get One</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="flex-1">
                  <label className="mb-2 block text-sm font-medium text-[#4D5464]">
                    Discount percentage (%)
                  </label>
                  <input
                    type="number"
                    {...register("percentage")}
                    placeholder="Type discount percentage..."
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

              <div className="grid grid-cols-3 gap-4">
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
                    Barcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("barcode")}
                    placeholder="Product barcode..."
                    className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                  />
                  {errors.barcode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.barcode.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4D5464]">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("quantity")}
                    placeholder="Product quantity..."
                    className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.quantity.message}
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

              <div className="mb-5 flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("checked")}
                  className="h-5 w-5 cursor-pointer rounded-md border border-gray-400 accent-[#2E7D32] transition-all"
                />
                <label
                  className={`cursor-pointer text-sm font-semibold ${
                    checked ? "text-[#2E7D32]" : "text-[#4D5464]"
                  }`}
                >
                  This is a physical product
                </label>
              </div>

              <div className="max-w-xs">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Weight
                </label>
                <input
                  type="text"
                  {...register("weight")}
                  placeholder="Product weight..."
                  className="w-full rounded-lg border border-[#E0E2E7] bg-[#F9F9FC] px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-300"
                />
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

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("category")}
                    className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food & Beverages</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Tags
                </label>
                <div className="relative">
                  <select
                    {...register("tags")}
                    className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select tags</option>
                    <option value="new">New Arrival</option>
                    <option value="sale">On Sale</option>
                    <option value="featured">Featured</option>
                    <option value="bestseller">Best Seller</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Status</h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {status}
                </span>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("status")}
                    className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Submit Button */}
        <div className="bg-white md:fixed md:right-0 md:bottom-0 md:left-63 md:border-t md:border-gray-200 md:shadow-lg lg:col-span-3">
          <div className="mx-auto flex items-center justify-end gap-4 px-4 md:max-w-7xl md:justify-between md:py-4">
            <div className="hidden text-sm text-gray-600 md:block">
              <span className="font-medium">StatusProduct Completion:</span>{" "}
              <span className="rounded-full bg-[#FEEDEC] px-3 py-1 text-[#F04438]">
                0%
              </span>
            </div>
            <div className="flex gap-5 md:gap-3">
              <button
                type="button"
                className="flex items-center justify-center space-x-1.5 rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
              >
                <span>
                  <X />
                </span>
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#2E7D32] px-8 py-2.5 font-medium text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Spacer to prevent content from being hidden under footer */}
      <div className="md:h-20"></div>
    </div>
  );
}

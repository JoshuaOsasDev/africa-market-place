"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ImageOff, X, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useVendorCreateProduct } from "@/lib/hooks/vendorDashboard/useVendor";
import { createVendorProduct } from "@/services/apiServices/vendorDashboard";
import { CategoryType } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setShowForm } from "@/redux/slices/showFormSlice";
import { useRouter } from "next/navigation";

type Shop = {
  _id: string;
  name: string;
};

type ProductImage = {
  _id: string;
  url: string;
  file: File;
};
// Product validation schema aligned with Mongoose schema
const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .max(100, "Name cannot exceed 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(500, "Description cannot exceed 500 characters"),
  content: yup.string(),
  metaTitle: yup
    .string()
    .required("Meta title is required")
    .max(100, "Meta title cannot exceed 100 characters"),
  metaDescription: yup
    .string()
    .max(200, "Meta description cannot exceed 200 characters"),
  slug: yup.string().required("Slug is required"),
  status: yup
    .string()
    .oneOf(["published", "draft", "pending"])
    .required("Status is required"),
  type: yup
    .string()
    .oneOf(["simple", "variable"])
    .required("Product type is required"),
  deliveryType: yup.string().oneOf(["physical", "digital"]),
  downloadLink: yup.string().when(["type", "deliveryType"], {
    is: (type: string, deliveryType: string) =>
      type === "simple" && deliveryType === "digital",
    then: (schema) =>
      schema.required("Download link is required for digital products"),
    otherwise: (schema) => schema.notRequired(),
  }),
  demo: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-or-empty",
      "Must be a valid URL",
      (value) =>
        !value || value.length === 0 || yup.string().url().isValidSync(value),
    ),

  isFeatured: yup.boolean(),

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
  gender: yup.string(),
  tags: yup.array().of(yup.string()),
  sku: yup.string().when("type", {
    is: "simple",
    then: (schema) => schema.required("SKU is required for simple products"),
  }),
  price: yup.number().when("type", {
    is: "simple",
    then: (schema) =>
      schema.required("Price is required for simple products").positive(),
  }),
  salePrice: yup.number().when("type", {
    is: "simple",
    then: (schema) =>
      schema.required("Sale price is required for simple products").positive(),
  }),
  stockQuantity: yup.number().when("type", {
    is: "simple",
    then: (schema) =>
      schema.required("Stock quantity is required for simple products").min(0),
  }),
  width: yup.string(),
  shop: yup.string().required("Add shop"),
  length: yup.string(),
  height: yup.string(),
  variants: yup.array().when("type", {
    is: "variable",
    then: (schema) =>
      schema
        .of(
          yup.object().shape({
            variant: yup.string().required("Variant type is required"),
            name: yup.string().required("Variant name is required"),
            price: yup
              .number()
              .required("Variant price is required")
              .positive(),
            salePrice: yup
              .number()
              .required("Variant sale price is required")
              .positive(),
            sku: yup.string().required("Variant SKU is required"),
            stockQuantity: yup
              .number()
              .required("Variant stock quantity is required")
              .min(0),
          }),
        )
        .min(1, "At least one variant is required for variable products"),
  }),
});

export default function CompleteProductForm({
  type,
  shop,
}: {
  type: string;
  shop?: Shop;
}) {
  const router = useRouter();
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //Redux category state
  const categories = useAppSelector((state) => state.categories);
  const categoryOptions = categories.categories?.category || [];
  const subCategoryOptions = categories.categories?.subCategory || [];
  const childCategoryOptions = categories.categories?.childCategory || [];

  //console.log(categoryOptions, "cat name");
  //Redux form

  const dispatch = useAppDispatch();
  //const showForm = useAppSelector((state) => state.showFormReducer.showForm);

  const closeForm = () => {
    dispatch(
      setShowForm({
        showform: {
          show: false,
          type: type,
        },
      }),
    );
  };
  //Fecth data

  const {
    mutate: createProduct,
    isSuccess,
    isPending,
    error,
  } = useVendorCreateProduct();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      slug: "",
      status: "draft",
      type: "simple",
      deliveryType: "physical",
      downloadLink: "",
      demo: "",
      isFeatured: false,
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
      gender: "",
      tags: [],
      sku: "",
      price: 0,
      salePrice: 0,
      stockQuantity: 0,
      width: "",
      length: "",
      height: "",
      variants: [],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const productType = watch("type");
  const deliveryType = watch("deliveryType");
  const status = watch("status");
  const isFeatured = watch("isFeatured");
  const productName = watch("name");
  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subCategory");

  // Auto-generate slug from product name
  React.useEffect(() => {
    if (productName) {
      const slug = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [productName, setValue]);

  const handleImageChange = (files: FileList) => {
    const newImages: ProductImage[] = Array.from(files).map((file: File) => ({
      _id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file: file,
    }));
    setProductImages((prev) => [...prev, ...newImages]);
  };

  //Filter sub and child categories

  const filteredSubCategories = selectedCategory?.id
    ? subCategoryOptions.filter(
        (sub: any) => sub.parentCategory === selectedCategory.id,
      )
    : [];

  const filteredChildCategories = selectedSubCategory?.id
    ? childCategoryOptions.filter(
        (child: any) => child.subCategory === selectedSubCategory.id,
      )
    : [];

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
      handleImageChange(files);
    }
  };

  const handleFileInputChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      handleImageChange(files);
    }
  };

  const handleRemoveImage = (id: string) => {
    setProductImages((prev) => prev?.filter((img) => img._id !== id));
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: any) => {
    // console.log("Form Data:", data);
    // console.log("Images:", productImages);

    // createVendorProduct({
    //   ...data,
    // });
    createProduct({
      ...data,
      category: data.category.id,
      subCategory: data.subCategory.id,
      childCategory: data.childCategory.id,
    });
  };

  // Redirect on success
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push(`/vendor/dashboard/product`);
      }, 1000);
    }
  }, [isSuccess, router]);
  return (
    <div className="mt-5 min-h-screen bg-gray-50 py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        // onSubmit={(handleSubmit(onSubmit), onError)}
        className="mx-auto max-w-7xl px-4"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* General Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                General Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Type product name here..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("slug")}
                    placeholder="product-slug-auto-generated"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.slug && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Type product description here... (max 500 characters)"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Content (Long Description)
                  </label>
                  <textarea
                    {...register("content")}
                    placeholder="Detailed product content..."
                    rows={6}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                SEO Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Meta Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("metaTitle")}
                    placeholder="SEO meta title (max 100 characters)"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.metaTitle && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.metaTitle.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Meta Description
                  </label>
                  <textarea
                    {...register("metaDescription")}
                    placeholder="SEO meta description (max 200 characters)"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.metaDescription && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.metaDescription.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Product Images
              </h2>

              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
                  isDragging
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="mb-4 inline-block rounded-full border-4 border-green-100 bg-green-50 p-3">
                  <ImageOff className="h-6 w-6 text-green-600" />
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  Drag and drop images here, or click add images
                </p>
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
                  className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  Add Images
                </button>
              </div>

              {productImages.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {productImages.map((img) => (
                    <div key={img._id} className="group relative">
                      <img
                        src={img.url}
                        alt="Product"
                        className="h-32 w-full rounded-lg border border-gray-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img._id)}
                        className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Type & Pricing */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Product Type & Pricing
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Product Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        {...register("type")}
                        value="simple"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        Simple Product
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        {...register("type")}
                        value="variable"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        Variable Product
                      </span>
                    </label>
                  </div>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                {productType === "simple" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          SKU <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("sku")}
                          placeholder="Product SKU"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                        />
                        {errors.sku && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.sku.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Stock Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          {...register("stockQuantity")}
                          placeholder="0"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                        />
                        {errors.stockQuantity && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.stockQuantity.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Regular Price <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register("price")}
                          placeholder="0.00"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.price.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Sale Price <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register("salePrice")}
                          placeholder="0.00"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                        />
                        {errors.salePrice && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.salePrice.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {productType === "variable" && (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Product Variants <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          appendVariant({
                            variant: "",
                            name: "",
                            price: 0,
                            salePrice: 0,
                            sku: "",
                            stockQuantity: 0,
                          })
                        }
                        className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Variant
                      </button>
                    </div>

                    {variantFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="mb-4 rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">
                            Variant {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Variant Type
                            </label>
                            <input
                              type="text"
                              {...register(`variants.${index}.variant`)}
                              placeholder="e.g., Size, Color"
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Variant Name
                            </label>
                            <input
                              type="text"
                              {...register(`variants.${index}.name`)}
                              placeholder="e.g., Large, Red"
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              SKU
                            </label>
                            <input
                              type="text"
                              {...register(`variants.${index}.sku`)}
                              placeholder="Variant SKU"
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Stock
                            </label>
                            <input
                              type="number"
                              {...register(`variants.${index}.stockQuantity`)}
                              placeholder="0"
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Price
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              {...register(`variants.${index}.price`)}
                              placeholder="0.00"
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Sale Price
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              {...register(`variants.${index}.salePrice`)}
                              placeholder="0.00"
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {errors.variants && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.variants.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Shipping */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Shipping & Delivery
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Delivery Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        {...register("deliveryType")}
                        value="physical"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        Physical Product
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        {...register("deliveryType")}
                        value="digital"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        Digital Product
                      </span>
                    </label>
                  </div>
                </div>

                {deliveryType === "digital" && productType === "simple" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Download Link <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      {...register("downloadLink")}
                      placeholder="https://example.com/download"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                    {errors.downloadLink && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.downloadLink.message}
                      </p>
                    )}
                  </div>
                )}

                {deliveryType === "physical" && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Width
                      </label>
                      <input
                        type="text"
                        {...register("width")}
                        placeholder="cm"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Length
                      </label>
                      <input
                        type="text"
                        {...register("length")}
                        placeholder="cm"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Height
                      </label>
                      <input
                        type="text"
                        {...register("height")}
                        placeholder="cm"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Demo Link
                  </label>
                  <input
                    type="url"
                    {...register("demo")}
                    placeholder="https://example.com/demo"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.demo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.demo.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Shop(s) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("shop")}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                >
                  {/* <option value="">Select a shop</option> */}
                  <option value={shop?._id}>{shop?.name}</option>
                  {/* <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="food">Food & Beverages</option> */}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
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
                            //console.log(selectedId, "selectedId");
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
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Status</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    status === "published"
                      ? "bg-green-100 text-green-700"
                      : status === "draft"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("status")}
                    className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="pending">Pending Review</option>
                    <option value="published">Published</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex cursor-pointer items-center gap-2"></label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Submit Button */}
        <div className="mt-2 bg-white lg:col-span-3">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:justify-center">
            <div className="ml-auto flex items-center justify-center gap-5 md:gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="flex items-center rounded-lg bg-[#D5E5D6] px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-200"
              >
                <span>
                  <X />
                </span>
                <span> Cancel</span>
              </button>
              <button
                type="submit"
                //onClick={() => console.log("click")}
                disabled={isPending || isSuccess}
                className="flex items-center gap-2 rounded-lg bg-[#2E7D32] px-4 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <span className="flex items-center space-x-0.5">
                    <span>
                      <Plus />
                    </span>
                    <span>Add Product</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

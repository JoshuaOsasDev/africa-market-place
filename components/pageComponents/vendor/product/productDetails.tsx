import Image from "next/image";

import { ImageOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/common/modal";
import EditProduct from "./editProduct";
import { CategoryType, Product } from "@/types/product";
import { calculateProductStatus } from "./productStatus";
import { useAppSelector } from "@/redux/store";

export default function ProductDetails({ product }: { product: Product }) {
  const categories = useAppSelector((state) => state.categories);

  const matchedCategory = categories.categories.category?.find(
    (cat: CategoryType) =>
      cat?.slug === product?.category?.slug ||
      cat?._id === product?.category._id,
  );
  const { completionPercentage } = calculateProductStatus(product);
  return (
    <div className="min-h-screen py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-2 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-2">
          {/* GENERAL INFORMATION */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                General Information
              </h2>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                  Product Name
                </label>
                <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-gray-700">
                  {product.name}
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* MEDIA */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Media
              </h2>

              <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-[#E0E2E7] bg-[#F9F9FC] px-3 py-6">
                <div className="relative h-50 w-full rounded-lg">
                  {product.images?.length > 0 ? (
                    <div className="p-5">
                      {product.images.map((image, i) => (
                        <Image
                          key={i}
                          src={image?.url}
                          className="mx-auto h-48 w-auto rounded-lg object-contain"
                          alt="Product"
                          fill
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto w-fit rounded-full border-4 border-[#EFEFFD] bg-[#EAF2EA] p-3">
                        <ImageOff className="h-6 w-6 text-[#2E7D32]" />
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        No product image uploaded
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PRICE */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Price
              </h2>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                  Base Price
                </label>
                <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-gray-700">
                  ₤{product?.price?.toLocaleString()}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                  Sale Price
                </label>

                {product.salePrice && (
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-gray-700">
                    Sale Price: ₤{product?.salePrice.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Discount Type
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-gray-700 capitalize">
                    {product?.discountType || "—"}
                  </p>
                </div>

                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                    Discount (%)
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-gray-700">
                    {product?.percentage || 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* INVENTORY */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Inventory
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                    SKU
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5">
                    {product?.sku}
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                    Barcode
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5">
                    {product?.barcode || "No barcode"}
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                    Quantity
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5">
                    {product?.stockQuantity}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SHIPPING */}
          <div className="rounded-lg border border-[#E0E2E7] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Shipping
              </h2>

              <div className="mb-4 flex items-center gap-2">
                <div
                  className={`h-5 w-5 rounded border ${
                    product.deliveryType
                      ? "border-green-600 bg-green-600"
                      : "border-gray-400 bg-gray-300"
                  }`}
                ></div>

                <span
                  className={`font-semibold ${
                    product.deliveryType ? "text-[#2E7D32]" : "text-[#4D5464]"
                  }`}
                >
                  This is a physical product
                </span>
              </div>

              <div className="max-w-xs">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Width
                </label>
                <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5">
                  {product?.width || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* CATEGORY */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Category
              </h2>

              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Product Category
                </label>
                <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 capitalize">
                  {matchedCategory.name}
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Product Tags
                </label>
                <div className="rounded-lg bg-[#F9F9FC] px-4 py-2.5">
                  {product?.tags?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-sm bg-[#EAF2EA] px-2 py-1 font-medium text-[#2E7D32]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500">No product tag</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Status</h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {product.status}
                </span>
              </div>

              <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 capitalize">
                {product.status}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="right-0 bottom-0 left-63 border-gray-200 bg-white md:fixed md:border-t md:shadow-lg lg:col-span-3">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-end gap-4 px-4 py-4 md:justify-between">
            <div className="hidden text-sm text-gray-600 md:block">
              <span className="font-medium">StatusProduct Completion:</span>{" "}
              <span
                className={`rounded-full px-3 py-1 ${
                  completionPercentage === 100
                    ? "bg-green-100 text-green-700"
                    : completionPercentage >= 50
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {completionPercentage}%
              </span>
            </div>

            <Button
              type="button"
              className="flex rounded-lg border bg-[#FAFAFA] px-8 py-5 font-semibold text-[#858D9D] transition hover:bg-gray-200 md:hidden"
              onClick={() => console.log("Navigate to edit page")}
            >
              <span>
                <X />
              </span>
              <span>Cancel</span>
            </Button>
            <Button
              type="button"
              className="rounded-lg bg-[#2E7D32] px-8 py-5 font-semibold text-white transition hover:bg-green-700"
              onClick={() => console.log("Navigate to edit page")}
            >
              <Modal>
                <Modal.Open opens="delete-product">
                  <span className="flex items-center gap-1 p-1">
                    Edit Product
                  </span>
                </Modal.Open>

                <Modal.Window
                  name="delete-product"
                  className="top-4.5 my-auto max-w-3xl overflow-y-scroll"
                >
                  <EditProduct existingData={product} />
                </Modal.Window>
              </Modal>
            </Button>
          </div>
        </div>
      </div>

      <div className="md:h-20"></div>
    </div>
  );
}

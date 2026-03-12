"use client";
import React from "react";
import { ChevronDown, ImageOff, X } from "lucide-react";
import Image from "next/image";
import { div, span } from "framer-motion/client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/common/modal";
import DeleteProductModal from "./deleteProductModal";
import EditProduct from "./editProduct";

export default function DisplayProductDetailsPage() {
  // FALLBACK EXAMPLE PRODUCT if none is passed
  const data = {
    productName: "Fresh Organic Carrots",
    sku: "VEG-CR-102",
    price: 4.99,
    productDescription:
      "Crisp, sweet, organic carrots sourced directly from local farms.Crisp, sweet, organic carrots sourced directly from local farms.Crisp, sweet, organic carrots sourced directly from local farms.Crisp, sweet, organic carrots sourced directly from local farms.",
    category: "vegetable",
    tags: [{ vegetable: "vegetable" }, { fruit: "fruit" }],
    status: "Published",
    quantity: "250",
    barcode: "784562901234",
    percentage: 10,
    discountType: "percentage",
    imagePreview: ["/images/tomatoes.png", "/images/tomatoes.png"],
    weight: "1kg",
    checked: true,
  };

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
                  {data.productName}
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 leading-relaxed text-gray-700">
                  {data.productDescription}
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

              <div className="relative flex flex-col items-center justify-center space-y-4 rounded-xl border border-[#E0E2E7] bg-[#F9F9FC] px-3 py-6">
                {data.imagePreview ? (
                  <div className="p-5">
                    {data.imagePreview.map((image, i) => (
                      <Image
                        key={i}
                        src={image}
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
                  ${data.price}
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Discount Type
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-gray-700 capitalize">
                    {data.discountType || "—"}
                  </p>
                </div>

                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                    Discount (%)
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-gray-700">
                    {data.percentage || 0}%
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
                    {data.sku}
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                    Barcode
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5">
                    {data.barcode}
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-[#4D5464]">
                    Quantity
                  </label>
                  <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5">
                    {data.quantity}
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
                    data.checked
                      ? "border-green-600 bg-green-600"
                      : "border-gray-400 bg-gray-300"
                  }`}
                ></div>

                <span
                  className={`font-semibold ${
                    data.checked ? "text-[#2E7D32]" : "text-[#4D5464]"
                  }`}
                >
                  This is a physical product
                </span>
              </div>

              <div className="max-w-xs">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Weight
                </label>
                <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5">
                  {data.weight || "—"}
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
                  {data?.category}
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Product Tags
                </label>
                <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 capitalize">
                  {data.tags.map((p, i) => (
                    <span
                      key={i}
                      className="ml-1 w-fit rounded-sm bg-[#EAF2EA] px-2 py-1 font-medium text-[#2E7D32]"
                    >
                      {p.vegetable} {p.fruit}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Status</h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {data.status}
                </span>
              </div>

              <p className="rounded-lg bg-[#F9F9FC] px-4 py-2.5 capitalize">
                {data.status}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="right-0 bottom-0 left-63 border-gray-200 bg-white md:fixed md:border-t md:shadow-lg lg:col-span-3">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-end gap-4 px-4 py-4 md:justify-between">
            <div className="hidden text-sm text-gray-600 md:block">
              <span className="font-medium">StatusProduct Completion:</span>{" "}
              <span className="rounded-full bg-[#FEEDEC] px-3 py-1 text-[#F04438]">
                0%
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
                  <EditProduct />
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

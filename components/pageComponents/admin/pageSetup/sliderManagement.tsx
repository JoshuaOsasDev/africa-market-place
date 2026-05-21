"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { CldUploadWidget } from "next-cloudinary";
import { useAdminProducts } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { Product } from "@/types/product";
import { useCreateSlider } from "@/lib/hooks/userDashboard/useUser";
type SliderType = {
  productId: string;
  productName: string;
  webImageUrl: string;
  mobileImageUrl: string;
};
const HomepageSliderSettings = () => {
  // State management for the slider fields
  const [sliderData, setSliderData] = useState({
    productId: "",
    productName: "",
    webImageUrl: "",
    mobileImageUrl: "",
  });

  const limit = 100;
  const search = "";
  const status = "";
  const page = 1;
  const { adminProducts } = useAdminProducts(page, limit, search, status);
  const product = adminProducts?.data;
  //console.log(product, "user product");
  const { mutate: createSlider, isPending: onLoad } = useCreateSlider();
  // Generic change handler for text inputs

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSliderData((prev) => ({ ...prev, [name]: value }));
  };

  // Simulated scroll restoration for Cloudinary widget
  const restoreScroll = () => {
    document.body.style.overflow = "auto";
  };

  const handleSliderSubmit = async (e: any) => {
    e.preventDefault();

    createSlider(sliderData, {
      onSuccess: () => {
        setSliderData({
          productId: "",
          productName: "",
          webImageUrl: "",
          mobileImageUrl: "",
        });
      },
    });
    console.log("Submitting Slider Data:", sliderData);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-5xl">
        {/* Image Slider Settings Container */}
        <div className="mb-8 w-full rounded-[10px] border border-[#E6E6E6] bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-[#424242]">
            Homepage Image Slider
          </h1>
          <p className="mb-6 text-[16px] text-[#595959]">
            Upload images that will appear on the homepage slider
          </p>

          <form onSubmit={handleSliderSubmit} className="flex flex-col gap-6">
            {/* Row 1: Product ID and Name */}
            <div className="flex flex-col gap-5 lg:flex-row">
              <label className="w-full sm:w-fit">
                <span className="text-[16px] font-medium text-[#424242]">
                  Product Name
                </span>
                <select
                  name="productId"
                  value={sliderData.productId}
                  onChange={(e) => {
                    const selectedId = e.target.value;

                    const selectedProduct = product.find(
                      (p: Product) => p._id === selectedId,
                    );

                    setSliderData((prev) => ({
                      ...prev,
                      productId: selectedId,
                      productName: selectedProduct?.slug || "",
                    }));
                  }}
                  className="mt-2 w-full rounded-lg border border-[#E0E0E0] px-[14px] py-3 focus:border-[#2E7D32] focus:outline-none"
                >
                  <option value="">Select product</option>

                  {product?.map((p: Product) => (
                    <option value={p._id} key={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Row 2: Image Uploaders */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Web Slider Image Upload */}
              <div className="flex flex-col gap-2">
                <span className="text-[16px] font-medium text-[#424242]">
                  Web Slider Image
                </span>
                <CldUploadWidget
                  uploadPreset="africamarketplace"
                  onSuccess={(result: any) => {
                    restoreScroll();
                    const imageUrl = result.info.secure_url;
                    setSliderData((prev) => ({
                      ...prev,
                      webImageUrl: imageUrl,
                    }));
                  }}
                  options={{
                    showPoweredBy: false,
                    multiple: false,
                    clientAllowedFormats: ["png", "jpg", "jpeg"],
                    folder: "slider-image",
                    maxFileSize: 1 * 1024 * 1024,
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="relative flex h-[180px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-[#2E7D32] bg-[#F9FAFB] transition hover:bg-[#F1F5F9]"
                    >
                      {sliderData.webImageUrl ? (
                        <Image
                          src={sliderData.webImageUrl}
                          alt="web slider preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <>
                          <FiCamera className="text-3xl text-[#2E7D32]" />
                          <p className="px-4 text-center text-sm text-gray-500">
                            Click to upload web slider image <br />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                              Desktop Format
                            </span>
                          </p>
                        </>
                      )}
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              {/* Mobile Slider Image Upload */}
              <div className="flex flex-col gap-2">
                <span className="text-[16px] font-medium text-[#424242]">
                  Mobile Slider Image
                </span>
                <CldUploadWidget
                  uploadPreset="africamarketplace"
                  onSuccess={(result: any) => {
                    restoreScroll();
                    setSliderData((prev) => ({
                      ...prev,
                      mobileImageUrl: result.info.secure_url,
                    }));
                  }}
                  options={{
                    showPoweredBy: false,
                    multiple: false,
                    clientAllowedFormats: ["png", "jpg", "jpeg"],
                    folder: "slider-image",
                    maxFileSize: 1 * 1024 * 1024,
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="relative flex h-[180px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-[#2E7D32] bg-[#F9FAFB] transition hover:bg-[#F1F5F9]"
                    >
                      {sliderData.mobileImageUrl ? (
                        <Image
                          src={sliderData.mobileImageUrl}
                          alt="mobile slider preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <>
                          <FiCamera className="text-3xl text-[#2E7D32]" />
                          <p className="px-4 text-center text-sm text-gray-500">
                            Click to upload mobile slider image <br />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                              Mobile Format
                            </span>
                          </p>
                        </>
                      )}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            {/* Form Footer Action */}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={onLoad}
                className="w-fit cursor-pointer rounded-[27px] bg-[#2E7D32] px-8 py-3 font-medium text-white transition-colors hover:bg-[#256629] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {onLoad ? "Uploading..." : "Upload Slider"}
              </button>
            </div>
          </form>
        </div>

        {/* Final Submission Button */}
        {/* <div className="flex justify-start">
          <button className="rounded-[27px] bg-[#2E7D32] px-10 py-4 text-[16px] font-semibold text-[#EAF2EA] shadow-md transition-all hover:bg-[#256629]">
            Save Changes
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HomepageSliderSettings;

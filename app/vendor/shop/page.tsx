"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Building2,
  MapPin,
  ShieldCheck,
  Loader2,
  Camera,
  Globe,
} from "lucide-react";

import { CreateShopPayload } from "@/types/shop";
import { useVendorCreateShop } from "@/lib/hooks/vendorDashboard/useVendor";
import { HiDocument } from "react-icons/hi2";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { createVendorShop } from "@/services/apiServices/vendorDashboard";

export default function CreateShopPage() {
  const { mutate, isPending } = useVendorCreateShop();
  const themeColor = "#2E7D32";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateShopPayload>({
    defaultValues: {
      address: { country: "Nigeria" },
      commission: 10,
    },
  });

  // Watch fields for real-time updates (slug and image previews)
  const shopName = watch("name");
  const logoUrl = watch("logo.url");
  const proofUrl = watch("identityVerification.proofOfAddress.url");
  const govIdUrl = watch("identityVerification.governmentId.url");

  // Auto-generate slug
  useEffect(() => {
    if (shopName) {
      const slug = shopName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [shopName, setValue]);

  const onSubmit = (data: CreateShopPayload) => {
    console.log(data, "shop");
    mutate(data);
  };

  const inputClasses = `w-full rounded-lg border border-gray-300 p-2.5 outline-none transition focus:border-[${themeColor}] focus:ring-1 focus:ring-[${themeColor}]`;

  // Reusable Upload UI Component to keep the code clean
  const UploadPlaceholder = ({
    url,
    label,
  }: {
    url?: string;
    label: string;
  }) => (
    <div className="relative flex h-32 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-[#F0F0F0] bg-[#FAFAFA] transition-all hover:border-[#2E7D32]/50 hover:bg-[#F0F7F0]">
      {url ? (
        <Image
          src={url}
          alt={label}
          fill
          className="rounded-xl object-cover p-1"
        />
      ) : (
        <>
          <Camera className="text-[#2E7D32]" size={24} />
          <p className="px-2 text-center text-[11px] font-medium text-gray-500">
            {label}
          </p>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Main Form Fields */}
          <div className="space-y-6 lg:col-span-2">
            {/* Section: Basic & Contact */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                <Building2 className="h-5 w-5" style={{ color: themeColor }} />
                Shop Information
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Shop Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className={inputClasses}
                    placeholder="Joshua Gadget Store"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Unique Slug
                  </label>
                  <input
                    {...register("slug")}
                    className={`${inputClasses} bg-gray-50`}
                    disabled
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Shop Email
                  </label>
                  <input
                    type="email"
                    {...register("shopEmail")}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Shop Phone
                  </label>
                  <input
                    type="tel"
                    {...register("shopPhone")}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Section: SEO */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                <Globe className="h-5 w-5" style={{ color: themeColor }} />
                Search Engine Optimization
              </h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Meta Title
                  </label>
                  <input {...register("metaTitle")} className={inputClasses} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Meta Description
                  </label>
                  <textarea
                    {...register("metaDescription")}
                    rows={2}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Section: Address */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                <MapPin className="h-5 w-5" style={{ color: themeColor }} />
                Store Location
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Street Address
                  </label>
                  <input
                    {...register("address.streetAddress")}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    City
                  </label>
                  <input
                    {...register("address.city")}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    State
                  </label>
                  <input
                    {...register("address.state")}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Section: Upload Required Documents */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                <HiDocument className="h-5 w-5" style={{ color: themeColor }} />
                Media & Verification Documents
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* 1. Shop Logo */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Shop Logo
                  </label>
                  <CldUploadWidget
                    uploadPreset="africamarketplace"
                    onSuccess={(result: any) => {
                      setValue("logo.url", result.info.secure_url);
                      setValue("logo._id", result.info.public_id);
                    }}
                    options={{ multiple: false, folder: "shop-logos" }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full"
                      >
                        <UploadPlaceholder
                          url={logoUrl}
                          label="Upload Shop Logo"
                        />
                      </button>
                    )}
                  </CldUploadWidget>
                </div>

                {/* 2. Proof of Address */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Proof of Address
                  </label>
                  <CldUploadWidget
                    uploadPreset="africamarketplace"
                    onSuccess={(result: any) => {
                      setValue(
                        "identityVerification.proofOfAddress.url",
                        result.info.secure_url,
                      );
                      setValue(
                        "identityVerification.proofOfAddress._id",
                        result.info.public_id,
                      ); // Capture the ID
                    }}
                    options={{ multiple: false, folder: "verification" }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full"
                      >
                        <UploadPlaceholder
                          url={proofUrl}
                          label="Utility Bill / Document"
                        />
                      </button>
                    )}
                  </CldUploadWidget>
                </div>

                {/* 3. Government ID */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Government ID
                  </label>
                  <CldUploadWidget
                    uploadPreset="africamarketplace"
                    onSuccess={(result: any) => {
                      setValue(
                        "identityVerification.governmentId.url",
                        result.info.secure_url,
                      );
                      setValue(
                        "identityVerification.governmentId._id",
                        result.info.public_id,
                      ); // Capture the ID
                    }}
                    options={{ multiple: false, folder: "verification" }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full"
                      >
                        <UploadPlaceholder
                          url={govIdUrl}
                          label="NIN / Passport / License"
                        />
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Legal & Submission */}
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <ShieldCheck
                  className="h-5 w-5"
                  style={{ color: themeColor }}
                />
                Legal Details
              </h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    RC Number
                  </label>
                  <input
                    {...register("registrationNumber")}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Tax ID (TIN)
                  </label>
                  <input
                    {...register("taxIdentificationNumber")}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Commission (%)
                  </label>
                  <input
                    type="number"
                    {...register("commission")}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              style={{ backgroundColor: themeColor }}
              className="flex w-full items-center justify-center gap-2 rounded-lg py-4 font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Save & Launch Shop"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

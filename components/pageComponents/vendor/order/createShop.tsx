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

import { CreateShopPayload, Shop } from "@/types/shop";
import { useVendorUpdateShop } from "@/lib/hooks/vendorDashboard/useVendor";
import { HiDocument } from "react-icons/hi2";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

export default function ShopFormPage({ shop }: { shop?: Shop }) {
  const { mutate: updateShop, isPending } = useVendorUpdateShop(shop?.slug);
  const themeColor = "#2E7D32";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateShopPayload>({
    defaultValues: {
      address: { country: "Nigeria" },
      commission: 10,
    },
  });

  // Watch for preview
  const shopName = watch("name");
  const logoUrl = watch("logo.url");
  const proofUrl = watch("identityVerification.proofOfAddress.url");
  const govIdUrl = watch("identityVerification.governmentId.url");

  //  Auto-generate slug (only in create mode)
  useEffect(() => {
    if (shopName && !shop) {
      const slug = shopName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [shopName, setValue, shop]);

  //  Populate form for edit
  useEffect(() => {
    if (shop) {
      reset({
        name: shop.name,
        slug: shop.slug,
        shopEmail: shop.shopEmail,
        shopPhone: shop.shopPhone,
        description: shop.description,
        metaTitle: shop.metaTitle,
        metaDescription: shop.metaDescription || "",
        registrationNumber: shop.registrationNumber,
        taxIdentificationNumber: shop.taxIdentificationNumber,
        commission: shop.commission,
        address: {
          streetAddress: shop.address.streetAddress,
          city: shop.address.city,
          state: shop.address.state,
          country: shop.address.country,
        },
        logo: shop.logo || undefined,
        identityVerification: {
          proofOfAddress:
            shop.identityVerification?.proofOfAddress || undefined,
          governmentId: shop.identityVerification?.governmentId || undefined,
        },
      });
    }
  }, [shop, reset]);

  const onSubmit = (data: CreateShopPayload) => {
    if (shop?._id) {
      console.log("Updating shop...", data);
      updateShop(data); // replace with update API if available
    }
  };

  const inputClasses = `w-full rounded-lg border border-gray-300 p-2.5 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600`;

  const UploadPlaceholder = ({
    url,
    label,
  }: {
    url?: string;
    label: string;
  }) => (
    <div className="relative flex h-32 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-[#F0F0F0] bg-[#FAFAFA] hover:border-green-400 hover:bg-green-50">
      {url ? (
        <Image
          src={url}
          alt={label}
          fill
          className="rounded-xl object-cover p-1"
        />
      ) : (
        <>
          <Camera className="text-green-600" size={24} />
          <p className="px-2 text-center text-[11px] text-gray-500">{label}</p>
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
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {/* SHOP INFO */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
                <Building2 className="text-green-600" /> Shop Info
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-gray-600">Name</label>
                  <input
                    {...register("name")}
                    placeholder="Shop Name"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="text-gray-600">Slug</label>
                  <input
                    {...register("slug")}
                    disabled
                    className={`${inputClasses} bg-gray-100`}
                  />
                </div>
                <div>
                  <label className="text-gray-600">Shop Email</label>
                  <input
                    {...register("shopEmail")}
                    disabled
                    placeholder="Email"
                    className={`${inputClasses} disabled:cursor-not-allowed`}
                  />
                </div>
                <div>
                  <label className="text-gray-600">Phone No.</label>
                  <input
                    {...register("shopPhone")}
                    placeholder="Phone"
                    className={inputClasses}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-600 md:col-span-3">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className={`${inputClasses} `}
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
                <Globe className="text-green-600" /> SEO
              </h2>

              <div className="flex flex-col space-y-3">
                <div>
                  <label className="text-gray-600">MetaTitle</label>
                  <input
                    {...register("metaTitle")}
                    placeholder="Meta Title"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="text-gray-600">Meta Description</label>
                  <textarea
                    {...register("metaDescription")}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
                <MapPin className="text-green-600" /> Address
              </h2>
              <div className="flex flex-col space-y-3">
                <div>
                  <label className="text-gray-600">Street Address</label>
                  <input
                    {...register("address.streetAddress")}
                    placeholder="Street"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="text-gray-600">City</label>
                  <input
                    {...register("address.city")}
                    placeholder="City"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="text-gray-600">State</label>
                  <input
                    {...register("address.state")}
                    placeholder="State"
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* UPLOADS */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
                <HiDocument className="text-green-600" /> Documents
              </h2>

              <div className="grid grid-cols-3 gap-4">
                {/* LOGO */}
                <div className="flex flex-col">
                  <label className="text-gray-600">Logo</label>
                  <CldUploadWidget
                    uploadPreset="africamarketplace"
                    onSuccess={(r: any) => {
                      setValue("logo.url", r.info.secure_url);
                      setValue("logo._id", r.info.public_id);
                    }}
                  >
                    {({ open }) => (
                      <button type="button" onClick={() => open()}>
                        <UploadPlaceholder url={logoUrl} label="Logo" />
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
                {/* PROOF */}
                <div className="flex flex-col">
                  <label className="text-gray-600">Proof</label>
                  <CldUploadWidget
                    uploadPreset="africamarketplace"
                    onSuccess={(r: any) => {
                      setValue(
                        "identityVerification.proofOfAddress.url",
                        r.info.secure_url,
                      );
                      setValue(
                        "identityVerification.proofOfAddress._id",
                        r.info.public_id,
                      );
                    }}
                  >
                    {({ open }) => (
                      <button type="button" onClick={() => open()}>
                        <UploadPlaceholder url={proofUrl} label="Proof" />
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
                {/* GOV ID */}
                <div className="flex flex-col">
                  <label className="text-gray-600">Govt ID</label>
                  <CldUploadWidget
                    uploadPreset="africamarketplace"
                    onSuccess={(r: any) => {
                      setValue(
                        "identityVerification.governmentId.url",
                        r.info.secure_url,
                      );
                      setValue(
                        "identityVerification.governmentId._id",
                        r.info.public_id,
                      );
                    }}
                  >
                    {({ open }) => (
                      <button type="button" onClick={() => open()}>
                        <UploadPlaceholder url={govIdUrl} label="ID" />
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
                <ShieldCheck className="text-green-600" /> Legal
              </h2>
              <div className="flex flex-col space-y-2">
                <div className="">
                  <label className="text-gray-600">RC No.</label>
                  <input
                    {...register("registrationNumber")}
                    placeholder="RC Number"
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600">Tax ID No.</label>
                  <input
                    {...register("taxIdentificationNumber")}
                    placeholder="TIN"
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600">Commission</label>
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
              className="w-full rounded-lg bg-green-700 py-4 font-bold text-white"
            >
              {isPending ? (
                <Loader2 className="mx-auto animate-spin" />
              ) : shop ? (
                "Update Shop"
              ) : (
                "Create Shop"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

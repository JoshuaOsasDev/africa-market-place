"use client";
import React, { useRef, useState } from "react";
import { ChevronDown, ImageOff, X, Plus, Upload } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useVendorCreateShop } from "@/lib/hooks/vendorDashboard/useVendor";
import { Shop, ShopFormInput } from "@/types/shop";
import { setShowForm } from "@/redux/slices/showFormSlice";
import { useAppDispatch } from "@/redux/store";

// Add this interface definition
type ImageState = {
  _id: string;
  url: string;
  file: File;
};

type UploadFile = {
  _id: string;
  url: string;
  file: File;
};

type ProofOfFile = {
  _id: string;
  url: string;
  file: File;
};

type GovernmentID = { _id: string; url: string; file: File };
// Shop validation schema
const shopSchema = yup.object().shape({
  name: yup
    .string()
    .required("Shop name is required")
    .max(100, "Name cannot exceed 100 characters"),
  slug: yup.string().required("Slug is required"),
  shopEmail: yup
    .string()
    .email("Invalid email address")
    .required("Shop email is required"),
  shopPhone: yup.string().required("Shop phone is required"),
  description: yup
    .string()
    .required("Description is required")
    .max(500, "Description cannot exceed 500 characters"),
  registrationNumber: yup.string().required("Registration number is required"),
  taxIdentificationNumber: yup
    .string()
    .required("Tax identification number is required"),
  metaTitle: yup
    .string()
    .required("Meta title is required")
    .max(100, "Meta title cannot exceed 100 characters"),
  metaDescription: yup
    .string()
    .max(200, "Meta description cannot exceed 200 characters"),
  commission: yup
    .number()
    .required("Commission is required")
    .min(0, "Commission must be at least 0")
    .max(100, "Commission cannot exceed 100"),
  address: yup.object({
    streetAddress: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
  }),
});

// Helper function to generate unique ID
const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export default function CreateShop({ type }: { type: string }) {
  const [logoImage, setLogoImage] = useState<UploadFile | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<ProofOfFile | null>(
    null,
  );
  const [governmentId, setGovernmentId] = useState<GovernmentID | null>(null);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingProof, setIsDraggingProof] = useState(false);
  const [isDraggingId, setIsDraggingId] = useState(false);

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const proofInputRef = useRef<HTMLInputElement | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  //Calling Query Hook

  const {
    mutate: createShop,
    isPending,
    isSuccess,
    error,
  } = useVendorCreateShop();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shopSchema),
    defaultValues: {
      name: "",
      slug: "",
      shopEmail: "",
      shopPhone: "",
      description: "",
      registrationNumber: "",
      taxIdentificationNumber: "",
      metaTitle: "",
      metaDescription: "",
      commission: 0,
      address: {
        streetAddress: "",
        city: "",
        state: "",
        country: "Nigeria",
      },
    },
  });

  const shopName = watch("name");

  // Auto-generate slug from shop name
  React.useEffect(() => {
    if (shopName) {
      const slug = shopName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [shopName, setValue]);

  const handleImageChange = ({
    file,
    setter,
  }: {
    file: File;
    setter: React.Dispatch<React.SetStateAction<ImageState | null>>;
  }) => {
    if (file) {
      setter({
        _id: generateId(),
        url: URL.createObjectURL(file),
        file: file,
      });
    }
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setter(true);
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setter(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    imageSetter: React.Dispatch<React.SetStateAction<ImageState | null>>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setter(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange({ file, setter: imageSetter }); // Call with object
    }
  };

  // const closeForm = () => {
  //   console.log("close");
  //   setShowFormNoOrder?.(false);
  // };

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
  const onSubmit = (data: ShopFormInput) => {
    // Prepare the payload with image data including _id
    const payload = {
      ...data,
      logo: logoImage
        ? {
            _id: logoImage?._id,
            url: logoImage?.url,
            file: logoImage?.file,
          }
        : null,
      identityVerification: {
        proofOfAddress: proofOfAddress
          ? {
              _id: proofOfAddress._id,
              url: proofOfAddress.url,
              file: proofOfAddress.file,
            }
          : null,
        governmentId: governmentId
          ? {
              _id: governmentId._id,
              url: governmentId.url,
              file: governmentId.file,
            }
          : null,
      },
    };

    // console.log("Form Data:", payload);
    // console.log("Logo ID:", logoImage?._id);
    // console.log("Proof of Address ID:", proofOfAddress?._id);
    // console.log("Government ID ID:", governmentId?._id);

    createShop(payload);
  };

  return (
    <div className="mt-5 min-h-screen bg-gray-50 py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
                    Shop Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Type shop name here..."
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
                    placeholder="shop-slug-auto-generated"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.slug && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Shop Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("shopEmail")}
                      placeholder="shop@example.com"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                    {errors.shopEmail && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.shopEmail.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Shop Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register("shopPhone")}
                      placeholder="08012345678"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                    {errors.shopPhone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.shopPhone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Type shop description here... (max 500 characters)"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Business Information
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Registration Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("registrationNumber")}
                      placeholder="RC12345678"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                    {errors.registrationNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.registrationNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tax Identification Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("taxIdentificationNumber")}
                      placeholder="TIN1234567"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                    {errors.taxIdentificationNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.taxIdentificationNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Commission (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("commission")}
                    placeholder="10"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.commission && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.commission.message}
                    </p>
                  )}
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

            {/* Address */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Address
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("address.streetAddress")}
                    placeholder="12 Airport Road"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  />
                  {errors.address?.streetAddress && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address.streetAddress.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("address.city")}
                      placeholder="Benin City"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                    {errors.address?.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("address.state")}
                      placeholder="Edo"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                    {errors.address?.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      {...register("address.country")}
                      className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.address?.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Identity Verification */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Identity Verification
              </h2>

              <div className="space-y-6">
                {/* Proof of Address */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Proof of Address <span className="text-red-500">*</span>
                  </label>
                  <div
                    onDragEnter={(e) => handleDragEnter(e, setIsDraggingProof)}
                    onDragOver={handleDragOver}
                    onDragLeave={(e) => handleDragLeave(e, setIsDraggingProof)}
                    onDrop={(e) =>
                      handleDrop(e, setIsDraggingProof, setProofOfAddress)
                    }
                    className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
                      isDraggingProof
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  >
                    {proofOfAddress ? (
                      <div className="relative">
                        <img
                          src={proofOfAddress.url}
                          alt="Proof of Address"
                          className="mx-auto h-32 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setProofOfAddress(null)}
                          className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <p className="mt-2 text-xs text-gray-500">
                          ID: {proofOfAddress._id}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 inline-block rounded-full border-4 border-green-100 bg-green-50 p-3">
                          <Upload className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="mb-4 text-sm text-gray-600">
                          Drag and drop proof of address or click to upload
                        </p>
                        <input
                          ref={proofInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            const address = setProofOfAddress;
                            if (!file || !address) return;
                            handleImageChange({ file, setter: address });
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => proofInputRef.current?.click()}
                          className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                          Upload Document
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Government ID */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Government ID <span className="text-red-500">*</span>
                  </label>
                  <div
                    onDragEnter={(e) => handleDragEnter(e, setIsDraggingId)}
                    onDragOver={handleDragOver}
                    onDragLeave={(e) => handleDragLeave(e, setIsDraggingId)}
                    onDrop={(e) =>
                      handleDrop(e, setIsDraggingId, setGovernmentId)
                    }
                    className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
                      isDraggingId
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  >
                    {governmentId ? (
                      <div className="relative">
                        <img
                          src={governmentId.url}
                          alt="Government ID"
                          className="mx-auto h-32 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setGovernmentId(null)}
                          className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <p className="mt-2 text-xs text-gray-500">
                          ID: {governmentId._id}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 inline-block rounded-full border-4 border-green-100 bg-green-50 p-3">
                          <Upload className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="mb-4 text-sm text-gray-600">
                          Drag and drop government ID or click to upload
                        </p>
                        <input
                          ref={idInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            const governmentId = setGovernmentId;

                            if (!file || !governmentId) return;
                            handleImageChange({
                              file,
                              setter: setProofOfAddress,
                            });
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => idInputRef.current?.click()}
                          className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                          Upload Document
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Shop Logo */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Shop Logo
              </h2>

              <div
                onDragEnter={(e) => handleDragEnter(e, setIsDraggingLogo)}
                onDragOver={handleDragOver}
                onDragLeave={(e) => handleDragLeave(e, setIsDraggingLogo)}
                onDrop={(e) => handleDrop(e, setIsDraggingLogo, setLogoImage)}
                className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
                  isDraggingLogo
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                {logoImage ? (
                  <div className="relative">
                    <img
                      src={logoImage?.url}
                      alt="Shop Logo"
                      className="mx-auto h-32 w-32 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setLogoImage(null)}
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                      ID: {logoImage._id}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 inline-block rounded-full border-4 border-green-100 bg-green-50 p-3">
                      <ImageOff className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="mb-4 text-sm text-gray-600">
                      Drag and drop logo or click to upload
                    </p>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        const Logo = setLogoImage;
                        if (!file || !Logo) return;

                        handleImageChange({ file, setter: setLogoImage });
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    >
                      Upload Logo
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Submit Button */}
        <div className="mt-2 bg-white lg:col-span-3">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:justify-center">
            <div className="ml-auto flex items-center justify-center gap-5 md:gap-3">
              <button
                onClick={closeForm}
                type="button"
                className="flex items-center rounded-lg bg-[#D5E5D6] px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-200"
              >
                <span>
                  <X />
                </span>
                <span> Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isPending || isSuccess}
                className="flex items-center gap-2 rounded-lg bg-[#2E7D32] px-4 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-2">
                    <span>✓</span>
                    Created
                  </span>
                ) : (
                  <span className="flex items-center space-x-0.5">
                    <span>
                      <Plus />
                    </span>
                    <span>Create Shop</span>
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

"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Store,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import {
  useAdminShop,
  useAdminShopApproval,
} from "@/lib/hooks/adminDashboardApi/useAdmin";
import Loader from "@/components/common/loader";
import { format } from "date-fns";

interface VendorDetailsProps {
  vendor: {
    name: string;
    userType: string;
    dateJoined: string;
    status: "active" | "inactive";
    profileImage: string;
    email: string;
    phone: string;
    gender: string;
    businessInfo: {
      businessName: string;
      businessType: string;
      email: string;
      phoneNumber: string;
    };
    businessAddress: {
      address: string;
      state: string;
      city: string;
      fullAddress: string;
    };
    shopDetails: {
      governmentId: {
        url: string;
        type: string;
        verified: boolean;
      };
      proofOfAddress: {
        url: string;
        type: string;
        verified: boolean;
      };
      businessLicense: {
        url: string;
        type: string;
        verified: boolean;
      };
      taxCertificate?: {
        url: string;
        type: string;
        verified: boolean;
      };
    };
  };
  //   onApprove?: () => void;
  //   onReject?: () => void;
}

export default function ShopSlugPage({ shop }: { shop: string }) {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const { adminShop, isLoading: isLoadingShop } = useAdminShop(shop);
  const shopData = adminShop?.data;
  const { mutate: updateShop, isPending: isPendingShop } =
    useAdminShopApproval();

  // console.log(shopData, "shop");
  const openDocument = (url: string) => {
    window.open(url, "_blank");
  };

  const downloadDocument = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  const handleApproveProduct = async (slug: string, details: string) => {
    console.log(details, "details");
    if (details === "approved") {
      updateShop({ slug, details });
    }

    if (details === "rejected") {
      updateShop({ slug, details });
    }
  };
  if (isLoadingShop) return <Loader />;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            {/* Profile Section */}
            <div className="flex gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={shopData.logo.url}
                  alt={shopData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#333843]">
                  {shopData.name}
                </h1>
                <p className="text-sm text-[#667085]">{shopData.description}</p>
                <p className="text-sm text-[#667085]">
                  Date Joined: {format(shopData.createdAt, "dd-MM-yyyy")}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-[#667085]">Status:</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      shopData.status === "approved"
                        ? "bg-[#D4EDDA] text-[#155724]"
                        : "bg-[#F8D7DA] text-[#721C24]"
                    }`}
                  >
                    {shopData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                disabled={isPendingShop}
                onClick={() => handleApproveProduct(shopData.slug, "approved")}
                className="cursor-pointer rounded-lg bg-[#2E7D32] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#266028] disabled:cursor-not-allowed"
              >
                Approve
              </button>
              <button
                disabled={isPendingShop}
                onClick={() => handleApproveProduct(shopData.slug, "rejected")}
                className="rounded-lg bg-[#FF4733] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#E63E2C] disabled:cursor-not-allowed"
              >
                Reject
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column - Basic & Business Information */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[#333843]">
                Basic Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-[#667085]" />
                  <span className="text-[#667085]">{shopData.shopPhone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-[#667085]" />
                  <span className="text-[#667085]">{shopData.shopEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-[#667085]" />
                  <span className="text-[#667085]">{shopData?.gender}</span>
                </div>
              </div>
            </div>

            {/* Business Information */}
            {/* <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[#333843]">
                Business Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#667085]">Business Name</p>
                  <p className="text-sm font-medium text-[#333843]">
                    {vendor?.businessInfo?.businessName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#667085]">Business Type</p>
                  <p className="text-sm font-medium text-[#333843]">
                    {vendor?.businessInfo?.businessType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#667085]">Email</p>
                  <p className="text-sm font-medium text-[#333843]">
                    {vendor?.businessInfo?.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#667085]">Phone Number</p>
                  <p className="text-sm font-medium text-[#333843]">
                    {vendor?.businessInfo?.phoneNumber}
                  </p>
                </div>
              </div>
            </div> */}

            {/* Business Address */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[#333843]">
                Business Address
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#667085]">Business Address</p>
                  <p className="text-sm font-medium text-[#333843]">
                    {shopData.address.streetAddress}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#667085]">State</p>
                  <p className="text-sm font-medium text-[#333843]">
                    {shopData?.address?.state}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#667085]">City</p>
                  <p className="text-sm font-medium text-[#333843]">
                    {shopData?.address?.city}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#667085]">Country</p>
                  <p className="text-sm font-medium text-[#333843]">
                    {shopData?.address?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Shop Details/Documents */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-[#333843]">
              Shop Details & Verification Documents
            </h2>

            <div className="space-y-6">
              {/* Government ID */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#EAF2EA] p-2">
                      <FileText className="h-5 w-5 text-[#2E7D32]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#333843]">
                        Government ID
                      </h3>
                      <p className="text-xs text-[#667085]">
                        {shopData?.registrationNumber}
                      </p>
                    </div>
                  </div>
                  {shopData?.identityVerification.governmentId.url && (
                    <span className="inline-flex items-center rounded-full bg-[#D4EDDA] px-2.5 py-0.5 text-xs font-medium text-[#155724]">
                      Verified
                    </span>
                  )}
                </div>
                <div className="relative mb-3 h-40 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={shopData?.identityVerification.governmentId.url}
                    alt="Government ID"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      openDocument(
                        shopData?.identityVerification.governmentId.url,
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#667085] transition hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() =>
                      downloadDocument(
                        shopData?.identityVerification.governmentId.url,
                        "government-id.pdf",
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#667085] transition hover:bg-gray-50"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Proof of Address */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#FFF3CD] p-2">
                      <MapPin className="h-5 w-5 text-[#856404]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#333843]">
                        Proof of Address
                      </h3>
                      <p className="text-xs text-[#667085]">
                        {shopData?.address.streetAddress +
                          " " +
                          shopData?.address.city}
                      </p>
                    </div>
                  </div>
                  {shopData?.identityVerification?.proofOfAddress.url && (
                    <span className="inline-flex items-center rounded-full bg-[#D4EDDA] px-2.5 py-0.5 text-xs font-medium text-[#155724]">
                      Verified
                    </span>
                  )}
                </div>
                <div className="relative mb-3 h-40 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={shopData?.identityVerification?.proofOfAddress.url}
                    alt="Proof of Address"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      openDocument(
                        shopData?.identityVerification?.proofOfAddress.url,
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#667085] transition hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() =>
                      downloadDocument(
                        shopData?.identityVerification?.proofOfAddress.url,
                        "proof-of-address.pdf",
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#667085] transition hover:bg-gray-50"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Business License */}
              {/* <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#E3F2FD] p-2">
                      <Store className="h-5 w-5 text-[#1976D2]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#333843]">
                        Business License
                      </h3>
                      <p className="text-xs text-[#667085]">
                        {vendor.shopDetails.businessLicense.type}
                      </p>
                    </div>
                  </div>
                  {vendor.shopDetails.businessLicense.verified && (
                    <span className="inline-flex items-center rounded-full bg-[#D4EDDA] px-2.5 py-0.5 text-xs font-medium text-[#155724]">
                      Verified
                    </span>
                  )}
                </div>
                <div className="relative mb-3 h-40 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={vendor.shopDetails.businessLicense.url}
                    alt="Business License"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      openDocument(vendor.shopDetails.businessLicense.url)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#667085] transition hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() =>
                      downloadDocument(
                        vendor.shopDetails.businessLicense.url,
                        "business-license.pdf",
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#667085] transition hover:bg-gray-50"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div> */}

              {/* Tax Certificate (Optional) */}
              {/* {vendor.shopDetails.taxCertificate && (
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#F3E5F5] p-2">
                        <FileText className="h-5 w-5 text-[#7B1FA2]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#333843]">
                          Tax Certificate
                        </h3>
                        <p className="text-xs text-[#667085]">
                          {vendor.shopDetails.taxCertificate.type}
                        </p>
                      </div>
                    </div>
                    {vendor.shopDetails.taxCertificate.verified && (
                      <span className="inline-flex items-center rounded-full bg-[#D4EDDA] px-2.5 py-0.5 text-xs font-medium text-[#155724]">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="relative mb-3 h-40 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={vendor.shopDetails.taxCertificate.url}
                      alt="Tax Certificate"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        openDocument(vendor.shopDetails.taxCertificate!.url)
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#667085] transition hover:bg-gray-50"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </button>
                    <button
                      onClick={() =>
                        downloadDocument(
                          vendor.shopDetails.taxCertificate!.url,
                          "tax-certificate.pdf",
                        )
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#667085] transition hover:bg-gray-50"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

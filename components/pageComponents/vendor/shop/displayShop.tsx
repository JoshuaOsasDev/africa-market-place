"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  Globe,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Package,
  TrendingUp,
} from "lucide-react";
import { Shop } from "@/types/shop";

type DisplayShopProps = {
  shop: Shop;
  onEdit?: () => void;
  onDelete?: () => void;
};

// Status types
export type ShopStatus = "approved" | "pending" | "suspended" | "inactive";

// Status configurations with colors and icons
type StatusConfig = {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  icon?: string;
  description?: string;
};

// Shop Status Configurations
const shopStatusConfig: Record<ShopStatus, StatusConfig> = {
  approved: {
    label: "Approved",
    color: "green",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    icon: "✓",
    description: "Shop is active and operational",
  },
  pending: {
    label: "Pending",
    color: "yellow",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
    icon: "⏱",
    description: "Shop is awaiting verification",
  },
  suspended: {
    label: "Suspended",
    color: "red",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    icon: "⚠",
    description: "Shop has been temporarily suspended",
  },
  inactive: {
    label: "Inactive",
    color: "gray",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
    borderColor: "border-gray-200",
    icon: "○",
    description: "Shop is not currently active",
  },
};

//Shop Status function
export function getShopStatus(status: ShopStatus): StatusConfig {
  return shopStatusConfig[status] || shopStatusConfig.inactive;
}

export default function DisplayShop({
  shop,
  onEdit,
  onDelete,
}: DisplayShopProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete?.();
    setShowDeleteModal(false);
  };

  // Get status configuration
  const statusConfig = getShopStatus(shop?.status as ShopStatus);

  console.log(shop, "shop");

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {/* Shop Logo */}
              <div className="h-24 w-24 overflow-hidden rounded-lg border-2 border-gray-200">
                {shop?.logo?.url ? (
                  <img
                    src={shop.logo.url}
                    alt={shop.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <Building2 className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Shop Info */}
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {shop?.name}
                  </h1>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                  >
                    {statusConfig.icon} {statusConfig.label}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-600">
                  Slug: <span className="font-mono">/{shop.slug}</span>
                </p>
                <p className="max-w-2xl text-sm text-gray-700">
                  {shop?.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <a
                      href={`mailto:${shop.shopEmail}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      {shop.shopEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a
                      href={`tel:${shop.shopPhone}`}
                      className="text-sm font-medium text-gray-900"
                    >
                      {shop.shopPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Address
              </h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {shop.address?.streetAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shop.address?.city}, {shop.address?.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shop?.address?.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Business Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      Registration Number
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {shop.registrationNumber}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      Tax Identification Number
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {shop.taxIdentificationNumber}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Commission Rate</p>
                  <p className="text-sm font-medium text-gray-900">
                    {shop.commission}%
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                SEO Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                    <Globe className="h-4 w-4" />
                    Meta Title
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {shop.metaTitle}
                  </p>
                </div>
                {shop.metaDescription && (
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      Meta Description
                    </p>
                    <p className="text-sm text-gray-700">
                      {shop.metaDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Identity Verification */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Identity Verification
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Proof of Address */}
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-700">
                    Proof of Address
                  </p>
                  {shop.identityVerification?.proofOfAddress?.url ? (
                    <div className="group relative overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={shop.identityVerification.proofOfAddress.url}
                        alt="Proof of Address"
                        className="h-32 w-full object-cover"
                      />
                      <div className="bg-opacity-0 group-hover:bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black transition">
                        <CheckCircle className="h-8 w-8 text-white opacity-0 transition group-hover:opacity-100" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      <XCircle className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Government ID */}
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-700">
                    Government ID
                  </p>
                  {shop.identityVerification?.governmentId?.url ? (
                    <div className="group relative overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={shop.identityVerification.governmentId.url}
                        alt="Government ID"
                        className="h-32 w-full object-cover"
                      />
                      <div className="bg-opacity-0 group-hover:bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black transition">
                        <CheckCircle className="h-8 w-8 text-white opacity-0 transition group-hover:opacity-100" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      <XCircle className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Total Products
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {shop?.products?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Total Orders</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">0</span>
                </div>
              </div>
            </div>

            {/* Shop Status */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Shop Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                  >
                    {statusConfig.icon} {statusConfig.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verified</span>
                  {shop?.status === "approved" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                {shop.createdAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(shop.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {shop.updatedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(shop.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  View Products
                </button>
                <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  View Orders
                </button>
                <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  Manage Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Shop
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <p className="mb-6 text-sm text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{shop.name}</span>? All associated
              products and data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete Shop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import Menus from "@/components/common/Menus";
import Modal from "@/components/common/Modal";
import ReusableTable from "@/components/common/reusableTable";
import { BadgeCheck, Ban, Eye } from "lucide-react";
import { useState } from "react";
import DeleteProductModal from "../../vendor/product/DeleteProductModal";
import { useAdminShopApproval } from "@/lib/hooks/adminDashboardApi/useAdmin";
import Image from "next/image";
import SkeletonTable from "@/components/common/skeletonTable";
import { capitalize } from "lodash";
import Link from "next/link";

export const getStatusStyles = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-[#FFF3CD] text-[#856404]";
    case "approved":
      return "bg-[#D4EDDA] text-[#155724]";
    case "declined":
      return "bg-[#F8D7DA] text-[#721C24]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ShopsDetails({
  adminShop,
  isLoadingShop,
}: {
  adminShop: any;
  isLoadingShop: boolean;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { mutate: updateShop, isPending } = useAdminShopApproval();

  const products = adminShop;

  const handleApproveProduct = async (slug: string, details: string) => {
    if (details === "pending") {
      updateShop({ slug, details });
    }

    if (details === "approved") {
      updateShop({ slug, details });
    }
  };

  if (isLoadingShop) return <SkeletonTable />;

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg bg-white">
        <ReusableTable
          order="asc"
          data={products}
          columns={[
            {
              label: "Shops Name",
              renderCell: (item) => (
                <span className="font-medium text-[#333843]">{item?.name}</span>
              ),
            },
            {
              label: "Vendor",
              renderCell: (item) => (
                <div className="flex space-x-2.5">
                  {item.vendor.cover ? (
                    <div className="relative h-10 w-10 rounded-full bg-gray-400 font-medium">
                      <Image
                        src={item.vendor.cover?.url}
                        alt={item.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-400 p-5 font-medium">
                      <p className="rounded-full p-5"></p>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-[#667085]">
                      {capitalize(item.vendor.lastName) +
                        " " +
                        capitalize(item.vendor.firstName)}
                    </span>
                    {/* <button className="text-[#667085] hover:text-[#333843]">
                      <Copy size={14} />
                    </button> */}
                  </div>
                </div>
              ),
            },
            {
              label: "Rating",
              renderCell: (item) => (
                <span className="text-[#667085]">
                  {item.rating <= 0 ? "No rating" : item.rating}
                </span>
              ),
            },
            {
              label: "Status",
              renderCell: (item) => (
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusStyles(
                    item.status,
                  )}`}
                >
                  {item.status}
                </span>
              ),
            },
            {
              label: "Action",
              renderCell: (item) => (
                <div className="flex items-center justify-center">
                  <Modal>
                    <Menus>
                      <Menus.Menu>
                        <Menus.Toggle id={item.id} />
                        <Menus.List id={item.id}>
                          {/* Approve - Direct action */}
                          <Menus.Button
                            icon={
                              <div className="rounded-full bg-[#EAF2EA] p-2">
                                <BadgeCheck
                                  className="text-[#2E7D32]"
                                  size={16}
                                />
                              </div>
                            }
                            onClick={() =>
                              handleApproveProduct(item.slug, "approved")
                            }
                          >
                            Approve Shop
                          </Menus.Button>

                          {/* Preview */}
                          <Menus.Button
                            icon={
                              <div className="rounded-full bg-[#FEECC0] p-2">
                                <Eye className="text-[#FCCD57]" size={16} />
                              </div>
                            }
                            // onClick={() =>
                            //   `/admin/dashboard/shops/${item.slug}`
                            // }
                          >
                            <Link href={`/admin/dashboard/shops/${item.slug}`}>
                              Preview Shop
                            </Link>
                          </Menus.Button>

                          {/* Reject - Opens confirmation modal */}
                          <Modal.Open opens={`reject-${item.id}`}>
                            <Menus.Button
                              icon={
                                <div className="rounded-full bg-[#FFE8E5] p-2">
                                  <Ban className="text-[#FF4733]" size={16} />
                                </div>
                              }
                            >
                              Reject Shop
                            </Menus.Button>
                          </Modal.Open>
                        </Menus.List>

                        {/* Rejection Confirmation Modal */}
                        <Modal.Window
                          name={`reject-${item.id}`}
                          className="max-w-md"
                        >
                          <DeleteProductModal
                            text={`Are you sure you want to reject "${item.name}"?`}
                            productName="Product Rejection"
                            onConfirm={() =>
                              handleApproveProduct(item.slug, "pending")
                            }
                          />
                        </Modal.Window>
                      </Menus.Menu>
                    </Menus>
                  </Modal>
                </div>
              ),
            },
          ]}
          columnsStyle="80px 1fr 1fr 150px 150px 100px"
          itemsPerPage={10}
          onSelectChange={(selectedIds) =>
            setSelectedIds(selectedIds as string[])
          }
        />
      </div>
    </div>
  );
}

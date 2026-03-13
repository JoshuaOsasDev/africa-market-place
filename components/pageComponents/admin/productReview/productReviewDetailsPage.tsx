"use client";
import Menus from "@/components/common/menus";
import Modal from "@/components/common/modal";
import ReusableTable from "@/components/common/reusableTable";
import { BadgeCheck, Ban, Eye } from "lucide-react";
import { useState } from "react";
import DeleteProductModal from "@/components/pageComponents/vendor/product/deleteProductModal";
import { useAdminProductApproval } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { format } from "date-fns";
import Image from "next/image";
import SkeletonTable from "@/components/common/skeletonTable";
import { ProductReview } from "@/types/product";
import ProductReviewModal from "./productReviewModal";

export default function ProductReviewDetailsPage({
  adminProducts,
  isLoadingAdmin,
  total,
}: {
  adminProducts: ProductReview[];
  isLoadingAdmin: boolean;
  total: number;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { mutate: approveProduct } = useAdminProductApproval();

  const products = adminProducts;

  // Mock payout data

  // Status badge styles
  const getStatusStyles = (status: string) => {
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

  if (isLoadingAdmin) return <SkeletonTable />;

  const handleApproveProduct = async (slug: string, details: string) => {
    if (details === "pending") {
      approveProduct({ slug, details });
    }

    if (details === "published") {
      approveProduct({ slug, details });
    }
  };
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg bg-white">
        <ReusableTable
          totalPages={total}
          order="asc"
          data={products}
          columns={[
            {
              label: "Shops Name",
              renderCell: (item) => (
                <span className="font-medium text-[#333843]">
                  {item?.shop?.name}
                </span>
              ),
            },
            {
              label: "Product",
              renderCell: (item) => (
                <div className="flex space-x-2.5">
                  <div className="relative h-10 w-10 font-medium text-[#333843]">
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-[#667085]">
                      {item.name}
                    </span>
                    {/* <button className="text-[#667085] hover:text-[#333843]">
                      <Copy size={14} />
                    </button> */}
                  </div>
                </div>
              ),
            },
            {
              label: "Date",
              renderCell: (item) => (
                <span className="text-[#667085]">
                  {format(item.createdAt, "dd MM yyyy")}
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
                              handleApproveProduct(item.slug, "published")
                            }
                          >
                            Approve Product
                          </Menus.Button>

                          {/* Preview */}
                          <Modal.Open opens={`preview-${item.id}`}>
                            <Menus.Button
                              icon={
                                <div className="rounded-full bg-[#FEECC0] p-2">
                                  <Eye className="text-[#FCCD57]" size={16} />
                                </div>
                              }
                              onClick={() => console.log("View:")}
                            >
                              Preview Product
                            </Menus.Button>
                          </Modal.Open>

                          <Modal.Window
                            name={`preview-${item.id}`}
                            className="max-w-2xl overflow-scroll"
                          >
                            <ProductReviewModal item={item} />
                          </Modal.Window>

                          {/* Reject - Opens confirmation modal */}
                          <Modal.Open opens={`reject-${item.id}`}>
                            <Menus.Button
                              icon={
                                <div className="rounded-full bg-[#FFE8E5] p-2">
                                  <Ban className="text-[#FF4733]" size={16} />
                                </div>
                              }
                            >
                              Reject Product
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

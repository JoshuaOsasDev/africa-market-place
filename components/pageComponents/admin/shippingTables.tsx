"use client";
import Menus from "@/components/common/menus";
import Modal from "@/components/common/modal";
import ReusableTable from "@/components/common/reusableTable";
import { shippingData } from "@/lib/data";
import { EyeIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import DeleteProductModal from "../vendor/product/deleteProductModal";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";

export default function ShippingTable({
  shipping,
}: {
  shipping: string | string[] | undefined;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-[#D4EDDA] text-[#155724]";
      case "Cancelled":
        return "bg-[#F8D7DA] text-[#721C24]";
      case "In Transit":
        return "bg-[#FFF3CD] text-[#856404]";
      case "Pending":
        return "bg-[#E7E8EB] text-[#383D44]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="">
      <ReusableTable
        order={shipping}
        data={shippingData}
        columns={[
          {
            label: "Tracking No.",
            renderCell: (item) => (
              <span className="font-medium text-[#333843]">
                {item.trackingNo}
              </span>
            ),
          },
          {
            label: "Customer",
            renderCell: (item) => (
              <span className="text-[#667085]">{item.customer}</span>
            ),
          },
          {
            label: "Destination",
            renderCell: (item) => (
              <span className="text-[#667085]">{item.destination}</span>
            ),
          },
          {
            label: "Delivery Date",
            renderCell: (item) => (
              <span className="text-[#667085]">{item.deliveryDate}</span>
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
              <div className="flex items-center justify-start">
                <Modal>
                  <Menus>
                    <Menus.Menu>
                      <Menus.Toggle id={item.id} />
                      <Menus.List id={item.id}>
                        <Menus.Button
                          icon={
                            <div className="rounded-full bg-[#EAF2EA] p-2">
                              <EyeIcon className="text-[#2E7D32]" size={18} />
                            </div>
                          }
                          onClick={() =>
                            router.push(`/admin/dashboard/shipping/${item.id}`)
                          }
                        >
                          View
                        </Menus.Button>

                        <Modal.Open opens="delete">
                          <Menus.Button
                            icon={
                              <div className="rounded-full bg-[#FFE8E5] p-2">
                                <TrashIcon
                                  className="text-[#FF4733]"
                                  size={18}
                                />
                              </div>
                            }
                          >
                            Delete
                          </Menus.Button>
                        </Modal.Open>
                      </Menus.List>
                    </Menus.Menu>
                  </Menus>

                  <Modal.Window name="delete" className="max-w-md">
                    <DeleteProductModal
                      text={`Shipping ${item.trackingNo}`}
                      productName="Shipping"
                      onConfirm={() => console.log("Delete shipping:")}
                    />
                  </Modal.Window>
                </Modal>
              </div>
            ),
          },
        ]}
        columnsStyle="80px 155.14px 0.6fr 120px 0.7fr 0.7fr 120px"
        itemsPerPage={10}
        onSelectChange={(selectedIds) =>
          setSelectedIds(selectedIds as string[])
        }
      />
    </div>
  );
}

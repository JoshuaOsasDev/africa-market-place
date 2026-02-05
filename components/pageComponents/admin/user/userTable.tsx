"use client";
import Menus from "@/components/common/Menus";
import Modal from "@/components/common/Modal";
import ReusableTable from "@/components/common/reusableTable";

import { EyeIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteProductModal from "../../vendor/product/DeleteProductModal";
import { formatDate } from "@/lib/utils";

export default function UserTable({
  user,
  data,
}: {
  user: string | string[] | undefined;
  data: any[];
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();

  // Role badge styles
  const getRoleStyles = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-[#D4EDDA] text-[#155724]";
      case "user":
        return "bg-[#F3F4F6]  text-[#1F2937]";
      case "vendor":
        return "bg-[#FFF3CD] text-[#856404]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "user":
        return "Custormer";
      case "vendor":
        return "Seller";
      default:
        return role;
    }
  };

  // console.log(data, "resuable");
  return (
    <div className="mt-5">
      <ReusableTable
        order={user}
        data={data}
        columns={[
          {
            label: "Customer Name",
            renderCell: (item) => (
              <span className="font-medium text-[#333843]">
                {item.firstName} {item.lastName}
              </span>
            ),
          },
          {
            label: "Role",
            renderCell: (item) => (
              <span
                className={`rounded-lg px-2.5 py-1 ${getRoleStyles(item?.role)}`}
              >
                {getRoleLabel(item?.role)}
              </span>
            ),
          },
          {
            label: "Orders",
            renderCell: (item) => (
              <span className="text-[#667085]">{item?.totalOrders}</span>
            ),
          },
          {
            label: "Custormer Since",
            renderCell: (item) => (
              <span className="text-[#667085]">
                {formatDate(item.createdAt)}
              </span>
            ),
          },
          //   {
          //     label: "Status",
          //     renderCell: (item) => (
          //       <span
          //         className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusStyles(
          //           item.status,
          //         )}`}
          //       >
          //         {item.status}
          //       </span>
          //     ),
          //   },
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
        columnsStyle="80px 0.7fr 0.6fr 120px  0.7fr 120px"
        itemsPerPage={10}
        onSelectChange={(selectedIds) =>
          setSelectedIds(selectedIds as string[])
        }
      />
    </div>
  );
}

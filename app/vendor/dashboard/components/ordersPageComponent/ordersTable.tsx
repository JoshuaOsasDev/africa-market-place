"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// --- React Table Library Imports ---
import { CompactTable } from "@table-library/react-table-library/compact";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useRowSelect } from "@table-library/react-table-library/select";
import { useSort } from "@table-library/react-table-library/sort";
import { Identifier } from "@table-library/react-table-library/types/table";
// -----------------------------------

// --- External Component Imports (Assumed Paths) ---
// NOTE: Ensure the path to your Pagination component is correct.
import Pagination from "../../../../../components/common/pagination";
// ---------------------------------------------------

// --- ICON & IMAGE IMPORTS (Ensure these paths are correct) ---
import viewIcon from "../../../../../public/vendor/dashboard-images/view-icon.svg";
import editIcon from "../../../../../public/vendor/dashboard-images/edit-icon.svg";
import tomatoesImage from "../../../../../public/vendor/dashboard-images/orders-page-images/tomatoes-image.png";
import greenPepperImage from "../../../../../public/vendor/dashboard-images/orders-page-images/green-pepper-image.png";
import potatoesImage from "../../../../../public/vendor/dashboard-images/orders-page-images/potatoes-image.png";
// -------------------------------------------------------------------------------

// --- 1. TYPES, DATA, AND HELPERS ---

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

interface Order {
  id: string;
  productName: string;
  productImage: any;
  otherProductsCount: number;
  orderId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
}

// Maps status text to the Tailwind classes you used in your JSX
const getStatusClasses = (status: OrderStatus) => {
  switch (status) {
    case "Processing":
      return "bg-[#FFF9EA] text-[#FBC02D]"; // Yellow
    case "Shipped":
      return "bg-[#E8F8FD] text-[#13B2E4]"; // Blue
    case "Delivered":
      return "bg-[#E7F4EE] text-[#2E7D32]"; // Green
    case "Cancelled":
      return "bg-[#FFE8E5] text-[#FF4733]"; // Red
    default:
      return "";
  }
};

// Sample Data Array (Total length is 8 for pagination testing)
const ordersData: Order[] = [
  {
    id: "1",
    productName: "Fresh Tomatoes",
    productImage: tomatoesImage,
    otherProductsCount: 3,
    orderId: "#302012",
    date: "1 min ago",
    customerName: "John Bushmill",
    customerEmail: "Johnb@gmail.com",
    total: 121.0,
    paymentMethod: "Mastercard",
    status: "Processing",
  },
  {
    id: "2",
    productName: "Green Pepper",
    productImage: greenPepperImage,
    otherProductsCount: 3,
    orderId: "#302013",
    date: "1 min ago",
    customerName: "Ilham Budi A",
    customerEmail: "ilahmbudi@mail.com",
    total: 590.0,
    paymentMethod: "Visa",
    status: "Processing",
  },
  {
    id: "3",
    productName: "Potatoes",
    productImage: potatoesImage,
    otherProductsCount: 3,
    orderId: "#302014",
    date: "5 hour ago",
    customerName: "Mohammad Karim",
    customerEmail: "m_karim@mail.com",
    total: 125.0,
    paymentMethod: "Transfer",
    status: "Shipped",
  },
  {
    id: "4",
    productName: "Green Pepper",
    productImage: greenPepperImage,
    otherProductsCount: 3,
    orderId: "#302015",
    date: "1 day ago",
    customerName: "Linda Blair",
    customerEmail: "lindablair@mail.com",
    total: 348.0,
    paymentMethod: "Paypal",
    status: "Shipped",
  },
  {
    id: "5",
    productName: "Fresh Tomatoes",
    productImage: tomatoesImage,
    otherProductsCount: 3,
    orderId: "#302016",
    date: "2 day ago",
    customerName: "Josh Adam",
    customerEmail: "josh_adam@mail.com",
    total: 607.0,
    paymentMethod: "Visa",
    status: "Delivered",
  },
  {
    id: "6",
    productName: "Potatoes",
    productImage: potatoesImage,
    otherProductsCount: 3,
    orderId: "#302017",
    date: "5 Jan 2023",
    customerName: "Sin Tae",
    customerEmail: "sin_tae@mail.com",
    total: 234.0,
    paymentMethod: "Visa",
    status: "Cancelled",
  },
  {
    id: "7",
    productName: "Green Pepper",
    productImage: greenPepperImage,
    otherProductsCount: 3,
    orderId: "#302018",
    date: "1 Jan 2023",
    customerName: "Rajesh Masvidal",
    customerEmail: "rajesh_m@mail.com",
    total: 760.0,
    paymentMethod: "Transfer",
    status: "Shipped",
  },
  {
    id: "8",
    productName: "Fresh Tomatoes",
    productImage: tomatoesImage,
    otherProductsCount: 3,
    orderId: "#302019",
    date: "24 Dec 2022",
    customerName: "Fajar Surya",
    customerEmail: "fsurya@mail.com",
    total: 400.0,
    paymentMethod: "Mastercard",
    status: "Delivered",
  },
];

// --- 2. THEME & HOOKS DEFINITION ---

const ITEMS_PER_PAGE = 5;

// Customized Theme based on the CSS styles found in your raw OrdersTable component
const theme = {
  ...getTheme(),
  // Replicating table layout (min-width: 1000px and grid-template-columns matching th widths)
  Table: `
  --data-table-library_grid-template-columns: 
   255px 106px 131px 167px 121px 121px 145px 92px; 
  
  background: white;
  border-radius: 8px;
  min-width: 1000px;
 `,
  // Replicating <thead> styling
  HeaderRow: `
  height: 56px; /* lg:h-14 */
  background: #F9F9FC; /* bg-[#F9F9FC] */
  color: #333843; /* text-[#333843] */
  font-size: 14px;
  font-weight: 500;
  line-height: 20px; /* leading-5 */
 `,
  // Replicating <th> styling
  HeaderCell: `
  padding: 18px 22px; 
  display: flex;
  align-items: center;
  /* Override default padding/flex behavior for accurate layout */
  & > div {
   justify-content: flex-start !important;
   align-items: center;
   display: flex;
   gap: 8px;
   width: 100%;
  }
 `,
  // Replicating <tr> styling
  Row: `
  background: #FFFFFF; /* bg-[#FFFFFF] */
  border-bottom: 1px solid #F0F1F3; /* border-b border-[#F0F1F3] */
  cursor: pointer;
  &:last-child { border-bottom: none; }
  &:hover { background: #F9F9FC; } /* hover:bg-[#F9F9FC] */
 `,
  // Replicating <td> styling
  Cell: `
  padding: 18px 22px;
  height: 80px; /* h-[80px] */
  display: flex;
  align-items: center;
 `,
};

// --- 3. MAIN COMPONENT ---
export default function OrdersTable() {
  // --- PAGINATION STATE AND LOGIC ---
  const [currentPage, setCurrentPage] = useState(1);
  const totalOrders = ordersData.length;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = ordersData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Data memo using the PAGINATED data
  const data = useMemo(() => ({ nodes: paginatedOrders }), [paginatedOrders]);

  // --- HOOKS ---

  const select = useRowSelect(data, {
    onChange: (action, state) => {
      // console.log("Selected orders:", state.ids);
    },
  });

  const sort = useSort(
    data,
    {
      onChange: (action, state) => {
        // console.log("Sort state:", state);
      },
    },
    {
      sortFns: {
        orderId: (array) =>
          array.sort((a, b) => a.orderId.localeCompare(b.orderId)),
        total: (array) => array.sort((a, b) => a.total - b.total),
        status: (array) =>
          array.sort((a, b) => a.status.localeCompare(b.status)),
        date: (array) => array.sort((a, b) => a.date.localeCompare(b.date)),
      },
    },
  );

  // --- COLUMN DEFINITION ---
  // The structure of the renderCell mirrors the structure of your original <td> content.
  const COLUMNS = [
    // COLUMN 1: Product (Includes Checkbox)
    {
      label: (
        <div className="flex w-full items-center justify-between">Product</div>
      ),
      renderCell: (item: Order) => (
        <div className="flex h-full items-center gap-2">
          {/* Individual Row Checkbox */}
          <input
            type="checkbox"
            className="h-4 w-4 lg:h-5 lg:w-5"
            checked={select.state.ids.includes(item.id)}
            onChange={() => select.fns.onToggleById(item.id)}
            onClick={(e) => e.stopPropagation()}
          />
          <Image
            src={item.productImage}
            alt={`${item.productName}-image`}
            className="h-[30px] w-[30px] lg:h-10 lg:w-10"
          />
          <div>
            <h1 className="text-[14px] leading-5 font-medium text-[#333843]">
              {item.productName}
            </h1>
            <p className="text-[12px] leading-[18px] font-normal text-[#667085]">
              +{item.otherProductsCount} Other Products
            </p>
          </div>
        </div>
      ),
    },

    // COLUMN 2: Order ID
    {
      label: "Order ID",
      renderCell: (item: Order) => (
        <span className="text-[12px] leading-5 font-semibold text-[#2E7D32] lg:text-[14px]">
          {item.orderId}
        </span>
      ),
      sort: { sortKey: "orderId" as const },
    },

    // COLUMN 3: Date
    {
      label: (
        <div className="flex w-full items-center justify-between">Date</div>
      ),
      renderCell: (item: Order) => (
        <span className="text-[14px] leading-5 font-medium text-[#667085]">
          {item.date}
        </span>
      ),
      sort: { sortKey: "date" as const },
    },

    // COLUMN 4: Customer
    {
      label: "Customer",
      renderCell: (item: Order) => (
        <div>
          <h1 className="text-[14px] leading-5 font-medium text-[#333843]">
            {item.customerName}
          </h1>
          <span className="text-[12px] leading-[18px] font-normal text-[#667085]">
            {item.customerEmail}
          </span>
        </div>
      ),
    },

    // COLUMN 5: Total
    {
      label: (
        <div className="flex w-full items-center justify-between">Total</div>
      ),
      renderCell: (item: Order) => (
        <span className="text-[14px] leading-5 font-medium text-[#667085]">
          ${item.total.toFixed(2)}
        </span>
      ),
      sort: { sortKey: "total" as const },
    },

    // COLUMN 6: Payment
    {
      label: "Payment",
      renderCell: (item: Order) => (
        <span className="text-[14px] leading-5 font-medium text-[#667085]">
          {item.paymentMethod}
        </span>
      ),
    },

    // COLUMN 7: Status
    {
      label: (
        <div className="flex w-full items-center justify-between">Status</div>
      ),
      renderCell: (item: Order) => {
        const statusClasses = getStatusClasses(item.status);
        return (
          <span
            className={`text-[14px] leading-5 font-semibold ${statusClasses}`}
          >
            <h1 className="rounded-[100px] px-3 py-1 text-center">
              {item.status}
            </h1>
          </span>
        );
      },
      sort: { sortKey: "status" as const },
    },

    // COLUMN 8: Action
    {
      label: "Action",
      renderCell: (item: Order) => (
        <div className="flex items-center gap-2">
          <Link
            href="/vendor/dashboard/orders/order-details"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={viewIcon} alt="view-icon" className="cursor-pointer" />
          </Link>
          <Image src={editIcon} alt="edit-icon" className="cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-scroll">
        {/* The CompactTable from @table-library */}
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={theme}
          sort={sort}
          select={select}
          onRowClick={(item: { id: Identifier }) =>
            select.fns.onToggleById(item.id)
          }
          layout={{ custom: true, horizontalScroll: true }}
        />
      </div>

      {/* The Pagination Component */}
      <div className="bottom-0 mt-4">
        <Pagination
          currentPage={currentPage}
          totalItems={totalOrders}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

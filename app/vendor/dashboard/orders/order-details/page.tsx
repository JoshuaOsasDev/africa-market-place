import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

import exportIcon from "../../../../../public/dashboard-images/export-icon.svg";
import dropDownIcon from "../../../../../public/dashboard-images/drop-down-icon.svg";
import invoiceIconWhite from "../../../../../public/dashboard-images/order-details-icons/invoice-icon.svg";
import markedCalendarIcon from "../../../../../public/dashboard-images/order-details-icons/marked-calendar-icon.svg";
import cardIcon from "../../../../../public/dashboard-images/order-details-icons/credit-card-icon.svg";
import shippingIcon from "../../../../../public/dashboard-images/order-details-icons/truck-icon.svg";
import userIcon from "../../../../../public/dashboard-images/order-details-icons/user-icon.svg";
import emailIcon from "../../../../../public/dashboard-images/order-details-icons/envelope-icon.svg";
import phoneIcon from "../../../../../public/dashboard-images/order-details-icons/mobile-icon.svg";
import invoiceFilledIcon from "../../../../../public/dashboard-images/order-details-icons/invoice-icon-filled.svg";
import checkIcon from "../../../../../public/dashboard-images/order-details-icons/check-icon.svg";
import locationIcon from "../../../../../public/dashboard-images/order-details-icons/location-icon.svg";
import cartIcon from "../../../../../public/dashboard-images/order-details-icons/cart-icon.svg";
import processIcon from "../../../../../public/dashboard-images/order-details-icons/processing-icon.svg";
import packageIcon from "../../../../../public/dashboard-images/order-details-icons/package-icon.svg";
import deliveredIcon from "../../../../../public/dashboard-images/order-details-icons/delivered-icon.svg";
import tomatoesImage from "../../../../../public/dashboard-images/orders-page-images/tomatoes-image.png";

const page = () => {
  return (
    <div>
      <div className="py-[15px]">
        <div className="flex justify-between mb-6">
          <div className="hidden md:block">
            <h1 className="text-[#333843] text-2xl font-medium leading-8">
              Order
            </h1>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/vendor/dashboard"
                    className="text-[#2E7D32] font-medium text-[14px] leading-[20px]"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/vendor/dashboard/orders"
                    className="text-[#2E7D32] font-medium text-[14px] leading-[20px]"
                  >
                    Order List
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#667085] font-medium text-[14px] leading-[20px]">
                    Order Details
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex gap-4 self-end">
            <button className="flex gap-2 bg-[#FFFFFF] px-3 py-2.5 border border-[#E0E2E7] rounded-[8px]">
              <span className="text-[14px] text-[#333843] font-medium leading-5">
                Processing
              </span>{" "}
              <Image src={dropDownIcon} alt="drop-down-ion" />
            </button>
            <button className="flex gap-1 rounded-[8px] px-3.5 py-2.5 bg-[#EAF2EA] ">
              <Image src={exportIcon} alt="export-icon" />{" "}
              <span className="text-[#2E7D32] text-[14px] font-semibold leading-[20px]">
                Export
              </span>
            </button>
            <button className="flex gap-1 rounded-[8px] px-3.5 py-2.5 bg-[#2E7D32] text-[#FFFFFF] text-[14px] font-semibold leading-[20px]">
              <Image src={invoiceIconWhite} alt="invoice-icon" /> Invoice
            </button>
          </div>
        </div>

        {/* Cards section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="flex flex-col justify-between min-h-[244px] p-6 border border-[#E0E2E7] rounded-[8px]">
            <div>
              <span className="text-[18px] font-medium leading-7 gap-[2px]">
                Order #302011
              </span>
              <span className="bg-[#FFF9EA] text-[#FBC02D] text-[14px] font-semibold leading-5 rounded-[100px] px-3 py-1">
                Processing
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={markedCalendarIcon}
                  alt="calendar-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Added
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                14 Oct 2025
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={cardIcon}
                  alt="credit-card-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Payment Method
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                Visa
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={shippingIcon}
                  alt="truck-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Shipping Method
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                Flat shipping
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className=" flex flex-col justify-between min-h-[244px] p-6 border border-[#E0E2E7] rounded-[8px]">
            <span className="text-[18px] font-medium leading-7 gap-[2px]">
              Customer
            </span>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={userIcon}
                  alt="user-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Customer
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                John Marvel
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={emailIcon}
                  alt="email-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Email
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                johnmarvel@gmail.com
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={phoneIcon}
                  alt="phone-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Phone
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                909 427 2910
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-between min-h-[244px] p-6 border border-[#E0E2E7] rounded-[8px]">
            <span className="text-[18px] font-medium leading-7 gap-[2px]">
              Document
            </span>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={invoiceFilledIcon}
                  alt="receipt-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Invoice
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                INV-32011
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={shippingIcon}
                  alt="truck-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Shipping
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                SHP-2011REG
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src={checkIcon}
                  alt="check-mark-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#757575] font-medium leading-5">
                  Rewards
                </span>
              </div>
              <span className="text-[14px] text-[#757575] font-medium leading-5">
                480 point
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="lg:col-span-2 border border-[#E0E2E7] rounded-[8px] flex flex-col">
            {" "}
            {/* ADDED flex flex-col, changed h- to min-h- */}
            <div className="w-full min-h-16 flex items-center gap-2 px-6 bg-[#FFF] rounded-tl-[8px] rounded-tr-[8px] flex-none border-b">
              {" "}
              {/* ADDED flex-none and border-b */}
              <h1 className="text-[18px] text-[#333843] font-medium leading-7">
                Order List
              </h1>
              <span className="text-[14px] text-[#2E7D32] font-semibold leading-5 px-3 py-1 bg-[#E7F4EE] rounded-[100px]">
                1 Product
              </span>
            </div>
            <div className="overflow-x-auto flex-grow overflow-y-auto">
              <table className="min-w-full">
                <thead className="bg-[#F9F9FC] sticky top-0 z-10">
                  <tr>
                    <th className="text-left text-[14px] font-medium text-[#4D5464] leading-5 px-[22px] py-[18px]">
                      Product
                    </th>
                    <th className="text-left text-[14px] font-medium text-[#4D5464] leading-5 px-[22px] py-[18px]">
                      SKU
                    </th>
                    <th className="text-left text-[14px] font-medium text-[#4D5464] leading-5 px-[22px] py-[18px]">
                      QTY
                    </th>
                    <th className="text-left text-[14px] font-medium text-[#4D5464] leading-5 px-[22px] py-[18px]">
                      Price
                    </th>
                    <th className="text-right lg:text-left text-[14px] font-medium text-[#4D5464] leading-5 px-[22px] py-[18px]">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-[#FFF] border border-b-[#F0F1F3]">
                    <td className="flex gap-2 items-center h-[80px] px-[22px] py-[18px]">
                      <Image
                        src={tomatoesImage}
                        alt="tomatoes-image"
                        className="w-[30px] h-[30px] bg-[#F6F6F6] rounded-[8px] lg:w-10 lg:h-10"
                      />
                      <div>
                        <h1 className="text-[#333843] text-[14px] font-medium leading-5">
                          Fresh Tomatoes
                        </h1>
                        <p className="text-[12px] text-[#667085] font-normal leading-[18px]">
                          +3 Other Products
                        </p>
                      </div>
                    </td>
                    <td className="text-[14px] text-[#2E7D32] font-semibold leading-5 px-[22px] py-[18px]">
                      302011
                    </td>
                    <td className="text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]">
                      4 pcs
                    </td>
                    <td className="text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]">
                      $400.00
                    </td>
                    <td className="text-[14px] text-[#667085] font-medium leading-5 px-[22px] py-[18px]">
                      $400.00
                    </td>
                  </tr>

                  <tr className="bg-[#FFF] border border-b-[#F0F1F3]">
                    <td
                      colSpan={4}
                      className="text-right text-[14px] font-medium text-[#4D5464] leading-5 px-[22px] py-[18px]"
                    >
                      Subtotal
                    </td>
                    <td className="text-[14px] font-medium text-[#333843] leading-5 px-[22px] py-[18px]">
                      $400.00
                    </td>
                  </tr>

                  <tr className="bg-[#FFF] border border-b-[#F0F1F3]">
                    <td
                      colSpan={4}
                      className="text-right text-[14px] font-medium text-[#4D5464] leading-5 px-[22px] py-[18px]"
                    >
                      VAT (0%)
                    </td>
                    <td className="text-[14px] font-medium text-[#333843] leading-5 px-[22px] py-[18px]">
                      $0
                    </td>
                  </tr>

                  <tr className="bg-[#FFF] border border-b-[#F0F1F3]">
                    <td
                      colSpan={4}
                      className="text-right text-[14px] font-medium text-[#4D5464] leading-5 px-[22px] py-[18px]"
                    >
                      Shipping rate
                    </td>
                    <td className="text-[14px] font-medium text-[#333843] leading-5 px-[22px] py-[18px]">
                      $5.00
                    </td>
                  </tr>

                  <tr className="bg-[#FFF]">
                    <td
                      colSpan={4}
                      className="text-right text-[14px] font-medium text-[#333843] leading-5 px-[22px] py-[18px]"
                    >
                      Grand Total
                    </td>
                    <td className="text-[16px] font-bold text-[#333843] leading-5 px-[22px] py-[18px]">
                      $405.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 5 and 6 */}
          <div className="flex flex-col gap-6">
            {/* Card 5 */}
            <div className="flex flex-col justify-between min-h-[236px] p-6 border border-[#E0E2E7] rounded-[8px]">
              <span className="text-[18px] font-medium leading-7 gap-[2px]">
                Address
              </span>

              <div className="flex items-center gap-2">
                <Image
                  src={locationIcon}
                  alt="location-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#636363] font-medium leading-5">
                  Billing <br /> 1833 Bel Meadow Drive, Fontana, California
                  92335, USA
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src={locationIcon}
                  alt="location-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <span className="text-[14px] text-[#636363] font-medium leading-5">
                  Shipping <br /> 1833 Bel Meadow Drive, Fontana, California
                  92335, USA
                </span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="flex flex-col justify-between min-h-[472px] p-6 border border-[#E0E2E7] rounded-[8px]">
              <span className="text-[18px] font-medium leading-7 gap-[2px]">
                Order Status
              </span>

              <div className="flex items-center gap-2">
                <Image
                  src={cartIcon}
                  alt="cart-icon"
                  className="p-2 bg-[#EAF2EA] border-4 border-[#EAF2EA] rounded-[100px] w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-[16px] text-[#333843] font-medium leading-6">
                    Order Placed
                  </span>
                  <span className="text-[14px] text-[#4D5464] font-normal leading-5">
                    An order has been placed.
                  </span>
                  <span className="text-[12px] text-[#858D9D] font-medium leading-[18px]">
                    12/12/2022, 03:00
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src={processIcon}
                  alt="process-icon"
                  className="p-2 bg-[#EAF2EA] border-4 border-[#EAF2EA] rounded-[100px] w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-[16px] text-[#333843] font-medium leading-6">
                    Processing
                  </span>
                  <span className="text-[14px] text-[#4D5464] font-normal leading-5">
                    Seller haas processed your order.
                  </span>
                  <span className="text-[12px] text-[#858D9D] font-medium leading-[18px]">
                    12/12/2022, 03:15
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src={packageIcon}
                  alt="package-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-[16px] text-[#333843] font-medium leading-6">
                    Packed
                  </span>
                  <span className="text-[12px] text-[#858D9D] font-medium leading-[18px]">
                    DD/MM/YY, 00:00
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src={shippingIcon}
                  alt="shipping-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-[16px] text-[#333843] font-medium leading-6">
                    Shipping
                  </span>
                  <span className="text-[12px] text-[#858D9D] font-medium leading-[18px]">
                    DD/MM/YY, 00:00
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src={deliveredIcon}
                  alt="delivered-icon"
                  className="p-2 bg-[#E0E2E7] border-4 border-[#F0F1F3] rounded-[100px] w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-[16px] text-[#333843] font-medium leading-6">
                    Delivered
                  </span>
                  <span className="text-[12px] text-[#858D9D] font-medium leading-[18px]">
                    DD/MM/YY, 00:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

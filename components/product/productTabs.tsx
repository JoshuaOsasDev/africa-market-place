"use client";

import React from "react";
import { Tabs, Tab } from "@/components/common/tabs";
import { ProductDescription } from "@/components/product/productDescription";
import { CustomerReviews } from "@/components/product/customerReviews";
import { Review } from "@/types/review";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  description: string;
  features?: string[];
  additionalInfo?: React.ReactNode;
  reviews?: string;
  className?: string;
  isPaid: boolean | undefined;
}

export function ProductTabs({
  description,
  features,
  additionalInfo,
  reviews = "",
  isPaid,
  className,
}: ProductTabsProps) {
  const tabs: Tab[] = [
    {
      id: "description",
      label: "Descriptions",
      content: (
        <ProductDescription description={description} features={features} />
      ),
    },
    {
      id: "additional",
      label: "Additional Information",
      content: additionalInfo || (
        <div className="text-base text-[#6F6F6F]">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-[#E5E7EB]">
                <td className="w-1/3 py-3 pr-4 font-medium text-[#111827]">
                  Weight
                </td>
                <td className="py-3 text-[#6F6F6F]">1 kg</td>
              </tr>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-3 pr-4 font-medium text-[#111827]">
                  Dimensions
                </td>
                <td className="py-3 text-[#6F6F6F]">15 × 10 × 8 cm</td>
              </tr>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-3 pr-4 font-medium text-[#111827]">Origin</td>
                <td className="py-3 text-[#6F6F6F]">Nigeria</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[#111827]">
                  Storage
                </td>
                <td className="py-3 text-[#6F6F6F]">
                  Keep refrigerated at 2-4°C
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "reviews",
      label: "Customer Feedback",
      content: <CustomerReviews isPaid={isPaid} reviews={reviews} />,
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <Tabs tabs={tabs} defaultTab="description" />
    </div>
  );
}

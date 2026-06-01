"use client";

import React from "react";
import { Tabs, Tab } from "@/components/common/tabs";
import { ProductDescription } from "@/components/product/productDescription";
import { CustomerReviews } from "@/components/product/customerReviews";
import { Review } from "@/types/review";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  description: string;
  height?: string;
  length?: string;
  weight?: string;
  type?: string;
  features?: string[];
  additionalInfo?: React.ReactNode;
  reviews?: string;
  className?: string;
  isPaid: boolean | undefined;
}

export function ProductTabs({
  description,
  height,
  length,
  weight,
  type,
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
                <td className="py-3 text-[#6F6F6F]">{weight} kg</td>
              </tr>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-3 pr-4 font-medium text-[#111827]">Type</td>
                <td className="py-3 text-[#6F6F6F]">{type}</td>
              </tr>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-3 pr-4 font-medium text-[#111827]">Height</td>
                <td className="py-3 text-[#6F6F6F]">{height} cm</td>
              </tr>
              <tr className="border-b border-[#E5E7EB]">
                <td className="py-3 pr-4 font-medium text-[#111827]">Length</td>
                <td className="py-3 text-[#6F6F6F]">{length} cm</td>
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

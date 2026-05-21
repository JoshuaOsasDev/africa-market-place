"use client";
import React from "react";
import {
  Truck,
  CheckCircle2,
  Package,
  TruckIcon,
  CircleAlert,
} from "lucide-react";

export type CourierType = "inpost" | "evri";

// Define the interface based on your API response structure
interface CourierData {
  carrier: string;
  service: string;
  price: number;
  currency: string;
  deliveryTime: string;
}

interface CourierSelectorProps {
  data: {
    evri: CourierData;
    inpost: CourierData;
  };
  selectedCourier: CourierType;
  onSelect: (courier: CourierType) => void;
}

export function CourierSelector({
  data,
  selectedCourier,
  onSelect,
}: CourierSelectorProps) {
  // Map your API keys to display icons and human-readable titles
  const courierMeta = {
    evri: {
      icon: <TruckIcon className="text-[#2E7D32]" size={24} />,
      label: "Home Delivery",
      warning: <CircleAlert className="h-6 w-6 cursor-help text-red-500" />,
    },
    inpost: {
      icon: <Package className="text-[#2E7D32]" size={24} />,
      label: "Locker Collection",
      warning: <CircleAlert className="h-6 w-6 cursor-help text-red-500" />,
    },
  };

  //console.log(data, "Courier Data");
  const options = (Object.keys(data) as CourierType[]).map((key) => ({
    id: key,
    ...data[key],
    ...courierMeta[key],
  }));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Truck className="h-5 w-5 text-[#2E7D32]" />
        <h2 className="text-lg font-bold text-gray-900">
          Choose Delivery Courier
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedCourier === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`relative flex flex-col items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? "border-[#2E7D32] bg-[#F0F7F0]"
                  : "border-gray-100 bg-white shadow-sm hover:border-gray-200"
              }`}
            >
              <div className="flex w-full items-start justify-between">
                <div
                  className={`rounded-lg p-2 ${isSelected ? "bg-white" : "bg-gray-50"}`}
                >
                  {option.icon}
                </div>
                {option.warning && (
                  <div className="group relative">
                    {/* The Icon */}
                    <CircleAlert
                      className="h-6 w-6 cursor-help text-red-500"
                      //fill="currentColor"
                    />

                    {/* The Tooltip Box */}
                    <div className="absolute right-0 bottom-full z-20 mb-2 hidden w-48 flex-col items-start rounded-lg bg-gray-900 p-3 text-xs text-white shadow-xl group-hover:flex">
                      <p className="mb-1 font-bold tracking-wider text-[#4ADE80] uppercase">
                        {option.label}
                      </p>
                      <div className="space-y-1 opacity-90">
                        <p>Carrier: {option.carrier}</p>
                        <p>Service: {option.service}</p>
                        <p>Delivery: {option.deliveryTime}</p>
                      </div>
                      {/* Small Arrow */}
                      <div className="absolute top-full right-2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900">{option.carrier}</p>
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 uppercase">
                    {option.deliveryTime}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-gray-500">
                  {`Total kg: ${option.service.slice(-7)}`}
                </p>
              </div>

              <div className="mt-2">
                <p className="text-lg font-bold text-[#2E7D32]">
                  {option.currency === "GBP" ? "£" : option.currency}
                  {option.price.toFixed(2)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

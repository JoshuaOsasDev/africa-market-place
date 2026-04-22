"use client";

import { useState } from "react";
import { ShippingAddressForm } from "@/components/checkout/shippingAddressForm";
import { ShippingAddress } from "@/types/checkout";
import { cn } from "@/lib/utils";
import {
  useCreateDelivery,
  useDeleteDelivery,
  useUpdateDelivery,
} from "@/lib/hooks/userDashboard/useUser";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "../ui/button";
import UKAddressAutocomplete, {
  AddressResult,
} from "../common/googlAddressUserLocation";

interface DeliveryAddress {
  _id: string;
  address: string;
  country: string;
  city: string;
  county: string;
  postCode: string;
  phoneNumber: number;
  email: string;
  houseNumber: string;
}

interface DeliveryAddressSelectorProps {
  deliveries: DeliveryAddress[];
  shipping: ShippingAddress;
  setShipping: (value: ShippingAddress) => void;
  useDifferentBilling: boolean;
  setUseDifferentBilling: (value: boolean) => void;
}

export function DeliveryAddressSelector({
  deliveries,
  shipping,
  setShipping,
  useDifferentBilling,
  setUseDifferentBilling,
}: DeliveryAddressSelectorProps) {
  const [showForm, setShowForm] = useState(false);

  const { mutate: createDelivery, isPending: isCreating } = useCreateDelivery();
  const { mutate: updateDelivery, isPending: isUpdating } = useUpdateDelivery();
  const { mutate: deleteDelivery, isPending: isDeleting } = useDeleteDelivery();

  // Select saved delivery address
  const handleSelect = (d: DeliveryAddress) => {
    setShipping({
      id: d._id,
      address: d.address,
      country: d.country,
      city: d.city,
      county: d.county,
      postCode: d.postCode,
      email: d.email,
      phoneNumber: d.phoneNumber,
      houseNumber: d.houseNumber,
    });

    setShowForm(true);
  };

  // Delete saved address
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteDelivery(id);

    if (shipping.id === id) {
      setShipping({
        id: "",
        address: "",
        country: "",
        city: "",
        county: "",
        postCode: "",
        email: "",
        phoneNumber: 0,
        houseNumber: "",
      });
    }
  };

  // Save new/update address
  const handleSubmit = () => {
    if (shipping.id) {
      updateDelivery({ id: shipping.id, payload: shipping });
    } else {
      createDelivery(shipping);
    }

    setShowForm(false);
  };

  // Handle Google autocomplete selection
  const handleAddressSelect = (data: AddressResult) => {
    setShipping({
      ...shipping,
      phoneNumber: shipping.phoneNumber,
      email: shipping.email,
      address: `${data.address}`.trim(),
      city: data.city,
      postCode: data.postcode,
      country: data.country,
      houseNumber: data.houseNumber,
      county: data.county,
    });
  };

  if (isCreating || isDeleting || isUpdating) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2E7D32] border-t-transparent"></div>
        <p className="text-sm text-[#6F6F6F]">Loading addresses...</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#111827]">
          Delivery Address
        </h2>

        {deliveries.length < 3 && (
          <Button
            size="sm"
            className="bg-[#2E7D32] hover:bg-[#246628]"
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                return;
              }

              setShipping({
                id: "",
                address: "",
                country: "",
                city: "",
                county: "",
                postCode: "",
                email: "",
                phoneNumber: 0,
                houseNumber: "",
              });

              setShowForm(true);
            }}
          >
            {showForm ? (
              "Cancel"
            ) : (
              <span className="flex items-center gap-1.5">
                <Plus size={16} />
                Add Address
              </span>
            )}
          </Button>
        )}
      </div>

      {/* Saved Address Cards */}
      <div className="space-y-3">
        {deliveries.length === 0 && (
          <p className="text-sm text-[#6F6F6F]">
            No saved addresses. Add one below.
          </p>
        )}

        {deliveries.map((d) => {
          const isSelected = shipping.id === d._id;

          return (
            <div
              key={d._id}
              onClick={() => handleSelect(d)}
              className={cn(
                "relative cursor-pointer rounded-lg border p-4 transition-colors hover:border-[#2E7D32]",
                isSelected
                  ? "border-[#2E7D32] bg-[#F0FDF4]"
                  : "border-[#E5E7EB] bg-white",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 text-[#2E7D32]">
                  {isSelected ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={18} className="text-[#D1D5DB]" />
                  )}
                </div>

                <div className="flex-1 text-sm text-[#374151]">
                  <p className="font-medium">{`${d.houseNumber} ${d.address}`}</p>
                  <p className="text-[#6F6F6F]">
                    {d.city}, {d.county}, {d.country} — {d.postCode}
                  </p>
                  <p className="text-[#6F6F6F]">{d.phoneNumber}</p>
                  {d.email && <p className="text-[#6F6F6F]">{d.email}</p>}
                </div>

                <button
                  onClick={(e) => handleDelete(d._id, e)}
                  className="shrink-0 rounded p-1 text-[#9CA3AF] transition-colors hover:bg-red-50 hover:text-red-500"
                  title="Delete address"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="mt-4 rounded-lg border border-dashed border-[#2E7D32] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#111827]">
            {shipping.id ? "Edit Address" : "New Address"}
          </h3>

          {/* Google UK Address Autocomplete */}
          <div className="mb-4">
            <UKAddressAutocomplete onSelect={handleAddressSelect} />
          </div>

          {/* Shipping Form */}
          <ShippingAddressForm
            onSubmit={handleSubmit}
            values={shipping}
            onChange={setShipping}
            useDifferentBilling={useDifferentBilling}
            onBillingChange={setUseDifferentBilling}
          />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ShippingAddressForm } from "@/components/checkout/shippingAddressForm";
import { ShippingAddress } from "@/types/checkout";
import { cn } from "@/lib/utils";
import {
  useCreateDelivery,
  useDeleteDelivery,
  useUpdateDelivery,
  // useDeleteDelivery
} from "@/lib/hooks/userDashboard/useUser";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "../ui/button";

interface DeliveryAddress {
  _id: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: number;
  email: string;
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

  const { mutate: createDelivery } = useCreateDelivery();
  const { mutate: updateDelivery } = useUpdateDelivery();
  const { mutate: deleteDelivery } = useDeleteDelivery(); // ← hook for deletion

  const handleSelect = (d: DeliveryAddress) => {
    setShipping({
      id: d._id,
      address: d.address,
      country: d.country,
      city: d.city,
      state: d.state,
      zip: d.zip,
      email: d.email,
      phoneNumber: d.phoneNumber,
    });

    setShowForm(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering handleSelect
    deleteDelivery(id);

    // If the deleted address was selected, clear the selection
    if (shipping.id === id) {
      setShipping({
        id: "",
        address: "",
        country: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phoneNumber: 0,
      });
    }
  };

  const handleSubmit = () => {
    if (shipping.id) {
      updateDelivery({ id: shipping.id, payload: shipping });
    } else {
      createDelivery(shipping);
    }
    setShowForm(false);
  };

  const selectedAddress = deliveries.find((d) => d._id === shipping.id);

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
                state: "",
                zip: "",
                email: "",
                phoneNumber: 0,
              });
              setShowForm((prev) => !prev);
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

      {/* Address Cards — radio-style selection */}
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
              {/* Radio indicator */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 text-[#2E7D32]">
                  {isSelected ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={18} className="text-[#D1D5DB]" />
                  )}
                </div>

                {/* Address details */}
                <div className="flex-1 text-sm text-[#374151]">
                  <p className="font-medium">{d.address}</p>
                  <p className="text-[#6F6F6F]">
                    {d.city}, {d.state}, {d.country} — {d.zip}
                  </p>
                  <p className="text-[#6F6F6F]">{d.phoneNumber}</p>
                  {d.email && <p className="text-[#6F6F6F]">{d.email}</p>}
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => handleDelete(d._id, e)}
                  className="shrink-0 rounded p-1 text-[#9CA3AF] transition-colors hover:bg-red-50 hover:text-red-500"
                  title="Delete address"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* {isSelected && (
                <span className="absolute top-3 right-3 rounded-full bg-[#2E7D32] px-2 py-0.5 text-xs font-medium text-white">
                  Selected for delivery
                </span>
              )} */}
            </div>
          );
        })}
      </div>

      {/* Add new address form */}
      {showForm && (
        <div className="mt-4 rounded-lg border border-dashed border-[#2E7D32] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#111827]">
            {shipping.id ? "Edit Address" : "New Address"}
          </h3>
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

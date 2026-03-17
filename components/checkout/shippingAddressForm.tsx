"use client";

import React from "react";
import { FormInput } from "@/components/common/formInput";
import { FormSelect } from "@/components/common/formSelect";
import { FormCheckbox } from "@/components/common/formCheckbox";
import { SectionCard } from "@/components/common/sectionCard";
import { ShippingAddress } from "@/types/checkout";

interface ShippingAddressFormProps {
  values: ShippingAddress;
  onChange: (values: ShippingAddress) => void;
  useDifferentBilling: boolean;
  onBillingChange: (useDifferent: boolean) => void;
  onSubmit: () => void;
  errors?: Partial<Record<keyof ShippingAddress, string>>;
}

const countryOptions = [
  { value: "NG", label: "Nigeria" },
  { value: "GH", label: "Ghana" },
  { value: "KE", label: "Kenya" },
  { value: "ZA", label: "South Africa" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
];

export function ShippingAddressForm({
  values,
  onChange,
  useDifferentBilling,
  onBillingChange,
  errors = {},
  onSubmit,
}: ShippingAddressFormProps) {
  const handleChange =
    (field: keyof ShippingAddress) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ ...values, [field]: e.target.value });
    };

  // console.log(values.id, "shipping id");
  return (
    <SectionCard title="Shipping Address">
      <div className="space-y-4">
        <FormInput
          label="Street Address"
          required
          placeholder="Street address"
          value={values.address}
          onChange={handleChange("address")}
          error={errors.address}
        />

        <FormSelect
          label="Country"
          required
          placeholder="Country"
          options={countryOptions}
          value={values.country}
          onChange={handleChange("country")}
          error={errors.country}
        />

        <FormInput
          label="Town / City"
          required
          placeholder="Town / City"
          value={values.city}
          onChange={handleChange("city")}
          error={errors.city}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="Phone number"
            placeholder="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
            error={errors.phoneNumber}
          />
          <FormInput
            label="Email"
            placeholder="Zip Code"
            value={values.email}
            onChange={handleChange("email")}
            error={errors.email}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="State"
            placeholder="State"
            value={values.state}
            onChange={handleChange("state")}
            error={errors.state}
          />
          <FormInput
            label="Zip Code"
            placeholder="Zip Code"
            value={values.zip}
            onChange={handleChange("zip")}
            error={errors.zip}
          />
        </div>

        <div className="pt-4">
          <FormCheckbox
            label="Use a different billing address (optional)"
            checked={useDifferentBilling}
            onChange={(e) => onBillingChange(e.target.checked)}
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            onClick={() => onSubmit()}
            className="w-fit rounded-full bg-[#2E7D32] px-2 py-1 text-sm font-semibold text-white transition-colors hover:bg-[#246628] md:px-5 md:py-3"
          >
            {values.address ? "Update Address" : "Save Address"}
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

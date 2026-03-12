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
}: ShippingAddressFormProps) {
  const handleChange = (field: keyof ShippingAddress) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ ...values, [field]: e.target.value });
  };

  return (
    <SectionCard title="Shipping Address">
      <div className="space-y-4">
        <FormInput
          label="Street Address"
          required
          placeholder="Street address"
          value={values.streetAddress}
          onChange={handleChange("streetAddress")}
          error={errors.streetAddress}
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
          value={values.townCity}
          onChange={handleChange("townCity")}
          error={errors.townCity}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            value={values.zipCode}
            onChange={handleChange("zipCode")}
            error={errors.zipCode}
          />
        </div>

        <div className="pt-4">
          <FormCheckbox
            label="Use a different billing address (optional)"
            checked={useDifferentBilling}
            onChange={(e) => onBillingChange(e.target.checked)}
          />
        </div>
      </div>
    </SectionCard>
  );
}
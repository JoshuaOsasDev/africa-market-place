"use client";

import React from "react";
import { FormInput } from "@/components/common/formInput";
import { SectionCard } from "@/components/common/sectionCard";
import { ContactInformation } from "@/types/checkout";

interface ContactInformationFormProps {
  values: ContactInformation;
  onChange: (values: ContactInformation) => void;
  errors?: Partial<Record<keyof ContactInformation, string>>;
}

export function ContactInformationForm({
  values,
  onChange,
  errors = {},
}: ContactInformationFormProps) {
  const handleChange = (field: keyof ContactInformation) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...values, [field]: e.target.value });
  };

  return (
    <SectionCard title="Contact Information">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange("firstName")}
            error={errors.firstName}
          />
          <FormInput
            label="Last Name"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange("lastName")}
            error={errors.lastName}
          />
        </div>

        <FormInput
          label="Phone Number"
          placeholder="Number"
          type="tel"
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
          error={errors.phoneNumber}
        />

        <FormInput
          label="Email Address"
          placeholder="Email address"
          type="email"
          value={values.emailAddress}
          onChange={handleChange("emailAddress")}
          error={errors.emailAddress}
        />
      </div>
    </SectionCard>
  );
}
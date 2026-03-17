"use client";

import React from "react";
import { CreditCard } from "lucide-react";
import { FaPaypal, FaStripe } from "react-icons/fa";
import { FormInput } from "@/components/common/formInput";
import { FormRadio } from "@/components/common/formRadio";
import { SectionCard } from "@/components/common/sectionCard";
import { PaymentMethod, CardPayment } from "@/types/checkout";

interface PaymentMethodFormProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  cardDetails: CardPayment;
  onCardDetailsChange: (details: CardPayment) => void;
  errors?: Partial<Record<keyof CardPayment, string>>;
}

export function PaymentMethodForm({
  paymentMethod,
  onPaymentMethodChange,
  cardDetails,
  onCardDetailsChange,
  errors = {},
}: PaymentMethodFormProps) {
  const handleCardChange =
    (field: keyof CardPayment) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onCardDetailsChange({ ...cardDetails, [field]: e.target.value });
    };

  return (
    <SectionCard title="Payment method">
      <div className="space-y-0">
        <FormRadio
          name="paymentMethod"
          label="Stripe"
          checked={paymentMethod === "stripe"}
          onChange={() => onPaymentMethodChange("stripe")}
          icon={<FaStripe size={20} className="text-[#003087]" />}
        />

        <FormRadio
          disabled={true}
          name="paymentMethod"
          label="Pay by Card Credit"
          checked={paymentMethod === "card"}
          onChange={() => onPaymentMethodChange("card")}
          icon={
            <CreditCard
              size={20}
              className="text-[#2E7D32] disabled:text-gray-300"
            />
          }
        />

        {paymentMethod === "card" && (
          <div className="mt-4 space-y-4 border-t border-[#E5E7EB] pt-6">
            <FormInput
              label="Card Number"
              placeholder="00846294561"
              value={cardDetails.cardNumber}
              onChange={handleCardChange("cardNumber")}
              error={errors.cardNumber}
              maxLength={19}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Expiration Date"
                placeholder="MM / YY"
                value={cardDetails.expirationDate}
                onChange={handleCardChange("expirationDate")}
                error={errors.expirationDate}
                maxLength={7}
              />
              <FormInput
                label="CVC"
                placeholder="CVC Code"
                value={cardDetails.cvc}
                onChange={handleCardChange("cvc")}
                error={errors.cvc}
                maxLength={4}
              />
            </div>
          </div>
        )}

        {paymentMethod === "stripe" && (
          <div className="mt-4 border-t border-[#E5E7EB] pt-6">
            <p className="text-sm text-[#6F6F6F]">
              You will be redirected to Stripe to complete your purchase
              securely.
            </p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

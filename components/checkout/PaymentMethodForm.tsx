"use client";

import React from "react";
import { CreditCard } from "lucide-react";
import { FaPaypal } from "react-icons/fa";
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
  const handleCardChange = (field: keyof CardPayment) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onCardDetailsChange({ ...cardDetails, [field]: e.target.value });
  };

  return (
    <SectionCard title="Payment method">
      <div className="space-y-0">
        <FormRadio
          name="paymentMethod"
          label="Pay by Card Credit"
          checked={paymentMethod === "card"}
          onChange={() => onPaymentMethodChange("card")}
          icon={<CreditCard size={20} className="text-[#2E7D32]" />}
        />
        <FormRadio
          name="paymentMethod"
          label="Paypal"
          checked={paymentMethod === "paypal"}
          onChange={() => onPaymentMethodChange("paypal")}
          icon={<FaPaypal size={20} className="text-[#003087]" />}
        />

        {paymentMethod === "card" && (
          <div className="pt-6 space-y-4 border-t border-[#E5E7EB] mt-4">
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

        {paymentMethod === "paypal" && (
          <div className="pt-6 border-t border-[#E5E7EB] mt-4">
            <p className="text-[#6F6F6F] text-sm">
              You will be redirected to PayPal to complete your purchase securely.
            </p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
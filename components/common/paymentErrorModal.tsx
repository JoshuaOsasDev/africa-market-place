"use client";

import { X, AlertTriangle, AlertCircle } from "lucide-react";

interface PaymentErrorModalProps {
  error: string;
  email: string;
  onClose: () => void;
  onRetry?: () => void;
}

export function PaymentErrorModal({
  error,
  email,
  onClose,
  onRetry,
}: PaymentErrorModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Payment declined
          </span>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>

        {/* Title & subtitle */}
        <h3 className="mb-1 text-base font-semibold text-gray-900">
          Your payment could not be processed
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          There was an issue charging your card. No payment has been taken.
        </p>

        {/* Error message box */}
        <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm leading-relaxed text-red-700">{error}</p>
        </div>

        {/* Email row */}
        <div className="mb-4 rounded-lg bg-gray-50 px-3 py-2.5">
          <p className="mb-0.5 text-xs text-gray-400">Receipt email</p>
          <p className="text-sm font-medium text-gray-800">{email}</p>
        </div>

        <hr className="mb-4 border-gray-100" />

        {/* Hint */}
        <p className="mb-4 text-xs leading-relaxed text-gray-400">
          If this issue continues, contact your bank or try a different payment
          method. A secure retry won&#39;t create duplicate charges.
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          {/* <button
            onClick={() => {
              onClose();
              onRetry?.();
            }}
            className="flex-[2] rounded-lg bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600"
          >
            Try again
          </button> */}
        </div>
      </div>
    </div>
  );
}

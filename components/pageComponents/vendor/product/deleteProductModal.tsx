"use client";

import { Trash2 } from "lucide-react";

interface DeleteModalProps {
  productName: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
  text?: string;
  disabled?: boolean;
}

export default function DeleteProductModal({
  productName,
  onConfirm,
  onCloseModal,
  disabled,
  text,
}: DeleteModalProps) {
  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-2 text-center sm:px-6">
      {/* Icon */}
      <div className="rounded-full bg-[#FFE8E5] p-4 sm:p-5">
        <Trash2 className="h-8 w-8 text-[#FF4733] sm:h-10 sm:w-10" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-[#1A1A1A] sm:text-2xl md:text-3xl">
        Delete <span className="break-words">{productName}</span>?
      </h2>

      {/* Description */}
      {text && (
        <p className="max-w-md text-sm leading-relaxed text-[#757575] sm:text-base">
          {`This action cannot be undone. Are you sure you want to delete this ${text}?`}
        </p>
      )}

      {/* Actions */}
      <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onCloseModal}
          className="w-full rounded-[27px] bg-[#FFE8E5] px-6 py-3 text-sm font-medium text-[#FF4733] transition-colors hover:bg-[#FFD7D1] sm:w-auto sm:px-8 sm:py-4"
        >
          No, Go Back
        </button>

        <button
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
          className="w-full rounded-[27px] bg-[#FF4733] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E63D2A] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8 sm:py-4"
        >
          {disabled ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  );
}

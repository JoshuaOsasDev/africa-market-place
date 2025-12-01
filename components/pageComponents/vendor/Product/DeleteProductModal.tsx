"use client";

import { Trash2 } from "lucide-react";

interface DeleteModalProps {
  productName: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
}

export default function DeleteProductModal({
  productName,
  onConfirm,
  onCloseModal,
}: DeleteModalProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="rounded-full bg-[#FFE8E5] px-6 py-5">
        <Trash2 className="mx-auto mb-2 h-10 w-10 text-[#FF4733]" />
      </div>
      <h2 className="text-3xl font-bold">
        Delete <span>{productName}</span>?
      </h2>

      <p className="text-center text-lg text-[#757575]">
        This action cannot be undone. Are you sure you want to delete this
        product?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCloseModal}
          className="rounded-[27px] bg-[#FFE8E5] px-8 py-4 font-medium text-[#FF4733] hover:bg-[#FFE8E5]/50"
        >
          No! Go back
        </button>

        <button
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
          className="rounded-[27px] bg-[#FF4733] px-8 py-4 font-medium text-[#FFE8E5] hover:bg-[#FF4733]/70"
        >
          Yes! Delete
        </button>
      </div>
    </div>
  );
}

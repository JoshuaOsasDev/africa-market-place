import { useContext } from "react";
import { ModalContext } from "@/components/common/Modal";

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used inside <Modal>");
  }
  return ctx;
}

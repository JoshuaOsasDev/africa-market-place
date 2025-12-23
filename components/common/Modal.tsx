"use client";

import { createContext, useContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../../lib/hooks/useOutsideClick";
import {
  ModalContextType,
  ModalProps,
  OpenProps,
  WindowProps,
} from "@/types/appTypes";

export const ModalContext = createContext<ModalContextType | null>(null);

export default function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: OpenProps) {
  const ctx = useContext(ModalContext);
  if (!ctx) return null;

  return cloneElement(children, {
    onClick: () => ctx.open(opens),
  });
}

function Window({ name, children, className }: WindowProps) {
  const ctx = useContext(ModalContext);

  // const { openName, close } = ctx;
  const close = ctx?.close ?? (() => {});
  const openName = ctx?.openName ?? "";
  const ref = useOutsideClick(close);

  if (openName !== name) return null;
  return createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-[#00000059] px-4 backdrop-blur-sm">
      <div
        ref={ref}
        className={`animate-fadeIn relative max-h-[90vh] w-full rounded-[12px] bg-white p-6 shadow-xl transition-all ${className} no-scrollbar`}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 rounded-md p-1 text-gray-600 hover:bg-gray-100"
        >
          <HiXMark className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body,
  );
}

/* Attach to default export */
Modal.Open = Open;
Modal.Window = Window;

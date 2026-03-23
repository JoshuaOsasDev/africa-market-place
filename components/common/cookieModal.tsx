"use client";
import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieModal({ isOpen, onClose }: CookieModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({ necessary: true, analytics: true, marketing: true }),
    );
    handleClose();
  };

  const handleRejectAll = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({ necessary: true, analytics: false, marketing: false }),
    );
    handleClose();
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-50 w-full"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: "transform 350ms cubic-bezier(0.32, 0.72, 0, 1)",
      }}
    >
      <div className="w-full border-t border-gray-200 bg-white px-6 py-5 shadow-[0_-8px_40px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: icon + text */}
          <div className="flex items-start gap-3 sm:items-center">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#a0b7a1]/20 sm:mt-0">
              <Cookie className="h-4 w-4 text-[#2E7D32]" />
            </div>
            <p className="text-[13px] leading-relaxed text-gray-500">
              <span className="font-semibold text-gray-900">
                We use cookies.{" "}
              </span>
              This site uses cookies and similar technologies to improve your
              experience, analyse traffic, and personalise content. By clicking{" "}
              <span className="font-medium text-[#a0b7a1]">
                {'"Accept All"'}
              </span>{" "}
              you consent to all cookies. Choose{" "}
              <span className="font-medium text-gray-700">
                {'"Reject Non-Essential"'}
              </span>{" "}
              to allow only strictly necessary cookies. You can update your
              preferences at any time via the Cookies Policy link in the footer.
            </p>
          </div>

          {/* Right: actions */}
          <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:gap-2 md:flex-row">
            <button
              onClick={handleRejectAll}
              className="w-full rounded-xl border border-gray-300 px-5 py-2.5 text-[13px] font-medium whitespace-nowrap text-gray-700 transition-colors hover:cursor-pointer hover:border-gray-400 hover:text-gray-800 sm:w-auto"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={handleAcceptAll}
              className="w-full rounded-xl bg-[#2E7D32] px-5 py-2.5 text-[13px] font-medium whitespace-nowrap text-white transition-all hover:cursor-pointer hover:brightness-105 sm:w-auto"
            >
              Accept All
            </button>
            <button
              onClick={handleClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

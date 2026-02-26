import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void | undefined) {
  const ref = useRef<any>(null);

  //for outside click of the modal
  useEffect(() => {
    function listener(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    }

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [handler]);

  return ref;
}

export const capitalize = (value?: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "";

"use client";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const MenusContext = createContext<any>(null);

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  // const { openId, open, close, setPosition } = useContext(MenusContext);
  const ctx = useContext(MenusContext);
  if (!ctx) return null;
  const setPosition = ctx.setPosition;
  const openId = ctx.openId;
  const open = ctx.open;
  const close = ctx.close;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom - 60,
    });

    openId === id ? close() : open(id);
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center text-[#212121] transition-colors hover:text-gray-600"
    >
      <MoreVertical fill="#212121" size={20} />
    </button>
  );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
  // const { openId, position, close } = useContext(MenusContext);

  const ctx = useContext(MenusContext);
  const ref = useOutsideClick(() => ctx?.close());
  if (!ctx) return null;
  const position = ctx.position;
  const openId = ctx.openId;
  //const close = ctx.close;

  if (openId !== id || !position) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ top: position.y, right: position.x }}
      className="fixed z-50 w-48 rounded-xl bg-white p-2.5 shadow-md"
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-1.5 p-2.5 text-left text-sm text-[#616161] transition hover:bg-gray-50"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

const Menu = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-end">{children}</div>
);

Menu.displayName = "Menus.Menu";

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

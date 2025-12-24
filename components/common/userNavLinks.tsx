"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import {
  Heart,
  Bell,
  MessageSquare,
  ShoppingCart,
  ChartSpline,
} from "lucide-react";

const links = [
  {
    name: "Orders",
    href: "/user/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    name: "Wishlist",
    href: "/user/dashboard/wishlist",
    icon: Heart,
  },
  {
    name: "Notifications",
    href: "/user/dashboard/notifications",
    icon: Bell,
  },
  {
    name: "Messages",
    href: "/user/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Payment Settings",
    href: "/user/dashboard/payment-settings",
    icon: ChartSpline,
  },
];

export default function UserNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "hidden grow place-items-start justify-center gap-2 rounded-xl p-3 px-3 py-2 text-[14px] font-bold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-[#EAF2EA] text-[#2E7D32]": pathname === link.href,
              },
            )}
          >
            <div className="mr-20 flex items-center justify-between gap-2">
              <LinkIcon
                size={20}
                className={clsx("transition-colors", {
                  "text-[#2E7D32]": pathname === link.href,
                  "text-[#667085]": pathname !== link.href,
                })}
              />
              <p className="hidden whitespace-nowrap md:block">{link.name}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

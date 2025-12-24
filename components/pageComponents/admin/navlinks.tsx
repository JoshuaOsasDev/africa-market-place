"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  MessageCircleMore,
  Package,
  Settings,
  Store,
  UsersRound,
} from "lucide-react";

const Navlinks = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/admin/dashboard/users",
      icon: UsersRound,
    },
    {
      name: "Sellers",
      href: "/admin/dashboard/sellers",
      icon: Store,
    },
    {
      name: "Product Review",
      href: "/admin/dashboard/productReview",
      icon: Package,
    },
    {
      name: "Shipping",
      href: "/admin/dashboard/shipping",
      icon: Package,
    },
    {
      name: "Roles",
      href: "/admin/dashboard/roles",
      icon: Package,
    },
    {
      name: "Payout",
      href: "/admin/dashboard/payout",
      icon: Package,
    },
    {
      name: "Page Setups",
      href: "/admin/dashboard/pageSetups",
      icon: Package,
    },
    {
      name: "Reports",
      href: "/admin/dashboard/reports",
      icon: MessageCircleMore,
    },
    {
      name: "Settings",
      href: "/admin/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive =
          link.href === "/admin/dashboard"
            ? pathname === "/admin/dashboard"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "mx-auto hidden w-[233px] grow items-center justify-center gap-2 rounded-[12px] px-5 py-4 text-[14px] font-normal md:flex md:flex-none md:justify-start",
              {
                // This applies hover ONLY when not active
                "hover:bg-[#EAF2EA]": !isActive,

                // Active/Inactive styles
                "bg-[#2E7D32] text-[#FFFFFF]": isActive,
                "text-[#53545C]": !isActive,
              },
            )}
          >
            <link.icon />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default Navlinks;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import dashboardPageICon from "../../../../public/admin/dashboard_images_and_icons/dashboard-page-icon-1.svg";
import usersPageIcon from "../../../../public/admin/dashboard_images_and_icons/users-page-icon.svg";
import sellersPageIcon from "../../../../public/admin/dashboard_images_and_icons/sellers-page-icon.svg";
import prouctReviewPageIcon from "../../../../public/admin/dashboard_images_and_icons/product-review-page-icon.svg";
import defaultPageIcon from "../../../../public/admin/dashboard_images_and_icons/default-page-icon.svg";
import reportsPageIcon from "../../../../public/admin/dashboard_images_and_icons/reports-page-icon.svg";
import settingsPageIcon from "../../../../public/admin/dashboard_images_and_icons/settings-page-icon.svg";

const Navlinks = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: dashboardPageICon,
    },
    {
      name: "Users",
      href: "/admin/dashboard/users",
      icon: usersPageIcon,
    },
    {
      name: "Sellers",
      href: "/admin/dashboard/sellers",
      icon: sellersPageIcon,
    },
    {
      name: "Product Review",
      href: "/admin/dashboard/productReview",
      icon: prouctReviewPageIcon,
    },
    {
      name: "Shipping",
      href: "/admin/dashboard/shipping",
      icon: defaultPageIcon,
    },
    {
      name: "Roles",
      href: "/admin/dashboard/roles",
      icon: defaultPageIcon,
    },
    {
      name: "Payout",
      href: "/admin/dashboard/payout",
      icon: defaultPageIcon,
    },
    {
      name: "Page Setups",
      href: "/admin/dashboard/pageSetups",
      icon: defaultPageIcon,
    },
    {
      name: "Reports",
      href: "/admin/dashboard/reports",
      icon: reportsPageIcon,
    },
    {
      name: "Settings",
      href: "/admin/dashboard/settings",
      icon: settingsPageIcon,
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
            <Image
              src={link.icon}
              alt="nav-icons"
              style={{
                filter: isActive
                  ? "invert(97%) sepia(100%) saturate(12%) hue-rotate(197deg) brightness(105%) contrast(104%)"
                  : "invert(33%) sepia(3%) saturate(1107%) hue-rotate(196deg) brightness(97%) contrast(96%)",
              }}
            />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default Navlinks;

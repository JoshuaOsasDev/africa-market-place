"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useSignOut } from "@/lib/hooks/userDashboard/useUser";
//import logo from "../../../lib/public/images/africa1_logo.png";

const logo =
  "https://res.cloudinary.com/dtxai4k4r/image/upload/v1773526193/africa_market_place_desktop_banner_ww9s3x.png";
const Navbar = () => {
  const { mutate: logout } = useSignOut();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = [
    { prefix: "/admin/dashboard", title: "Overview" },
    { prefix: "/admin/dashboard/users", title: "Users" },
    { prefix: "/admin/dashboard/shops", title: "Shops" },
    { prefix: "/admin/dashboard/product-review", title: "Product Review" },
    { prefix: "/admin/dashboard/shipping", title: "Shipping" },
    { prefix: "/admin/dashboard/roles", title: "Roles" },
    { prefix: "/admin/dashboard/payout", title: "Payout" },
    { prefix: "/admin/dashboard/pageSetups", title: "Page Setups" },
    { prefix: "/admin/dashboard/reports", title: "Reports" },
    { prefix: "/admin/dashboard/settings", title: "Settings" },
  ];

  const currentRoute = routes.find(
    (route) =>
      pathname === route.prefix || pathname.startsWith(`${route.prefix}/`),
  );

  const headerText = currentRoute?.title ?? "";
  const headerHref = currentRoute?.prefix ?? "/admin/dashboard";

  const slugDetails =
    currentRoute && pathname.startsWith(`${currentRoute.prefix}/`)
      ? pathname.slice(`${currentRoute.prefix}/`.length)
      : null;

  return (
    <>
      <nav className="fixed z-[100] h-[60px] w-full border-b bg-white px-4 md:px-0">
        <div className="flex h-full items-center justify-between md:ml-20">
          {/* Mobile: Hamburger Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-md p-1 transition-colors hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <div className="relative h-8 w-8">
              <Image src={logo} fill alt="logo" className="object-contain" />
            </div>
          </div>

          {/* Desktop: Logo */}
          <div className="relative hidden h-12 w-12 items-center md:flex">
            <Link href="/" className="relative h-10 w-10">
              <Image src={logo} fill alt="logo" className="object-contain" />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-between px-[21px]">
            {/* Breadcrumbs */}
            <h1 className="hidden items-center text-[18px] font-medium text-[#45464E] sm:flex">
              <Link
                href="/admin/dashboard"
                className="transition-colors hover:text-[#2E7D32]"
              >
                Dashboard
              </Link>
              {headerText && (
                <>
                  <ChevronRight className="mx-1 h-5 w-5 text-[#667085]" />
                  <Link
                    href={headerHref}
                    className={`transition-colors hover:text-[#2E7D32] ${!slugDetails ? "text-[#2E7D32]" : ""}`}
                  >
                    {headerText}
                  </Link>
                </>
              )}
              {slugDetails && (
                <>
                  <ChevronRight className="mx-1 h-5 w-5 text-[#667085]" />
                  <span className="max-w-[150px] truncate text-[#667085]">
                    {decodeURIComponent(slugDetails)}
                  </span>
                </>
              )}
            </h1>

            {/* Right Side Actions */}
            <div className="ml-auto flex items-center justify-end gap-3 md:gap-5">
              <button className="hidden items-center justify-center gap-2.5 rounded-xl bg-[#FAFAFA] px-3 py-1.5 sm:flex">
                <span className="text-[14px] font-normal text-[#1C1D22]">
                  Admin
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <Bell
                fill="#2E7D32"
                className="h-5 w-5 cursor-pointer text-[#2E7D32]"
              />
              <div
                onClick={() => logout()}
                className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-xl border"
              >
                <Image
                  fill
                  src="/admin-dashboard-image/admin-profile-image.jpg"
                  alt="profile-picture"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE SIDEBAR DRAWER --- */}

        {/* Backdrop Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden ${
            isMobileMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Half-Screen Side Menu */}
        <div
          className={`fixed top-0 left-0 z-[110] h-full w-[60%] bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-[50%] md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="relative h-8 w-8">
                <Image src={logo} fill alt="logo" className="object-contain" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="no-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {routes.map((route) => (
                <Link
                  key={route.prefix}
                  href={route.prefix}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    pathname.startsWith(route.prefix)
                      ? "bg-[#F0F7F0] text-[#2E7D32]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {route.title}
                </Link>
              ))}
            </div>

            {/* Logout at Bottom */}
            <div className="border-t p-4">
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[60px]"></div>
    </>
  );
};

export default Navbar;

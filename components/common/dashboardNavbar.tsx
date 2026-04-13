"use client";
import Image from "next/image";
import React, { useState } from "react";
import searchIcon from "../../lib/public//vendor/dashboard-images/search-icon.svg";

import Link from "next/link";
import {
  Bell,
  Heart,
  HomeIcon,
  KeyRound,
  LogOut,
  Mail,
  MailIcon,
  Menu,
  Search,
  User,
  UserRound,
  X,
} from "lucide-react";
import { useAppSelector } from "@/redux/store";

import logo from "../../lib/public/images/africa1_logo.png";
import TextStyle from "./textStyle";
import { useSignOut } from "@/lib/hooks/userDashboard/useUser";

import { usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const { mutate: logout, isPending: isLoggingOut } = useSignOut();
  const path = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(user.user, "user from dashboard navbar");
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };
  //console.log(user.user, "user");
  return (
    <>
      <nav className="fixed z-50 w-full items-center justify-between border-b border-[#F0F1F3] bg-white px-6 md:flex md:h-20">
        <div className="relative hidden h-[50px] w-[100px] md:block">
          <Link href="/">
            <Image
              src={logo}
              alt="africa market place logo"
              fill
              className="object-contain object-center"
            />
          </Link>
        </div>

        {/* Hamburger Menu Button - Mobile */}
        <div className="my-4 mb-2 flex items-center justify-between">
          <button
            onClick={toggleMenu}
            className="my-auto rounded-lg p-2 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>

          <div className="flex items-center space-x-2.5 md:hidden">
            <Bell />
            <div className="rounded-full bg-[#E8F5E9]">
              {user?.user?.cover ? (
                <div className="relative h-10 w-10">
                  <Image
                    src={user.user.cover.url}
                    alt="User Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <User className="text-[#2E7D32]" />
              )}
            </div>
          </div>
        </div>
        <div className="hidden h-[52px] w-[435px] gap-2.5 rounded-[26px] bg-[#F6F6F6] px-4 py-3.5 md:flex">
          <Image src={searchIcon} width={24} alt="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="w-full placeholder-[#BABABA] outline-none"
          />
        </div>

        <div className="hidden gap-4 md:flex md:items-center">
          <div className="flex items-center gap-2">
            <Bell className="h-10 w-10 rounded-[20px] bg-[#F6F6F6] p-2 text-gray-500" />
            <MailIcon className="text-gray-500" />
          </div>
          <div className="flex flex-1 flex-row space-x-5">
            {user?.user ? (
              <div className="group relative ml-2 flex items-center">
                {/* Profile Image */}
                {user.user?.cover?.url ? (
                  <div className="relative h-10 w-10 cursor-pointer">
                    <Image
                      src={
                        user.user?.cover?.url ||
                        "/images/avatar-placeholder.png"
                      }
                      alt="User Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <UserRound className="h-10 w-10 cursor-pointer" />
                )}

                {/* Dropdown */}
                <div className="invisible absolute top-12 right-0 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {/* User Info */}
                  <div className="mb-3 flex items-center space-x-3">
                    <div className="relative h-10 w-10">
                      <Image
                        src={
                          user.user?.cover?.url ||
                          "/images/avatar-placeholder.png"
                        }
                        alt="User"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">
                        {user.user?.firstName} {user.user?.lastName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.user?.email}
                      </span>
                    </div>
                  </div>

                  <hr className="my-2" />

                  {/* Links */}
                  <Link
                    href="/vendor/dashboard"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 ${
                      path === "/"
                        ? "bg-[#E8F5E9] text-[#4F912F]"
                        : "text-gray-700"
                    }`}
                  >
                    <HomeIcon size={16} />
                    Home
                  </Link>

                  {/* <Link
                    href="/user/change-password"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 ${
                      path === "/user/change-password"
                        ? "bg-[#E8F5E9] text-[#4F912F]"
                        : "text-gray-700"
                    }`}
                  >
                    <KeyRound size={16} />
                    Change Password
                  </Link> */}

                  <hr className="my-3" />

                  {/* Logout */}
                  <button
                    onClick={() => logout()}
                    disabled={isLoggingOut}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-400 px-3 py-2 text-sm text-gray-800 hover:bg-gray-300"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center space-x-2">
                <UserRound className="text-[#6F6F6F]" />
                <Link href={"/auth-user/login"}>
                  <TextStyle textContent="Sign In" textStyle="text-[#6F6F6F]" />
                </Link>
                <hr className="h-5 w-px bg-[#b0adad]" />
                <Link href={"/auth-user/register"}>
                  <TextStyle
                    textContent="Register"
                    textStyle="text-[#6F6F6F]"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="absolute top-20 right-0 left-0 z-50 border-b border-[#F0F1F3] bg-white shadow-lg md:hidden">
          <div className="flex flex-col space-y-4 p-6">
            {/* Search Bar (Mobile) */}
            <div className="flex h-13 items-center gap-2.5 rounded-[26px] bg-[#F6F6F6] px-4 py-3.5">
              <Search className="h-6 w-6 text-[#BABABA]" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent placeholder-[#BABABA] outline-none"
              />
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div className="relative h-10 w-10">
                {" "}
                <Image
                  src={
                    user.user?.cover?.url || "/images/avatar-placeholder.png"
                  }
                  alt="user-profile-picture"
                  fill
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-medium text-[#000000]">
                  {`${user.user?.firstName} ${user.user?.lastName}`}
                </span>
                <span className="text-[14px] font-light text-[#979797]">
                  {user?.user?.role}
                </span>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex gap-4 border-t border-gray-100 pt-4">
              <button className="relative flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#F6F6F6] px-4 py-3 hover:bg-gray-200">
                <Bell className="h-5 w-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  Notifications
                </span>
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#F6F6F6] px-4 py-3 hover:bg-gray-200">
                <Mail className="h-5 w-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  Messages
                </span>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col space-y-2 border-t border-gray-100 pt-4">
              <Link
                href="/vendor/dashboard"
                onClick={handleMobileLinkClick}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/vendor/dashboard/product"
                onClick={handleMobileLinkClick}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Products
              </Link>
              <Link
                href="/vendor/dashboard/orders"
                onClick={handleMobileLinkClick}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Orders
              </Link>
              <Link
                href="/vendor/dashboard/settings"
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={() => logout()}
                className="rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;

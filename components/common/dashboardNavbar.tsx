"use client";
import Image from "next/image";
import React, { useState } from "react";
import searchIcon from "../../lib/public//vendor/dashboard-images/search-icon.svg";
import notificationIcon from "../../lib/public/common/notification-icon-filled.svg";

import profilePicture from "../../lib/public/vendor/dashboard-images/profile-picture.svg";

import Link from "next/link";
import { Bell, Mail, MailIcon, Menu, Search, User, X } from "lucide-react";

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="fixed z-50 w-full items-center justify-between border-b border-[#F0F1F3] bg-white px-6 md:flex md:h-20">
        <div className="relative hidden h-[50px] w-[100px] md:block">
          <Link href="/">
            <Image
              src="/images/logo.png"
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
            <div className="rounded-4xl bg-[#EAF2EA] p-[4.38px]">
              <User className="text-[#2E7D32]" />
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

        <div className="hidden gap-2 md:flex">
          <Image
            src={notificationIcon}
            alt="notification-icon"
            className="h-10 w-10 rounded-[20px] bg-[#F6F6F6] p-2"
          />
          <MailIcon />

          <div className="flex items-center gap-4">
            <Image
              src={profilePicture}
              alt="user-profile-picture"
              className="h-10 w-10"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="text-[16px] font-medium text-[#000000]">
                Johnmarvel
              </span>
              <span className="text-[14px] font-light text-[#979797]">
                Vendor
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="absolute top-20 right-0 left-0 z-50 border-b border-[#F0F1F3] bg-white shadow-lg md:hidden">
          <div className="flex flex-col space-y-4 p-6">
            {/* Search Bar (Mobile) */}
            <div className="flex h-[52px] items-center gap-2.5 rounded-[26px] bg-[#F6F6F6] px-4 py-3.5">
              <Search className="h-6 w-6 text-[#BABABA]" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent placeholder-[#BABABA] outline-none"
              />
            </div>

            {/* Profile Section */}
            <div className="relative flex items-center gap-3 border-t border-gray-100 pt-4">
              <Image
                src="/image/logo.png"
                alt="user-profile-picture"
                fill
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-[16px] font-medium text-[#000000]">
                  Johnmarvel
                </span>
                <span className="text-[14px] font-light text-[#979797]">
                  Vendor
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
                href="vendor/dashboard"
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <a
                href="vendor/dashboard/product"
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Products
              </a>
              <a
                href="#"
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Orders
              </a>
              <a
                href="#"
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;

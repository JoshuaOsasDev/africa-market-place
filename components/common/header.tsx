"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import logo from "../../lib/public/images/africa1_logo.png";
import { navListArray, navMobileData } from "@/lib/data";
import SearchFieldComp from "@/components/common/search";
import TextStyle from "@/components/common/textStyle";

import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  LogIn,
  UserRound,
  LogOut,
  User,
  Home,
  KeyRound,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useSignOut } from "@/lib/hooks/userDashboard/useUser";
import { NavItem } from "@/types/appTypes";

function Header() {
  const wishlist = useAppSelector((state) => state.wishlist);
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.product.checkout.cart);
  const [userTextInput, setuserTextInput] = useState("");
  const [countryListData, setCountryListData] = useState<
    | {
        name: string;
        flagImage: string;
        alt: string;
        selected: boolean;
      }[]
    | []
  >([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountryListData, setselectedCountryListData] = useState<{
    name: string;
    flagImage: string;
    alt: string;
  } | null>(null);
  const { mutate: logout, isPending: isLoggingOut } = useSignOut();
  const router = useRouter();

  const path = usePathname();

  const mobile: NavItem[] = navMobileData(path);

  return (
    <div className="md:pt-2">
      <div className="fixed z-50 w-full bg-white shadow-md md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-2 py-3 md:py-4">
          {/* Logo */}
          {mobile[0] && (
            <div className="relative h-[50px] w-[100px] sm:h-[60px] sm:w-[182px] lg:h-[83px] lg:w-[292px]">
              <Link href={"/"}>
                <Image
                  src={mobile[0].image ?? ""}
                  alt="africa market place logo"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>
          )}

          {/* Hamburger Menu Button (Mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-40 flex h-full w-3/6 flex-col border-l border-gray-200 bg-white shadow-lg md:hidden"
            >
              <div className="flex justify-end pb-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              {mobile.slice(1).map((data) => {
                const Icon = data.icon;

                return (
                  <nav
                    key={data.name}
                    className="flex flex-col space-y-4 px-6 font-medium text-gray-700"
                  >
                    <motion.a
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      href={data.href}
                      className="group flex items-center space-x-3 py-2 transition-colors duration-200 hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {Icon && (
                        <Icon className="h-5 w-5 text-gray-500 transition-colors duration-200 group-hover:text-green-600" />
                      )}

                      <TextStyle textContent={data.name} textStyle="text-14" />
                    </motion.a>
                  </nav>
                );
              })}
              <div className="flex flex-1 flex-col items-end justify-end p-1">
                <div className="flex flex-row items-center justify-center space-x-2">
                  <LogIn />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden flex-row space-x-4 px-4 pb-1 md:flex">
        {/* logo section starts */}
        <div className="relative mr-5 h-[30px] w-[30px] bg-red-500 sm:h-[60px] sm:w-[182px] lg:h-[83px] lg:w-[292px]">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="africa market place logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        {/* logo section ends */}
        {/* other section starts */}
        <div className="w-full flex-1 space-y-1">
          {/* top left section starts */}
          <div className="flex flex-1 flex-row space-x-5">
            <div className="flex-1">
              <SearchFieldComp
                inputDivStyle="block w-full max-w-lg"
                inputPlaceholder="Search for food items here..."
                setInputState={setuserTextInput}
                inputState={userTextInput}
                inputTextStyle="flex-1"
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              {/* <div className="hidden flex-row space-x-2 lg:flex">
                {selectedCountryListData && (
                  <div className="flex flex-row items-center justify-center space-x-1 rounded-xl border border-[#F6F6F6] px-3 py-2.5">
                    <div className="relative h-5 w-5">
                      <Image
                        src={selectedCountryListData.flagImage}
                        alt={selectedCountryListData.alt}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <select
                      name=""
                      className="px-2 outline-0"
                      id=""
                      onChange={(e) => {
                        setselectedCountryListData(JSON.parse(e.target.value));
                      }}
                    >
                      {countryListData.map((data, id) => (
                        <option key={id} value={JSON.stringify(data)}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div> */}
              <div className="ml-2 flex flex-row items-center space-x-3">
                <Link
                  href={"/user/dashboard/wishlist"}
                  className="relative h-6 w-6"
                >
                  <Heart className="h-6 w-6 text-[#6F6F6F]" />
                  {wishlist.wishlist?.data?.length > 0 && (
                    <div className="absolute -right-2 bottom-3 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF0000] p-1">
                      <span className="text-[10px] text-white">
                        {wishlist.wishlist?.data?.length || 0}
                      </span>
                    </div>
                  )}
                </Link>
                <div className="relative h-6 w-6">
                  <Link href={"/user/cart"}>
                    <ShoppingCart className="h-6 w-6 text-[#6F6F6F]" />
                    {cart?.length > 0 && (
                      <div className="absolute -right-2 bottom-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF0000] p-1">
                        <span className="text-[10px] text-white">
                          {cart?.length}
                        </span>
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </div>

            {user?.user ? (
              // <div className="ml-2 flex flex-row items-center space-x-3">
              //   <div className="relative h-10 w-10">
              //     {user?.user?.cover ? (
              //       <Image
              //         src={user.user?.cover?.url || ""}
              //         alt="User Cover Image"
              //         fill
              //         className="rounded-full object-cover"
              //       />
              //     ) : (
              //       <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              //     )}
              //   </div>

              //   <Button
              //     onClick={() => logout()}
              //     className="cursor-pointer rounded-xl bg-[#2E7D32] px-3.5 py-2.5 text-sm font-medium text-white"
              //   >
              //     Log Out
              //   </Button>
              // </div>

              <div className="group relative ml-2 flex items-center">
                {/* Profile Image */}
                <div className="relative h-10 w-10 cursor-pointer">
                  <Image
                    src={
                      user.user?.cover?.url || "/images/avatar-placeholder.png"
                    }
                    alt="User Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

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
                    href="/"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Home size={16} />
                    Home
                  </Link>

                  <Link
                    href="/user/dashboard/userInfo"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} />
                    Profile
                  </Link>

                  <Link
                    href="/user/change-password"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <KeyRound size={16} />
                    Change Password
                  </Link>

                  <hr className="my-3" />

                  {/* Logout */}
                  <button
                    onClick={() => logout()}
                    disabled={isLoggingOut}
                    className="text-gray-700px-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-400 py-2 text-sm text-gray-800 hover:bg-gray-300"
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
                <Link href={"/auth-user/register/vendor"}>
                  <TextStyle
                    textContent="Register"
                    textStyle="text-[#6F6F6F]"
                  />
                </Link>
              </div>
            )}
          </div>
          {/* top left section ends */}
          <div className="flex flex-row items-center lg:justify-between">
            <div className="flex flex-row items-center space-x-4 lg:space-x-8">
              {
                /*  */
                navListArray.map((item, i) => {
                  return (
                    <div className="group flex flex-col space-y-2 pt-3" key={i}>
                      <Link
                        className="cursor-pointer text-lg font-medium hover:text-blue-500"
                        key={item.url}
                        href={item.url}
                      >
                        <TextStyle
                          textContent={item.name}
                          textStyle="hover:text-[#4F912F] text-[#6F6F6F]"
                        />
                      </Link>
                      <div className="h-0.5 w-0 bg-[#4F912F] transition-all duration-500 ease-in-out group-hover:block group-hover:w-full"></div>
                    </div>
                  );
                })
              }
              {/* <div className="group flex flex-col space-y-1 pt-2 lg:hidden">
                <Link
                  className="cursor-pointer text-lg font-medium hover:text-blue-500"
                  href={"/tracking"}
                >
                  <TextStyle
                    textContent={"Order Tracking"}
                    textStyle="hover:text-[#4F912F]"
                  />
                </Link>
                <div className="h-0.5 w-0 bg-[#4F912F] transition-all duration-500 ease-in-out group-hover:block group-hover:w-full lg:hidden"></div>
              </div> */}
            </div>
            <div className="flex items-center justify-center space-x-4 lg:flex-1">
              {/* <LanguageSelect showFlag={false} />
              <LanguageSelect showFlag={true} /> */}

              <div className="group hidden flex-col space-y-1 pt-2 lg:flex">
                <Link
                  className="cursor-pointer text-lg font-medium hover:text-blue-500"
                  href={"/tracking"}
                >
                  <TextStyle
                    textContent={"Order Tracking"}
                    textStyle="hover:text-[#4F912F] text-[#6F6F6F]"
                  />
                </Link>
                <div className="h-0.5 w-0 bg-[#4F912F] transition-all duration-500 ease-in-out group-hover:block group-hover:w-full"></div>
              </div>
            </div>
          </div>
        </div>
        {/* other section ends */}
      </div>
    </div>
  );
}

export default Header;

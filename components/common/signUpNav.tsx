"use client";
import {
  Heart,
  House,
  LogIn,
  MapPinCheckInside,
  Menu,
  Store,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import TextStyle from "./textStyle";
import Link from "next/link";

export default function SignUpNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>
        <div className="w-full bg-white shadow-md md:hidden px-2 ">
          <div className="mx-auto flex items-center justify-between  px-2 py-3 md:py-4">
            {/* Logo */}
            <div className="relative w-[100px] h-[50px]">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="africa market place logo"
                  fill
                  className="object-contain object-center"
                />
              </Link>
            </div>

            {/* Hamburger Menu Button (Mobile only) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {/* Navbar Links - Hidden on Mobile */}
            <nav className="hidden md:flex space-x-8 text-gray-700 font-medium z-23 bg-white">
              <a href="#home" className="hover:text-blue-600 transition-colors">
                Home
              </a>
              <a
                href="#about"
                className="hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="hover:text-blue-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Animated Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed flex flex-col top-0 right-0 z-40 h-full w-2/6 bg-white  shadow-lg border-l border-gray-200 md:hidden  "
              >
                <div className="flex justify-end p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4 px-6 text-gray-700 font-medium">
                  <motion.a
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    href="/"
                    className="hover:text-green-600 transition-colors ease-in-out"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <House className="h-5 w-5 hover:text-green-700" />
                      <TextStyle textContent="Home" textStyle="text-14" />
                    </div>
                  </motion.a>
                  <motion.a
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    href="/order/track"
                    className="hover:text-green-600 transition-colors ease-in-out"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <MapPinCheckInside className="h-5 w-5 hover:text-green-700" />
                      <TextStyle
                        textContent="Order Tracking"
                        textStyle="text-14"
                      />
                    </div>
                  </motion.a>
                  <motion.a
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    href="/wishlist"
                    className="hover:text-green-600 transition-colors ease-in-out"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <Heart className="h-5 w-5 hover:text-green-700" />
                      <TextStyle textContent="Wishlist" textStyle="text-14" />
                    </div>
                  </motion.a>
                  <motion.a
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    href="/sell"
                    className="hover:text-green-600 transition-colors ease-in-out"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <Store className="h-5 w-5 hover:text-green-700" />
                      <TextStyle textContent="Sell" textStyle="text-14" />
                    </div>
                  </motion.a>
                </nav>
                <div className="  flex-1 flex flex-col items-end justify-end p-4">
                  <div className="flex flex-row items-center space-x-2 justify-center">
                    <LogIn />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

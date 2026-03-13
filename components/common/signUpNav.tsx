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
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import TextStyle from "./textStyle";
import Link from "next/link";

export default function SignUpNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>
        <div className="w-full bg-white px-2 shadow-md md:hidden">
          <div className="mx-auto flex items-center justify-between px-2 py-3 md:py-4">
            {/* Logo */}
            <div className="relative h-[50px] w-[100px]">
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
              className="rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {/* Navbar Links - Hidden on Mobile */}
            <nav className="z-23 hidden space-x-8 bg-white font-medium text-gray-700 md:flex">
              <a href="#home" className="transition-colors hover:text-blue-600">
                Home
              </a>
              <a
                href="#about"
                className="transition-colors hover:text-blue-600"
              >
                About
              </a>
              <a
                href="#services"
                className="transition-colors hover:text-blue-600"
              >
                Services
              </a>
              <a
                href="#contact"
                className="transition-colors hover:text-blue-600"
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
                className="fixed top-0 right-0 z-40 flex h-full w-2/6 flex-col border-l border-gray-200 bg-white shadow-lg md:hidden"
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
                <nav className="flex flex-col space-y-4 px-6 font-medium text-gray-700">
                  <motion.a
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    href="/"
                    className="transition-colors ease-in-out hover:text-green-600"
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
                    className="transition-colors ease-in-out hover:text-green-600"
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
                    className="transition-colors ease-in-out hover:text-green-600"
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
                    className="transition-colors ease-in-out hover:text-green-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <Store className="h-5 w-5 hover:text-green-700" />
                      <TextStyle textContent="Sell" textStyle="text-14" />
                    </div>
                  </motion.a>
                </nav>
                <div className="flex flex-1 flex-col items-end justify-end p-4">
                  <div className="flex flex-row items-center justify-center space-x-2">
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

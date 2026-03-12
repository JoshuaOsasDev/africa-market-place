"use client";

import Link from "next/link";
import { OrderDetails } from "@/types/order";
import { OrderItemCard } from "@/components/order/orderItemCard";
import { OrderDetailRow } from "@/components/order/orderDetailRow";
import { motion, Variants, Transition } from "framer-motion";

interface OrderSuccessClientProps {
  orderDetails: OrderDetails;
}

export function OrderSuccessClient({ orderDetails }: OrderSuccessClientProps) {
  const transitionEase: Transition["ease"] = [0.42, 0, 0.58, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: transitionEase,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: transitionEase,
      },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <motion.div
        className="w-full max-w-lg text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-2">
          <span className="text-2xl font-medium text-[#2E7D32] sm:text-3xl">
            Thank you!
          </span>
          <span className="text-2xl sm:text-3xl"> 🎉</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-8 text-2xl font-bold text-[#111827] sm:mb-10 sm:text-3xl lg:text-4xl"
        >
          Your order has been received
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mb-8 flex items-center justify-center gap-3 sm:mb-10 sm:gap-4"
        >
          {orderDetails.items.slice(0, 3).map((item, index) => (
            <motion.div key={item.id} variants={cardVariants} custom={index}>
              <OrderItemCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-8 px-4 sm:mb-10 sm:px-8"
        >
          <OrderDetailRow label="Order code" value={orderDetails.orderCode} />
          <OrderDetailRow label="Date" value={orderDetails.date} />
          <OrderDetailRow
            label="Total"
            value={`$${orderDetails.total.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          />
          <OrderDetailRow
            label="Payment method"
            value={orderDetails.paymentMethod}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/">
            <button className="rounded-full bg-[#2E7D32] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#246628] sm:px-12 sm:py-4 sm:text-base">
              Back to home
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { verifyEmailSchema } from "@/lib/utils/yupvalidation";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import TextStyle from "@/components/common/textStyle";
import OtpComponent from "@/components/common/otpComponent";
import DailyLayout from "@/components/common/vendorDailyLayout";
import BackButton from "@/components/common/backButton";
import { div } from "framer-motion/client";
import VerifyComp from "@/components/pageComponents/Auth/authVendor/verifyComp";

// Define TypeScript types for form values

const page = () => {
  return (
    <div>
      <VerifyComp />
    </div>
  );
};

export default page;

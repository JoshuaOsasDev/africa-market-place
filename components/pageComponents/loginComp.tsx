"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { loginSchema } from "@/lib/utils/yupvalidation";
import TextStyle from "../common/textStyle";
import { Eye, EyeOff, Mail } from "lucide-react";
import BackButton from "../common/backButton";
import DailyLayout from "../common/vendorDailyLayout";
import { toast, ToastContainer } from "react-toastify";

const LoginComp = () => {
  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const formOptions = { resolver: yupResolver(loginSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log(data);

    try {
      setLoader(true);
      // API calls here...
      toast.success("Success Notification", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <BackButton />
      <div className="flex flex-col md:space-x-15 md:flex-row ">
        <DailyLayout textStyle="mt-0" />
        <div className="flex flex-col md:bg-white md:p-10 md:rounded-lg md:pt-3 md:w-[500px] md:mt-5">
          {/* Logo – desktop only */}
          <div className="hidden md:block relative w-[100px] h-[50px]">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="africa market place logo"
                fill
                className="object-contain object-center"
              />
            </Link>
          </div>

          {/* Titles */}
          <TextStyle
            textContent="Hello Welcome back!"
            textStyle="text-[28px] text-[#111827] text-bold mt-4"
          />
          <TextStyle
            textContent="Enter your credentials to access your account"
            textStyle="text-[16px] text-[#667185]/80 text-bold"
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col w-full space-y-2"
          >
            {/* EMAIL */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-slate-700 text-sm font-medium">
                <TextStyle textContent="Email" textStyle="text-[16px]" />
              </label>

              <div className="flex items-center rounded-sm shadow border border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
                <input
                  {...register("email")}
                  placeholder="user@gmail.com"
                  className="flex-1 text-slate-700 text-sm font-medium focus:outline-none"
                />
                <Mail className="w-4 h-4 transition-colors group-focus-within:text-green-600" />
              </div>

              <p className="text-red-700 text-sm">{errors.email?.message}</p>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-slate-700 text-sm font-medium">
                <TextStyle textContent="Password" textStyle="text-[16px]" />
              </label>

              <div className="flex items-center rounded-sm shadow border border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
                <input
                  type={hidePassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="12345678"
                  className="flex-1 text-slate-700 text-sm font-medium focus:outline-none"
                />
                {!hidePassword ? (
                  <Eye
                    onClick={() => setHidePassword(true)}
                    className="w-4 h-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setHidePassword(false)}
                    className="w-4 h-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                  />
                )}
              </div>

              <p className="text-red-700 text-sm">{errors.password?.message}</p>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex flex-row justify-between items-center mt-1">
              <div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="w-3 h-3 text-[#2E7D32] rounded-full accent-[#2E7D32]"
                />
                <span className="text-zinc-600 text-[13px] ml-1">
                  Remember me for 30 days
                </span>
              </div>

              <Link href="/resetPassword">
                <TextStyle
                  textContent="Forgot Password"
                  textStyle="text-[#6b916d] text-[14px]"
                />
              </Link>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              disabled={loader}
              className="w-full h-[39px] bg-[#2E7D32] rounded-[27px] p-2.5 mt-4 hover:opacity-80 text-white text-sm font-semibold"
            >
              {loader ? "Please wait..." : "Login To Your Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex flex-row items-center space-x-2 my-6">
            <hr className="flex-1 border-[#F0F2F5]" />
            <TextStyle textContent="Or" textStyle="text-[#757575]" />
            <hr className="flex-1 border-[#F0F2F5]" />
          </div>

          {/* Google Button */}
          <div className="rounded-[28px] flex items-center justify-center space-x-2 bg-[#FAFAFA] hover:opacity-80 cursor-pointer h-[55px]">
            <Image
              src="/images/google.jpg"
              alt="google logo"
              width={20}
              height={20}
            />
            <TextStyle
              textContent="Continue with Google"
              textStyle="text-[#525252] text-[16px]"
            />
          </div>

          {/* FOOTER */}
          <div className="flex flex-row items-center mt-3 w-full justify-center space-x-1">
            <p className="text-slate-700/opacity-60 text-sm">New here?</p>
            <Link href="/register/vendor">
              <p className="text-[#2E7D32] text-sm font-semibold hover:opacity-80">
                Create an account
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;

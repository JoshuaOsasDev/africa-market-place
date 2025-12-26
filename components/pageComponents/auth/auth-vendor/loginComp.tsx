"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import TextStyle from "../../../common/textStyle";
import { Eye, EyeOff, Mail } from "lucide-react";
import BackButton from "../../../common/backButton";
import DailyLayout from "../../../common/vendorDailyLayout";
import { toast, ToastContainer } from "react-toastify";
import { loginSchema } from "@/lib/utility/yupvalidation";

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
    <div className="px-3 md:px-0 pt-2 mx-auto lg:mx-0">
      <ToastContainer />
      <BackButton />
      <div className="flex flex-col md:flex-row md:space-x-15">
        <DailyLayout textStyle="mt-5" />
        <div className="flex flex-col md:mt-5 md:w-full md:rounded-lg md:bg-white md:p-10 md:pt-3">
          {/* Logo – desktop only */}
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
            className="mt-4 flex w-full flex-col space-y-2"
          >
            {/* EMAIL */}
            <div className="flex w-full flex-col space-y-2">
              <label className="text-sm font-medium text-slate-700">
                <TextStyle textContent="Email" textStyle="text-[16px]" />
              </label>

              <div className="group flex h-[39px] items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] bg-white px-2.5 shadow transition-colors focus-within:border-green-600">
                <input
                  {...register("email")}
                  placeholder="user@gmail.com"
                  className="flex-1 text-sm font-medium text-slate-700 focus:outline-none"
                />
                <Mail className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
              </div>

              <p className="text-sm text-red-700">{errors.email?.message}</p>
            </div>

            {/* PASSWORD */}
            <div className="flex w-full flex-col space-y-2">
              <label className="text-sm font-medium text-slate-700">
                <TextStyle textContent="Password" textStyle="text-[16px]" />
              </label>

              <div className="group flex h-[39px] items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] bg-white px-2.5 shadow transition-colors focus-within:border-green-600">
                <input
                  type={hidePassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="12345678"
                  className="flex-1 text-sm font-medium text-slate-700 focus:outline-none"
                />
                {!hidePassword ? (
                  <Eye
                    onClick={() => setHidePassword(true)}
                    className="h-4 w-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setHidePassword(false)}
                    className="h-4 w-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                  />
                )}
              </div>

              <p className="text-sm text-red-700">{errors.password?.message}</p>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="mt-1 flex flex-row items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="h-3 w-3 rounded-full text-[#2E7D32] accent-[#2E7D32]"
                />
                <span className="ml-1 text-[13px] text-zinc-600">
                  Remember me for 30 days
                </span>
              </div>

              <Link href="/auth-vendor/resetPassword">
                <TextStyle
                  textContent="Forgot Password"
                  textStyle="text-[#6b916d] text-[14px]"
                />
              </Link>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              disabled={loader}
              className="mt-4 h-[39px] w-full rounded-[27px] bg-[#2E7D32] p-2.5 text-sm font-semibold text-white hover:opacity-80"
            >
              {loader ? "Please wait..." : "Login To Your Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex flex-row items-center space-x-2">
            <hr className="flex-1 border-[#F0F2F5]" />
            <TextStyle textContent="Or" textStyle="text-[#757575]" />
            <hr className="flex-1 border-[#F0F2F5]" />
          </div>

          {/* Google Button */}
          <div className="flex h-[55px] cursor-pointer items-center justify-center space-x-2 rounded-[28px] bg-[#FAFAFA] hover:opacity-80">
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
          <div className="mt-3 flex w-full flex-row items-center justify-center space-x-1">
            <p className="text-slate-700/opacity-60 text-sm">New here?</p>
            <Link href="/auth-vendor/register/vendor">
              <p className="text-sm font-semibold text-[#2E7D32] hover:opacity-80">
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

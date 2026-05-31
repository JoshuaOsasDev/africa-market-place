"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import covertwo from "../../../../lib/public/images/abot_africa_3.jpg";
//import logo from "../../../../lib/public/images/africa1_logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { signUpSchema } from "@/lib/utility/yupvalidation";
import TextStyle from "@/components/common/textStyle";
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { googleAuth, signUp } from "@/services/apiServices/authApi";
import { setLoaderAction, signInAction } from "@/redux/slices/user";
import { setWishlistAction } from "@/redux/slices/wishlist";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

const logo =
  "https://res.cloudinary.com/dtxai4k4r/image/upload/v1773526193/africa_market_place_desktop_banner_ww9s3x.png";

// Define TypeScript types for form values

const SignUpComp = () => {
  /* naviagtion */
  const router = useRouter();
  /* use dispatch */
  // const dispatch = useAppDispatch()

  const searchParam = useSearchParams();
  const redirect = searchParam.get("redirect");

  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

  /* yup validation and react hook form */

  //const formOptions = { resolver: yupResolver(signUpSchema) };

  const [isChecked, setIsChecked] = useState(false);

  /* check the box */
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const appLoader = useAppSelector((state) => state.user.loading);

  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      role: "vendor",
    },
  });

  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation({
    mutationFn: signUp,
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: string;
    confirmPassword: string;
  }) => {
    try {
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        ...data,
      });
      dispatch(signInAction(result.user));
      dispatch(setWishlistAction(result.user.wishlist));

      if (!result.user.isVerified) {
        toast.error(`Verification email has been sent to ${result.user.email}`);
        router.push("/auth-user/verifyOtp");
        return;
      }
      toast.success("user created successfully");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message || "Sign in failed, please try again.",
        );
      } else {
        toast.error("Unknown error");
      }
    } finally {
      dispatch(setLoaderAction(false));
    }
  };

  const loginWithGoogleFunc = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // tokenResponse.access_token
        dispatch(setLoaderAction(true));
        const result = await googleAuth(tokenResponse);

        dispatch(signInAction(result.data.user));
        dispatch(setWishlistAction(result.data.user.wishlist));
        toast.success("Login successfull");

        dispatch(setLoaderAction(false));
        const isAdmin = result.data.user?.role?.includes("admin");
        const isVendor = result.data.user?.role?.includes("vendor");
        const goto = redirect
          ? redirect
          : isAdmin
            ? "/admin/dashboard"
            : isVendor
              ? "/vendor/dashboard"
              : "/";

        router.push(goto);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(
            err?.response?.data?.message || "Sign in failed, please try again.",
          );
        } else {
          toast.error("Unknown error");
        }
      } finally {
        dispatch(setLoaderAction(false));
      }
    },

    onError: () => {
      toast.error("Google login failed");
      dispatch(setLoaderAction(false));
    },
  });

  return (
    <div className="flex min-h-screen w-full py-5">
      {/* ── LEFT PANEL ── */}
      <div className="relative hidden w-120 flex-col justify-between overflow-hidden bg-[#111f12] p-10 lg:flex">
        <Image
          src={covertwo}
          alt="signup cover"
          fill
          className="object-cover"
        />
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-80">
          {/* Mobile brand */}
          <Link
            href={"#"}
            className="relative mb-8 flex h-10 w-10 items-center gap-2 lg:hidden"
          >
            <Image src={logo} alt="logo" fill className="object-contain" />
          </Link>

          <h1 className="mb-1 font-serif text-[2rem] leading-tight text-[#111f12]">
            Create an account
          </h1>
          <p className="mb-7 text-sm text-[#7a8b7a]">
            Enter your details to get started for free.
          </p>

          {/* Google */}
          <button
            type="button"
            disabled={appLoader}
            onClick={() => loginWithGoogleFunc()}
            className="mb-5 flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-[#e2e8e2] bg-white text-sm font-medium text-[#2d3b2e] transition-all hover:border-[#2e7d32] hover:shadow-[0_0_0_3px_rgba(46,125,50,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {appLoader ? (
              "Please wait…"
            ) : (
              <>
                <Image
                  src="/images/google.jpg"
                  alt="Google"
                  width={18}
                  height={18}
                  className="rounded-sm"
                />
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e8ede8]" />
            <span className="text-[11px] tracking-widest text-[#a0b0a0] uppercase">
              or
            </span>
            <div className="h-px flex-1 bg-[#e8ede8]" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374837]">
                First Name
              </label>
              <div className="group flex h-11 items-center gap-2 rounded-xl border border-[#e2e8e2] bg-white px-3.5 transition-all focus-within:border-[#2e7d32]">
                <input
                  {...register("firstName")}
                  placeholder="John"
                  className="h-full flex-1 bg-transparent text-sm text-[#1a2e1b] placeholder-[#c0d0c0] outline-none"
                />
                <User className="h-3.5 w-3.5 shrink-0 text-[#b0c0b0] transition-colors group-focus-within:text-[#2e7d32]" />
              </div>
              {errors.firstName?.message && (
                <p className="text-xs text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374837]">
                Last Name
              </label>
              <div className="group flex h-11 items-center gap-2 rounded-xl border border-[#e2e8e2] bg-white px-3.5 transition-all focus-within:border-[#2e7d32]">
                <input
                  {...register("lastName")}
                  placeholder="Doe"
                  className="h-full flex-1 bg-transparent text-sm text-[#1a2e1b] placeholder-[#c0d0c0] outline-none"
                />
                <User className="h-3.5 w-3.5 shrink-0 text-[#b0c0b0] transition-colors group-focus-within:text-[#2e7d32]" />
              </div>
              {errors.lastName?.message && (
                <p className="text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374837]">
                Email address
              </label>
              <div className="group flex h-11 items-center gap-2 rounded-xl border border-[#e2e8e2] bg-white px-3.5 transition-all focus-within:border-[#2e7d32]">
                <input
                  {...register("email")}
                  placeholder="you@example.com"
                  className="h-full flex-1 bg-transparent text-sm text-[#1a2e1b] placeholder-[#c0d0c0] outline-none"
                />
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-[#b0c0b0] transition-colors group-focus-within:text-[#2e7d32]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              {errors.email?.message && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374837]">
                Phone
              </label>
              <div className="group flex h-11 items-center gap-2 rounded-xl border border-[#e2e8e2] bg-white px-3.5 transition-all focus-within:border-[#2e7d32]">
                <input
                  {...register("phone")}
                  placeholder="07000000000"
                  className="h-full flex-1 bg-transparent text-sm text-[#1a2e1b] placeholder-[#c0d0c0] outline-none"
                />
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#b0c0b0] transition-colors group-focus-within:text-[#2e7d32]" />
              </div>
              {errors.phone?.message && (
                <p className="text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374837]">
                Password
              </label>
              <div className="group flex h-11 items-center gap-2 rounded-xl border border-[#e2e8e2] bg-white px-3.5 transition-all focus-within:border-[#2e7d32]">
                <input
                  type={hidePassword ? "password" : "text"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="h-full flex-1 bg-transparent text-sm text-[#1a2e1b] placeholder-[#c0d0c0] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setHidePassword(!hidePassword)}
                  className="shrink-0 text-[#b0c0b0] transition-colors group-focus-within:text-[#2e7d32]"
                >
                  {hidePassword ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <p className="text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374837]">
                Confirm Password
              </label>
              <div className="group flex h-11 items-center gap-2 rounded-xl border border-[#e2e8e2] bg-white px-3.5 transition-all focus-within:border-[#2e7d32]">
                <input
                  type={hideConfirmPassword ? "password" : "text"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className="h-full flex-1 bg-transparent text-sm text-[#1a2e1b] placeholder-[#c0d0c0] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                  className="shrink-0 text-[#b0c0b0] transition-colors group-focus-within:text-[#2e7d32]"
                >
                  {hideConfirmPassword ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword?.message && (
                <p className="text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374837]">
                Role
              </label>
              <div className="group flex h-11 items-center gap-2 rounded-xl border border-[#e2e8e2] bg-white px-3.5 transition-all focus-within:border-[#2e7d32]">
                <input
                  {...register("role")}
                  readOnly
                  placeholder="Doe"
                  className="h-full flex-1 bg-transparent text-sm text-[#1a2e1b] placeholder-[#c0d0c0] outline-none"
                />
                <User className="h-3.5 w-3.5 shrink-0 text-[#b0c0b0] transition-colors group-focus-within:text-[#2e7d32]" />
              </div>
              {errors.role?.message && (
                <p className="text-xs text-red-600">{errors.role.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <label className="flex cursor-pointer items-start gap-2 text-[13px] text-[#5a6b5a]">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckBox}
                className="mt-0.5 h-3.5 w-3.5 rounded accent-[#2e7d32]"
              />
              <span>
                By continuing you agree to the{" "}
                <span
                  onClick={() => console.log("now")}
                  className="cursor-pointer font-medium text-[#2e7d32] hover:opacity-70"
                >
                  Term of Service
                </span>{" "}
                and{" "}
                <span className="cursor-pointer font-medium text-[#2e7d32] hover:opacity-70">
                  Privacy Policy
                </span>{" "}
                of Africa market place.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isChecked || appLoader}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#2e7d32] text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:cursor-pointer hover:bg-[#236027] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {appLoader ? "Please wait…" : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-[13.5px] text-[#7a8b7a]">
            Already have an account?{" "}
            <Link
              href="/auth-user/login"
              className="font-semibold text-[#2e7d32] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpComp;

// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import BackButton from "@/components/common/backButton";
// import DailyLayout from "@/components/common/vendorDailyLayout";
// import TextStyle from "@/components/common/textStyle";
// import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
// import Image from "next/image";
// import { signUpSchema } from "@/lib/utility/yupvalidation";

// type SignUpFormValues = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
// };

// const SignUpComp = () => {
//   const router = useRouter();

//   const [loginCredential, setLoginCredential] = useState({
//     email: "",
//     password: "",
//   });

//   const [startApiLogin, setStartApiLogin] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [startApiCall, setStartApiCall] = useState(false);
//   const [hidePassword, setHidePassword] = useState(false);
//   const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

//   const formOptions = { resolver: yupResolver(signUpSchema) };

//   const [isChecked, setIsChecked] = useState(false);

//   const toggleCheckBox = () => {
//     setIsChecked(!isChecked);
//   };

//   const [form, setForm] = useState<{
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     password: string;
//     confirmPassword: string;
//   }>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpFormValues>({
//     resolver: yupResolver(signUpSchema),
//   });

//   const onSubmit = async (data: SignUpFormValues) => {
//     if (!isChecked) return;
//     //console.log(data, "data");

//     try {
//       setLoader(!loader);
//       setStartApiCall(!startApiCall);
//       setLoginCredential({
//         email: data.email,
//         password: data.password,
//       });
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log("Error message:", error.message);
//       } else {
//         console.log("Unknown error:", error);
//       }
//     } finally {
//       setLoader(false);
//     }
//   };

//   return (
//     <div className="">
//       <BackButton />

//       <div className="flex flex-col md:flex-row md:space-x-10">
//         <DailyLayout textStyle="mt-10 " />

//         <div className="flex w-full flex-col md:mt-5 md:rounded-lg md:bg-white md:p-10 md:pt-3">
//           <div className="relative hidden h-[50px] w-[100px] md:block">
//             <Link href="/">
//               <Image
//                 src="/images/logo.png"
//                 alt="africa market place logo"
//                 fill
//                 className="object-contain object-center"
//               />
//             </Link>
//           </div>

//           <TextStyle
//             textContent="Sign Up"
//             textStyle="text-[28px] text-[#111827] text-bold mt-4"
//           />
//           <TextStyle
//             textContent="Enter your credentials to access your account"
//             textStyle="text-[16px] text-[#667185]/80 text-bold"
//           />

//           <div className="w-full">
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="mt-4 flex w-full flex-col space-y-2"
//             >
//               {/* FIRST NAME */}
//               <div className="flex w-full flex-col space-y-2">
//                 <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//                   <TextStyle
//                     textContent="First Name"
//                     textStyle="text-[16px] text-[##667185] text-bold"
//                   />
//                 </label>
//                 <div className="group mr-3 flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] bg-white px-2.5 shadow transition-colors focus-within:border-green-600">
//                   <input
//                     {...register("firstName")}
//                     placeholder="First name"
//                     className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//                   />
//                   <User className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
//                 </div>
//                 <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//                   {errors.firstName?.message}
//                 </p>
//               </div>

//               {/* LAST NAME */}
//               <div className="flex w-full flex-col space-y-2">
//                 <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//                   <TextStyle
//                     textContent="Last Name"
//                     textStyle="text-[16px] text-[##667185] text-bold"
//                   />
//                 </label>
//                 <div className="group mr-3 flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] bg-white px-2.5 shadow transition-colors focus-within:border-green-600">
//                   <input
//                     {...register("lastName")}
//                     placeholder="Last name"
//                     className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//                   />
//                   <User className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
//                 </div>
//                 <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//                   {errors.lastName?.message}
//                 </p>
//               </div>

//               {/* Email Field */}
//               <div className="mb-2 flex w-full flex-col space-y-2 md:w-full">
//                 <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//                   <TextStyle
//                     textContent="Email"
//                     textStyle="text-[16px] text-[##667185] text-bold"
//                   />
//                 </label>
//                 <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] bg-white px-2.5 shadow transition-colors focus-within:border-green-600">
//                   <input
//                     {...register("email")}
//                     placeholder="user@gmail.com"
//                     className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//                   />
//                   <Mail className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
//                 </div>
//                 <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//                   {errors.email?.message}
//                 </p>
//               </div>

//               {/* Phone Field */}
//               <div className="mb-2 flex w-full flex-col space-y-2 md:w-full">
//                 <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//                   <TextStyle
//                     textContent="Phone"
//                     textStyle="text-[16px] text-[#667185] text-bold"
//                   />
//                 </label>
//                 <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] bg-white px-2.5 shadow transition-colors focus-within:border-green-600">
//                   <input
//                     {...register("phone")}
//                     placeholder="07000000000"
//                     className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//                   />
//                   <Phone className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
//                 </div>
//                 <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//                   {errors.phone?.message}
//                 </p>
//               </div>

//               {/* Password Field */}
//               <div className="mb-2 flex w-full flex-col space-y-2 md:w-full">
//                 <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//                   <TextStyle
//                     textContent="Password"
//                     textStyle="text-[16px] text-[##667185] text-bold"
//                   />
//                 </label>
//                 <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] bg-white px-2.5 shadow transition-colors focus-within:border-green-600">
//                   <input
//                     type={hidePassword ? "password" : "text"}
//                     {...register("password")}
//                     placeholder="12345678"
//                     className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//                   />
//                   {!hidePassword ? (
//                     <Eye
//                       onClick={() => setHidePassword(!hidePassword)}
//                       className="h-4 w-4 transition-colors group-focus-within:text-green-600"
//                     />
//                   ) : (
//                     <EyeOff
//                       onClick={() => setHidePassword(!hidePassword)}
//                       className="h-4 w-4 transition-colors group-focus-within:text-green-600"
//                     />
//                   )}
//                 </div>
//                 <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//                   {errors.password?.message}
//                 </p>
//               </div>

//               {/* Confirm Password Field */}
//               <div className="mb-3 flex w-full flex-col space-y-2 md:w-full">
//                 <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//                   <TextStyle
//                     textContent="Confirm Password"
//                     textStyle="text-[16px] text-[##667185] text-bold"
//                   />
//                 </label>
//                 <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] bg-white px-2.5 shadow transition-colors focus-within:border-green-600">
//                   <input
//                     type={hideConfirmPassword ? "password" : "text"}
//                     {...register("confirmPassword")}
//                     placeholder="12345678"
//                     className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//                   />
//                   {!hideConfirmPassword ? (
//                     <Eye
//                       onClick={() =>
//                         setHideConfirmPassword(!hideConfirmPassword)
//                       }
//                       className="h-4 w-4 transition-colors group-focus-within:text-green-600"
//                     />
//                   ) : (
//                     <EyeOff
//                       onClick={() =>
//                         setHideConfirmPassword(!hideConfirmPassword)
//                       }
//                       className="h-4 w-4 transition-colors group-focus-within:text-green-600"
//                     />
//                   )}
//                 </div>
//                 <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//                   {errors.password?.message}
//                 </p>
//               </div>

//               {/* Terms and Condition Section */}
//               <div className="w-full flex-1 flex-row flex-wrap items-start">
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={toggleCheckBox}
//                   className="h-3 w-3 overflow-hidden rounded-full border-gray-300 bg-gray-100 text-[#2E7D32] accent-[#2E7D32] checked:bg-[#2E7D32] focus:ring-[#2E7D32] dark:bg-[#2E7D32]"
//                 />
//                 <span className="ml-1 font-['Aeonik-Regular'] text-[13px] font-medium text-zinc-600">
//                   By continuing you agree to the{" "}
//                 </span>
//                 <span onClick={() => console.log(`now`)}>
//                   <span className="font-['Aeonik-Medium'] text-[13px] leading-5 font-medium text-[#2E7D32]">
//                     Term of Service{" "}
//                   </span>
//                 </span>
//                 <span className="text-[13px] font-medium text-zinc-600">
//                   and{" "}
//                 </span>
//                 <span>
//                   <span className="text-[13px] font-medium text-[#2E7D32]">
//                     Privacy Policy{" "}
//                   </span>
//                 </span>

//                 <span className="text-[13px] leading-5 font-medium text-zinc-600">
//                   of Africa market place.
//                 </span>
//               </div>

//               {/* Submit Button */}
//               <button
//                 disabled={!isChecked || loader}
//                 className={`mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] p-2.5 hover:opacity-80 ${
//                   !isChecked ? "bg-opacity-70 bg-[#6b916d]" : "bg-[#2E7D32]"
//                 }`}
//               >
//                 <span className="text-sm leading-[18.90px] font-semibold text-white">
//                   {loader ? "Please wait.." : "Create Account"}
//                 </span>
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="my-6 flex flex-row items-center space-x-2">
//               <hr className="border-px h-[0.5px] flex-1 border-[#F0F2F5]" />
//               <TextStyle textContent="Or" textStyle="text-[#757575]" />
//               <hr className="h-[0.5px] flex-1 border-[#F0F2F5]" />
//             </div>

//             {/* Google Sign Up */}
//             <div className="flex h-[55px] cursor-pointer items-center justify-center space-x-2 rounded-[28px] bg-[#FAFAFA] hover:opacity-80">
//               <Image
//                 src="/images/google.jpg"
//                 alt="google logo"
//                 width={20}
//                 height={20}
//               />
//               <TextStyle
//                 textContent="Continue with Google"
//                 textStyle="text-[#525252] text-[16px] text-bold"
//               />
//             </div>
//           </div>

//           {/* Login Link */}
//           <div className="mt-3 flex w-full flex-row items-center justify-center space-x-1">
//             <p className="text-slate-700/opacity-60 font-['Inter'] text-sm leading-[18px] font-medium">
//               Already have an account?
//             </p>
//             <Link href="/auth-vendor/login">
//               <p className="font-['Inter'] text-sm leading-[18.90px] font-semibold text-[#6b916d] hover:opacity-80">
//                 Login
//               </p>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpComp;

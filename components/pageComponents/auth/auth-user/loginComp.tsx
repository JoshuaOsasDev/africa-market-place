"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { toast } from "react-hot-toast";

import coverOne from "../../../../lib/public/images/cover_login.jpg";
import logo from "../../../../lib/public/images/africa1_logo.png";

import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/lib/utility/yupvalidation";
import TextStyle from "@/components/common/textStyle";
import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth, signIn } from "@/services/apiServices/authApi";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoaderAction, signInAction } from "@/redux/slices/user";
import { setWishlistAction } from "@/redux/slices/wishlist";

const LoginComp = () => {
  /* naviagtion */
  const router = useRouter();

  /* use dispatch */
  const dispatch = useAppDispatch();

  /* get the app state */
  const appLoader = useAppSelector((state) => state.user.loading);

  const [hidePassword, setHidePassword] = useState(false);

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(loginSchema) };

  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const searchParam = useSearchParams();
  const redirect = searchParam.get("redirect");

  const [isChecked, setIsChecked] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      // invalidate wishlist and all categories after successful login

      queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-categories"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  /* check the box */
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

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

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        ...data,
        rememberMe: isChecked,
      });
      dispatch(signInAction(result));
      //dispatch(signInAction(result.token));
      dispatch(setWishlistAction(result.user.wishlist));

      if (!result.user.isVerified) {
        toast.error("Email not verified");

        router.push("/auth-user/verifyOtp");
        return;
      }
      const isAdmin = result.user?.role?.includes("admin");
      const isVendor = result.user?.role?.includes("vendor");
      const shop = result.user?.shop;
      console.log(isVendor, shop, "Shop");
      const goto = redirect
        ? redirect
        : isAdmin
          ? "/admin/dashboard"
          : isVendor
            ? "/vendor/dashboard"
            : "/";
      if (shop === null && isVendor) router.push("/vendor/shop");
      else router.push(goto);

      toast.success("Logged in successfully!");
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

  return (
    <div className="flex w-full">
      {/* ── LEFT PANEL ── */}
      <div className="relative hidden w-120 flex-col justify-between overflow-hidden bg-[#111f12] p-10 lg:flex">
        <Image
          src={coverOne}
          alt="login cover one"
          fill
          className="object-cover"
        />
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-100">
          {/* Mobile brand */}
          <Link
            href={"/"}
            className="relative mb-8 flex h-10 w-10 items-center gap-2 lg:hidden"
          >
            <Image src={logo} alt="logo" fill className="object-contain" />
          </Link>

          <h1 className="mb-1 font-serif text-[2rem] leading-tight text-[#111f12]">
            Welcome back
          </h1>
          <p className="mb-7 text-sm text-[#7a8b7a]">
            Enter your credentials to access your account.
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#5a6b5a]">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="h-3.5 w-3.5 rounded accent-[#2e7d32]"
                />
                Remember me for 30 days
              </label>
              <Link
                href="/auth-user/sendOtp/forgetPassword"
                className="text-[13px] font-medium text-[#2e7d32] transition-opacity hover:opacity-70"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={appLoader}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#2e7d32] text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:cursor-pointer hover:bg-[#236027] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {appLoader ? "Please wait…" : "Sign in to your account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-[13.5px] text-[#7a8b7a]">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth-user/register"
              className="font-semibold text-[#2e7d32] hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;

"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { toast } from "react-hot-toast";

import coverOne from "../../../../lib/public/images/cover_login.jpg";
//import logo from "../../../../lib/public/images/africa1_logo.png";

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

// Fallback high-res desktop banner asset hosted via Cloudinary
const logo =
  "https://res.cloudinary.com/dtxai4k4r/image/upload/v1773526193/africa_market_place_desktop_banner_ww9s3x.png";

/**
 * LoginComp Component
 * Handles traditional email/password login as well as Google OAuth identity flows.
 * Manages user session hydration into Redux and conditional onboarding/dashboard redirects.
 */
const LoginComp = () => {
  /* navigation */
  const router = useRouter();

  /* use dispatch */
  const dispatch = useAppDispatch();

  /* get the app state */
  const appLoader = useAppSelector((state) => state.user.loading);

  // Toggles password input visibility between 'text' and 'password'
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

  // Intercepts URL search parameters to locate potential downstream redirection paths (e.g., ?redirect=/checkout)
  const searchParam = useSearchParams();
  const redirect = searchParam.get("redirect");

  const [isChecked, setIsChecked] = useState(false);
  const queryClient = useQueryClient();

  /**
   * Traditional Credentials Sign-In Mutation
   * Invalidates cached user data pools upon successful server confirmation to force state sync.
   */
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

  // React Hook Form initialization bound to the configuration schema rules
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  /**
   * Google OAuth Third-Party Authentication Handler
   * Exchanges client identity tokens for localized backend JWT credentials.
   */
  const loginWithGoogleFunc = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // tokenResponse.access_token
        dispatch(setLoaderAction(true));
        const result = await googleAuth(tokenResponse);
        //console.log(result, "user and token from google auth");
        // Hydrate backend profile data directly into the application state trees
        dispatch(signInAction(result.data));
        dispatch(setWishlistAction(result.data.user.wishlist));

        toast.success("Login successfull");

        dispatch(setLoaderAction(false));

        // Evaluate access scopes for dynamic route steering
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
        console.log(err, "error");
        // if (err instanceof AxiosError) {
        //   toast.error(
        //     err?.response?.data?.message || "Sign in failed, please try again.",
        //   );
        // } else {
        //   toast.error("Unknown error");
        // }
      } finally {
        dispatch(setLoaderAction(false));
      }
    },

    onError: () => {
      toast.error("Google login failed");
      dispatch(setLoaderAction(false));
    },
  });

  /**
   * Standard Credentials Form Submission Handler
   * Submits verified inputs, manages OTP verification status checks, and handles structural role routing.
   */
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        ...data,
        rememberMe: isChecked, // Binds authorization expiration window adjustments
      });
      dispatch(signInAction(result));
      //dispatch(signInAction(result.token));
      dispatch(setWishlistAction(result.user.wishlist));

      // Guard condition forcing unverified profiles into the OTP confirmation workflow
      if (!result.user.isVerified) {
        toast.error("Email not verified");

        router.push("/auth-user/verifyOtp");
        return;
      }

      // Structural Role Assessment
      const isAdmin = result.user?.role?.includes("admin");
      const isVendor = result.user?.role?.includes("vendor");
      const shop = result.user?.shop;
      // console.log(isVendor, shop, "Shop");

      const goto = redirect
        ? redirect
        : isAdmin
          ? "/admin/dashboard"
          : isVendor
            ? "/vendor/dashboard"
            : "/";

      // Edge case: Redirect missing-shop vendor profiles down the shop setup tunnel instead of the main panel
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
      {/* Structural Desktop Graphic Wrapper; hidden on lower viewport breakpoints */}
      <div className="relative hidden w-120 flex-col justify-between overflow-hidden bg-[#111f12] p-10 lg:flex">
        <Image
          src={coverOne}
          alt="login cover one"
          fill
          className="object-cover"
        />
      </div>

      {/* ── RIGHT PANEL ── */}
      {/* Core interactive control pane housing brand anchors and forms */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-100">
          {/* Mobile brand - Only visible on small viewports when the desktop graphic panel breaks away */}
          <Link
            href={"/"}
            className="relative mb-8 flex h-20 w-20 items-center gap-2 lg:hidden"
          >
            <Image src={logo} alt="logo" fill className="object-cover" />
          </Link>

          <h1 className="mb-1 font-serif text-[2rem] leading-tight text-[#111f12]">
            Welcome back
          </h1>
          <p className="mb-7 text-sm text-[#7a8b7a]">
            Enter your credentials to access your account.
          </p>

          {/* Google Federated Identity Action Mechanism */}
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

          {/* Semantic Input Method Divider Element */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e8ede8]" />
            <span className="text-[11px] tracking-widest text-[#a0b0a0] uppercase">
              or
            </span>
            <div className="h-px flex-1 bg-[#e8ede8]" />
          </div>

          {/* Core Credentials Input Framework Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* Email Address Form Slice */}
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

            {/* Password Verification Form Slice */}
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

            {/* Remember Device Configuration + Recovery Action Entrypoints */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-0.5 text-[13px] text-[#5a6b5a] md:gap-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="h-3.5 w-3.5 rounded accent-[#2e7d32]"
                />
                <p className="text-[13px]">Remember me</p>
              </label>
              <Link
                href="/auth-user/sendOtp/forgetPassword"
                className="text-[13px] font-medium text-[#2e7d32] transition-opacity hover:opacity-70"
              >
                <p className=""> Forgot password?</p>
              </Link>
            </div>

            {/* Programmatic Call To Action Pipeline Submission Trigger */}
            <button
              type="submit"
              disabled={appLoader}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#2e7d32] text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:cursor-pointer hover:bg-[#236027] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {appLoader ? "Please wait…" : "Sign in to your account"}
            </button>
          </form>

          {/* Alternative Account Registration Navigation Linkage */}
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

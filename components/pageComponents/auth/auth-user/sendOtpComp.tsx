"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { notFound, useRouter } from "next/navigation";
import coverOne from "../../../../lib/public/images/cover_login.jpg";
import { AxiosError } from "axios";
import { KeyRound, Mail } from "lucide-react";
import TextStyle from "@/components/common/textStyle";
import { verifyEmailSchema } from "@/lib/utility/yupvalidation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoaderAction } from "@/redux/slices/user";
import { useMutation } from "@tanstack/react-query";
import {
  forgetPasswordApi,
  sendVerificationOtp,
} from "@/services/apiServices/authApi";
import toast from "react-hot-toast";
import Image from "next/image";

const SendOtpcomp = ({ url }: { url: string }) => {
  /* naviagtion */
  const router = useRouter();
  /* use dispatch */
  const dispatch = useAppDispatch();

  const [newUrl, setNewUrl] = useState("");
  //console.log("url passed", url);

  const appState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (url !== "forgetPassword" && url !== "verifyEmail") {
      router.push("/");
    }
    setNewUrl(url);
  }, []);

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(verifyEmailSchema) };

  const [form, setForm] = useState<{
    email: string;
  }>({
    email: "",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const { mutateAsync } = useMutation({
    mutationFn:
      newUrl === "verifyEmail" ? sendVerificationOtp : forgetPasswordApi,
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        ...data,
      });

      toast.success("Password verification link sent to your mail");
      dispatch(setLoaderAction(false));
      newUrl === "verifyEmail" && router.push("/auth-user/verifyOtp");
    } catch (err) {
      // console.log("error", err);
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message || "Failed to send otp... Pls retry.",
        );
      } else {
        toast.error("Unknown error");
      }
    } finally {
      dispatch(setLoaderAction(false));
    }
  };

  const isForgetPassword = newUrl === "forgetPassword";
  return (
    <div className="flex min-h-[420px] w-full">
      {/* ── LEFT PANEL ── */}
      <div className="relative hidden w-[360px] shrink-0 overflow-hidden lg:block">
        <Image src={coverOne} alt="login cover" fill className="object-cover" />
        {/* subtle dark overlay for depth */}
        <div className="absolute inset-0 bg-[#111f12]/40" />
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-12">
        {/* Icon badge */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#2E7D32]/10">
          <KeyRound className="h-5 w-5 text-[#2E7D32]" strokeWidth={1.8} />
        </div>

        {/* Heading */}
        <h1 className="text-[22px] leading-snug font-semibold tracking-[-0.02em] text-[#1A1A1A]">
          {newUrl === "verifyEmail"
            ? "Email Verification"
            : "Lost your password?"}
        </h1>

        {/* Sub-copy — only shown for forget password */}
        {isForgetPassword && (
          <p className="mt-2 max-w-[320px] text-[13.5px] leading-[1.6] text-[#667185]">
            Supply us with the email address you registered with and we'll send
            you a link to reset your password.
          </p>
        )}

        {/* Divider */}
        <div className="my-5 h-px w-full bg-[#F0F0F0]" />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-[360px] flex-col space-y-4"
        >
          <div className="flex flex-col space-y-1.5">
            <label className="text-[13px] font-medium text-[#344054]">
              Email address
            </label>

            <div className="group flex h-[42px] items-center overflow-hidden rounded-lg border border-[#E4E7EC] bg-white px-3 shadow-sm transition-all focus-within:border-[#2E7D32] focus-within:ring-2 focus-within:ring-[#2E7D32]/10">
              {newUrl === "verifyEmail" ? (
                <input
                  {...register("email")}
                  value={appState.user?.email || ""}
                  placeholder="you@example.com"
                  className="h-full flex-1 bg-transparent text-[13.5px] font-medium text-[#1A1A1A] placeholder:text-[#98A2B3] focus:outline-none"
                />
              ) : (
                <input
                  {...register("email")}
                  placeholder="you@example.com"
                  className="h-full flex-1 bg-transparent text-[13.5px] font-medium text-[#1A1A1A] placeholder:text-[#98A2B3] focus:outline-none"
                />
              )}
              <Mail className="h-4 w-4 shrink-0 text-[#98A2B3] transition-colors group-focus-within:text-[#2E7D32]" />
            </div>

            {errors.email?.message && (
              <p className="text-[12px] font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={appState.loading}
            className="mt-1 inline-flex h-[42px] w-full cursor-pointer items-center justify-center rounded-full bg-[#2E7D32] text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {appState.loading ? "Please wait…" : "Send Reset Link"}
          </button>
        </form>

        {/* Hint text */}
        <p className="mt-5 text-[12.5px] text-[#98A2B3]">
          Check your inbox (and spam folder) after submitting.
        </p>
      </div>
    </div>
  );
};

export default SendOtpcomp;

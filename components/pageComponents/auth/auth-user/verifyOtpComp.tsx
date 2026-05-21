"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import Image from "next/image";
import TextStyle from "@/components/common/textStyle";
import OtpComponent from "@/components/common/otpComponent";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoaderAction } from "@/redux/slices/user";
import toast from "react-hot-toast";
import { verifyOTP } from "@/services/apiServices/authApi";
import OtpTimer from "./timer";

/**
 * VerifyOtpComp Component
 * Manages the multi-factor or registration OTP (One-Time Password) confirmation layout.
 * Listens for state complete changes to auto-dispatch submission payloads to the backend API.
 */
const VerifyOtpComp = () => {
  /* navigation */
  const router = useRouter();

  /* use dispatch */
  const dispatch = useAppDispatch();

  // Extract the underlying authenticated profile from the global Redux store to identify target context
  const appState = useAppSelector((state) => state.user.user);
  console.log(appState);

  // Track continuous multi-character string input matching the slot verification values
  const [otp, setOtp] = useState("");

  /* TanStack Query mutation pipeline for payload transport isolation */
  const { mutateAsync } = useMutation({
    mutationFn: verifyOTP,
  });

  /**
   * Side-Effect Orchestration Hook
   * 1. Protects the view by redirecting unidentifiable web sessions lacking basic email variables.
   * 2. Auto-triggers form completion submission routines the precise moment characters reach exactly 5 digits.
   */
  useEffect(() => {
    // Session Presence Guard Check
    if (!appState?.email) {
      router.push("/auth-user/login");
      return;
    }

    // Programmatic auto-submission when the character length parameter matches the structural backend target
    if (otp.length === 5) {
      handleSubmit({
        otp: otp.toString(),
        email: appState?.email,
      });
    }
  }, [otp]);

  /**
   * Core OTP Validation Handler
   * Dispatches validation requirements to backend endpoints, triggers micro global status overlays, and manages routing targets.
   */
  const handleSubmit = async (data: { otp: string; email: string }) => {
    try {
      // Inline secondary validation guard block protecting execution context values
      if (!appState?.email) {
        router.push("/auth-user/sendOpt");
        return;
      }

      // Initialize layout loaders across global visual structures
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        ...data,
      });

      toast.success(result.message);
      dispatch(setLoaderAction(false));

      // Direct validated targets clean back out onto the sign-in lane to re-authenticate session profiles
      router.push("/auth-user/login");
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
      // Relinquish component layouts from global blocking operations across exceptions
      dispatch(setLoaderAction(false));
    }
  };

  return (
    <div className="my-4 flex flex-col">
      {/* ── SECURITY ILLUSTRATION BANNER ── */}
      <div className="relative mx-auto h-[146px] w-[116px]">
        <Image
          src="/images/lock.jpg"
          alt="otp logo"
          fill
          sizes="116px"
          className="object-contain"
          priority
        />
      </div>

      {/* ── CONTEXT INTERACTION WRAPPERS ── */}
      {/* Identifies active structural contexts based on responding registration parameters */}
      <TextStyle
        textContent={`We just emailed ${appState?.email}`}
        textStyle="text-2xl sm:text-xl text-[#111827] text-bold text-center"
      />
      <TextStyle
        textContent="Please enter the code we emailed you."
        textStyle="text-[16px] text-[#667185] text-bold text-center"
      />

      {/* ── SEGMENTED CHAR INPUT INTERFACE ── */}
      {/* Houses character parsing matrices mapping single values down to strings */}
      <div className="mx-auto my-6 flex w-full items-center justify-center">
        <OtpComponent otp={otp} setOtp={setOtp} />
      </div>

      {/* ── RE-SEND STRATEGY TIMERS ── */}
      {/* Throttles client request generation frequencies via dynamic internal clock counts */}
      <div className="flex flex-row space-x-2">
        <OtpTimer />
      </div>
    </div>
  );
};

export default VerifyOtpComp;

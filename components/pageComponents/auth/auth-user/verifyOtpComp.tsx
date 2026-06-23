"use client";
import { useCallback, useEffect, useState, useRef } from "react";

import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import Image from "next/image";
import TextStyle from "@/components/common/textStyle";
import OtpComponent from "@/components/common/otpComponent";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoaderAction } from "@/redux/slices/user";
import toast from "react-hot-toast";
import { sendVerificationOtp, verifyOTP } from "@/services/apiServices/authApi";
import OtpTimer from "./timer";

/**
 * VerifyOtpComp Component
 * Manages the multi-factor or registration OTP confirmation layout.
 * Listens for state changes to auto-dispatch submission payloads.
 */
const VerifyOtpComp = () => {
  /* navigation */
  const router = useRouter();

  /* use dispatch */
  const dispatch = useAppDispatch();

  // Extract authenticated profile from Redux
  const appState = useAppSelector((state) => state.user.user);

  // Track character input matching slot verification values
  const [otp, setOtp] = useState("");

  // Prevent duplicate execution or running on landing if sent by register flow
  const hasSentInitialOtp = useRef(false);

  /* TanStack Query mutation pipeline */
  const { mutateAsync } = useMutation({
    mutationFn: verifyOTP,
  });

  const { mutateAsync: sendOtp } = useMutation({
    mutationFn: sendVerificationOtp,
  });

  //console.log(hasSentInitialOtp.current, "has fired ref");
  /**
   * Core OTP Validation Handler
   * Wrapped in useCallback to prevent infinite loops in downstream dependency arrays.
   */
  const handleSubmit = useCallback(
    async (data: { otp: string; email: string }) => {
      try {
        if (!appState?.email) {
          router.push("/auth-user/sendOpt");
          return;
        }

        // Initialize global visual loader
        dispatch(setLoaderAction(true));

        const result = await mutateAsync({ ...data });

        toast.success(result.message || "Verification successful");
        dispatch(setLoaderAction(false));

        // Direct validated targets back to sign-in lane
        router.push("/");
      } catch (err) {
        console.error("Error verifying OTP:", err);
        if (err instanceof AxiosError) {
          toast.error(
            err.response?.data?.message ||
              "Failed to verify code. Please retry.",
          );
        } else {
          toast.error("Unknown error occurred");
        }
      } finally {
        dispatch(setLoaderAction(false));
      }
    },
    [appState?.email, router, mutateAsync, dispatch],
  );

  /**
   * Side-Effect Hook for Initial OTP Trigger
   * Skips execution if the backend already triggers an automated email during registration.
   */
  useEffect(() => {
    const sendInitialOtp = async () => {
      // Guard clauses: exit if no email exists, or if we want to skip running on registration landing
      if (!appState?.email || hasSentInitialOtp.current) return;

      try {
        // Set reference flag immediately to block execution races
        hasSentInitialOtp.current = true;

        // REMARK: If your registration backend endpoint already sends the OTP automatically,
        // you can completely comment out or remove the 'await sendOtp' call below.
        await sendOtp({ email: appState.email });
      } catch (error) {
        console.error("Failed to send initial OTP:", error);
      }
    };

    sendInitialOtp();
  }, [appState?.email, sendOtp]);

  /**
   * Monitor Input Length for Auto-Submission
   */
  useEffect(() => {
    // Session Presence Guard Check
    if (!appState?.email) {
      router.push("/auth-user/login");
      return;
    }

    // Programmatic auto-submission when digits match target length (5 characters)
    if (otp.length === 5) {
      handleSubmit({
        otp: otp.toString(),
        email: appState.email,
      });
    }
  }, [otp, appState?.email, router, handleSubmit]);

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
      <TextStyle
        textContent={`We just emailed ${appState?.email}`}
        textStyle="text-2xl sm:text-xl text-[#111827] text-bold text-center"
      />
      <TextStyle
        textContent="Please enter the code we emailed you."
        textStyle="text-[16px] text-[#667185] text-bold text-center"
      />

      {/* ── SEGMENTED CHAR INPUT INTERFACE ── */}
      <div className="mx-auto my-6 flex w-full items-center justify-center">
        <OtpComponent otp={otp} setOtp={setOtp} />
      </div>

      {/* ── RE-SEND STRATEGY TIMERS ── */}
      <div className="flex flex-row space-x-2">
        <OtpTimer />
      </div>
    </div>
  );
};

export default VerifyOtpComp;

"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpSchemaType } from "@/lib/utility/yupvalidation";
import Image from "next/image";
import TextStyle from "@/components/common/textStyle";
import OtpComponent from "@/components/common/otpComponent";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoaderAction } from "@/redux/slices/user";
import toast from "react-hot-toast";
import { verifyOTP } from "@/services/apiServices/authApi";
import MyStopwatch from "./timer";
import OtpTimer from "./timer";

// Define TypeScript types for form values

const VerifyOtpComp = () => {
  /* naviagtion */
  const router = useRouter();
  /* use dispatch */
  const dispatch = useAppDispatch();

  const appState = useAppSelector((state) => state.user.user);

  const [otp, setOtp] = useState("");
  const [otpError, setOtError] = useState(false);

  /* yup validation and react hook form */

  const { mutateAsync } = useMutation({
    mutationFn: verifyOTP,
  });

  useEffect(() => {
    if (!appState?.email) {
      router.push("/auth-user/sendOpt");
      return;
    }
    if (otp.length === 5) { 
      handleSubmit({
        otp: otp.toString(),
        email: appState?.email
      })
    }
  }, [otp]);


 

  const handleSubmit = async (data: { otp: string, email: string }) => {
    try {
      if (!appState?.email) {
        router.push("/auth-user/sendOpt");
        return;
      }
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        ...data
      });

      toast.success(result.message);
      dispatch(setLoaderAction(false));
      router.push("/auth-user/login");
    } catch (err) {
      console.log("error", err);
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

  return (
    <div className="my-4 flex flex-col">
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
      <TextStyle
        textContent={`We just emailed ${appState?.email}`}
        textStyle="text-2xl sm:text-3xl text-[#111827] text-bold text-center"
      />
      <TextStyle
        textContent="Please enter the code we emailed you."
        textStyle="text-[16px] text-[#667185] text-bold text-center"
      />

      <div className="mx-auto my-6 flex w-full items-center justify-center">
        <OtpComponent otp={otp} setOtp={setOtp} />
      </div>

      <div className="flex flex-row space-x-2">
        
      
        <OtpTimer />
      </div>
    </div>
  );
};

export default VerifyOtpComp;

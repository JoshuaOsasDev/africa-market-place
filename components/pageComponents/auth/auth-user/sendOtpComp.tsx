"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { notFound, useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Mail } from "lucide-react";
import TextStyle from "@/components/common/textStyle";
import { verifyEmailSchema } from "@/lib/utility/yupvalidation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoaderAction } from "@/redux/slices/user";
import { useMutation } from "@tanstack/react-query";
import { forgetPasswordApi, sendVerificationOtp } from "@/services/apiServices/authApi";
import toast from "react-hot-toast";

const SendOtpcomp = ({ url }: {
  url: string
}) => {
  /* naviagtion */
  const router = useRouter();
  /* use dispatch */
  const dispatch = useAppDispatch();


  const [newUrl, setNewUrl] = useState('')
  console.log("url passed", url)

  const appState = useAppSelector((state) => state.user);

  useEffect(() => { 
    if (url !== "forgetPassword" && url !== "verifyEmail") { 
      router.push("/")
    }
    setNewUrl(url)
  },[])

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
    mutationFn: newUrl === "verifyEmail" ? sendVerificationOtp : forgetPasswordApi
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        ...data,
      });

      toast.success("Password verification link sent to your mail");
      dispatch(setLoaderAction(false));
      newUrl === "verifyEmail" && router.push("/auth-user/verifyOtp") 
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
    <div className="">
      <div className="flex flex-col md:space-x-15">
        <TextStyle
          textContent="Email Verification"
          textStyle="font-medium text-[20px] leading-[120%] tracking-[-0.02em] align-middle pt-5 pb-1"
        />

        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="xs:w-[350px] mt-4 flex flex-col space-y-2"
          >
            <div className="flex w-full flex-col space-y-1">
              <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                <TextStyle
                  textContent="Email"
                  textStyle="text-[16px] text-[##667185] text-bold"
                />
              </label>
              <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                <input
                  {...register("email")}
                  value={appState.user?.email || ""}
                  placeholder="user@gmail.com"
                  className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
                />
                <Mail className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
              </div>
              <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
                {errors.email?.message}
              </p>
            </div>

            {/* submit button starts */}
            <button
              disabled={appState.loading}
              className={`mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] bg-[#2E7D32] p-2.5`}
            >
              <span className="text-sm leading-[18.90px] font-semibold text-white">
                {appState.loading ? "Please wait.." : "Reset"}
              </span>
            </button>
          </form>
        </div>

        <TextStyle
          textContent="Click reset and check your E-mail for an OTP code"
          textStyle="text-[#FBC642] my-[20px] md:text-[16px] text-[14px] text-center"
        />
      </div>
    </div>
  );
};

export default SendOtpcomp;

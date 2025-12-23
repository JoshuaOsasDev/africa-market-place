"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import TextStyle from "@/components/common/textStyle";

import Link from "next/link";
import { verifyEmailSchema } from "@/lib/utility/yupvalidation";

// Define TypeScript types for form values

const SendOtpcomp = () => {
  /* naviagtion */
  const router = useRouter();
  /* use dispatch */
  // const dispatch = useAppDispatch()

  //  const appState = useAppSelector(state => state)

  /* set login credentials  */
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  /*  control user login after registration */
  const [startApiLogin, setStartApiLogin] = useState(false);

  /* set the display of the loader */
  const [loader, setLoader] = useState(false);

  /* start api call for user registration*/

  const [startApiCall, setStartApiCall] = useState(false);


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

  const onSubmit = async (data: { email: string }) => {
    router.push("/auth-vendor/sendOtp");
    /*  navigation.navigate('bottomTabNavigation') */
    console.log(data);

    try {
      setLoader(!loader);

      /* make api call fro user signIn */
      setStartApiCall(!startApiCall);

      /* dispatch(userLoggedInAndLoggedOutAction(true))
      navigation.navigate('bottomTabNavigation') */
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="">
      <ToastContainer />
   
      <div className="flex flex-col md:flex-row md:space-x-15">
      

          {
            //   loader && <LoadingScreen />
          }
          <TextStyle
            textContent="Email Address"
            textStyle="font-medium text-[28px] leading-[120%] tracking-[-0.02em] align-middle pt-5 pb-1"
          />
          <TextStyle
            textContent="Enter your E-mail to access your account"
            textStyle="text-[16px] text-[#667185] text-bold"
          />

          <div className="w-full md:w-[400px]">
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
                disabled={loader}
                className={`mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] bg-[#2E7D32] p-2.5`}
              >
                <span className="text-sm leading-[18.90px] font-semibold text-white">
                  {loader ? "Please wait.." : "Reset"}
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
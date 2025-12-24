"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import TextStyle from "@/components/common/textStyle";
import { div } from "framer-motion/client";

import Link from "next/link";
import BackButton from "@/components/common/backButton";
import DailyLayout from "@/components/common/vendorDailyLayout";
import { resetPasswordSchema } from "@/lib/utility/yupvalidation";

// Define TypeScript types for form values
export const ResetComp = () => {
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

  /* useEffect for responding to diffrent response from the user signup */

  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(resetPasswordSchema) };

  const [isChecked, setIsChecked] = useState(false);

  /* check the box */
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };
  console.log("john");
  const [form, setForm] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    console.log("code ran here");
    console.log(data);
    router.push("/auth-user/sendOtp");

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

  console.log("this are the erros", errors);
  return (
    <div className="">
   
   <div className="flex flex-col md:flex-row md:space-x-15">
   <div className="flex flex-col md:my-auto md:h-fit md:w-[500px] md:rounded-lg md:bg-white md:p-10 md:pt-3">
          {/* Logo – desktop only */}
         
          {
            //   loader && <LoadingScreen />
          }

          <div className="p-4 md:pt-5 md:pl-10">
            <TextStyle
              textContent="Reset Password"
              textStyle="text-[#111827] text-bold font-medium text-[28px] leading-[120%] tracking-[-0.02em] align-middle"
            />
            <TextStyle
              textContent="Enter new password to access your account"
              textStyle="text-[16px] text-[#667185] text-bold"
            />

            <div className="w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="xs:w-[350px] mt-4 flex flex-col space-y-2"
              >
                {/* Password */}
                <div className="mb-2 flex w-full flex-col space-y-2">
                  <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                    <TextStyle
                      textContent="Password"
                      textStyle="text-[16px] text-[#667185] text-bold"
                    />
                  </label>

                  <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                    <input
                      type={hidePassword ? "password" : "text"}
                      {...register("password")}
                      placeholder="Enter new password"
                      className="h-full flex-1 py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:outline-none"
                    />

                    {!hidePassword ? (
                      <Eye
                        onClick={() => setHidePassword(!hidePassword)}
                        className="h-4 w-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setHidePassword(!hidePassword)}
                        className="h-4 w-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                      />
                    )}
                  </div>

                  <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
                    {errors.password?.message}
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="mb-3 flex w-full flex-col space-y-2">
                  <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                    <TextStyle
                      textContent="Confirm Password"
                      textStyle="text-[16px] text-[#667185] text-bold"
                    />
                  </label>

                  <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                    <input
                      type={hideConfirmPassword ? "password" : "text"}
                      {...register("confirmPassword")}
                      placeholder="Enter new password"
                      className="h-full flex-1 py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:outline-none"
                    />

                    {!hideConfirmPassword ? (
                      <Eye
                        onClick={() =>
                          setHideConfirmPassword(!hideConfirmPassword)
                        }
                        className="h-4 w-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                      />
                    ) : (
                      <EyeOff
                        onClick={() =>
                          setHideConfirmPassword(!hideConfirmPassword)
                        }
                        className="h-4 w-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                      />
                    )}
                  </div>

                  <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
                    {errors.confirmPassword?.message}
                  </p>
                </div>

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

                {/* Submit Button */}
                <button className="mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] bg-[#2E7D32] p-2.5 hover:opacity-80">
                  <span className="text-sm leading-[18.90px] font-semibold text-white">
                    {loader ? "Please wait.." : "Reset"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};
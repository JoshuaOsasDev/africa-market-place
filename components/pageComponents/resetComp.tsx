"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { resetPasswordSchema } from "@/lib/utils/yupvalidation";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import TextStyle from "@/components/common/textStyle";
import { div } from "framer-motion/client";
import BackButton from "../common/backButton";
import DailyLayout from "../common/vendorDailyLayout";
import Link from "next/link";

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
    router.push("/sendOtp");

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
    <div>
      <ToastContainer />
      <BackButton />
      <div className="flex flex-col md:space-x-15 md:flex-row ">
        <DailyLayout textStyle="mt-0" />
        <div className="flex flex-col md:bg-white md:p-10 md:rounded-lg md:pt-3 md:w-[500px]  md:h-fit md:my-auto">
          {/* Logo – desktop only */}
          <div className="hidden md:block relative w-[100px] h-[50px]">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="africa market place logo"
                fill
                className="object-contain object-center"
              />
            </Link>
          </div>
          {
            //   loader && <LoadingScreen />
          }

          <div className="md:pl-10 md:pt-5 ">
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
                className="mt-4 flex flex-col xs:w-[350px] space-y-2"
              >
                {/* Password */}
                <div className="flex flex-col space-y-2 mb-2 w-full">
                  <label className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px]">
                    <TextStyle
                      textContent="Password"
                      textStyle="text-[16px] text-[#667185] text-bold"
                    />
                  </label>

                  <div className="flex items-center flex-row rounded-sm shadow border border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
                    <input
                      type={hidePassword ? "password" : "text"}
                      {...register("password")}
                      placeholder="Enter new password"
                      className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px]  py-2.5 h-full flex-1 focus:outline-none"
                    />

                    {!hidePassword ? (
                      <Eye
                        onClick={() => setHidePassword(!hidePassword)}
                        className="w-4 h-4 transition-colors group-focus-within:text-green-600 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setHidePassword(!hidePassword)}
                        className="w-4 h-4 transition-colors group-focus-within:text-green-600 cursor-pointer"
                      />
                    )}
                  </div>

                  <p className="text-red-700 text-sm font-medium font-['Inter'] leading-[18px]">
                    {errors.password?.message}
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col space-y-2 mb-3 w-full">
                  <label className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px]">
                    <TextStyle
                      textContent="Confirm Password"
                      textStyle="text-[16px] text-[#667185] text-bold"
                    />
                  </label>

                  <div className="flex items-center flex-row rounded-sm shadow border border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
                    <input
                      type={hideConfirmPassword ? "password" : "text"}
                      {...register("confirmPassword")}
                      placeholder="Enter new password"
                      className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px] 
        py-2.5 h-full flex-1 focus:outline-none"
                    />

                    {!hideConfirmPassword ? (
                      <Eye
                        onClick={() =>
                          setHideConfirmPassword(!hideConfirmPassword)
                        }
                        className="w-4 h-4 transition-colors group-focus-within:text-green-600 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() =>
                          setHideConfirmPassword(!hideConfirmPassword)
                        }
                        className="w-4 h-4 transition-colors group-focus-within:text-green-600 cursor-pointer"
                      />
                    )}
                  </div>

                  <p className="text-red-700 text-sm font-medium font-['Inter'] leading-[18px]">
                    {errors.confirmPassword?.message}
                  </p>
                </div>

                <div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="w-3 h-3 text-[#2E7D32] rounded-full accent-[#2E7D32]"
                  />
                  <span className="text-zinc-600 text-[13px] ml-1">
                    Remember me for 30 days
                  </span>
                </div>

                {/* Submit Button */}
                <button className="w-full h-[39px] p-2.5 justify-center items-center cursor-pointer rounded-[27px] inline-flex mt-4 bg-[#2E7D32] hover:opacity-80">
                  <span className="text-white text-sm font-semibold leading-[18.90px]">
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

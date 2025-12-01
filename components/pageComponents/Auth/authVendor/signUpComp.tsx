"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signUpSchema } from "@/lib/utils/yupvalidation";
import BackButton from "@/components/common/backButton";
import DailyLayout from "@/components/common/vendorDailyLayout";
import TextStyle from "@/components/common/textStyle";
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import Image from "next/image";

// Define TypeScript types for form values

const SignUpComp = () => {
  /* naviagtion */
  // const router = useRouter();
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

  const formOptions = { resolver: yupResolver(signUpSchema) };

  const [isChecked, setIsChecked] = useState(false);

  /* check the box */
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const [form, setForm] = useState<{
    fullname: string;
    email: string;
    phone: string;
    password: string;
  }>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data: {
    email: string;
    password: string;
    phone: string;
    fullname: string;
  }) => {
    if (!isChecked) return;
    /*  navigation.navigate('bottomTabNavigation') */
    console.log(data, "data");

    try {
      setLoader(!loader);

      /* make api call fro user signIn */
      setStartApiCall(!startApiCall);
      setLoginCredential({
        email: data.email,
        password: data.password,
      });

      /* dispatch(userLoggedInAndLoggedOutAction(true))
      navigation.navigate('bottomTabNavigation') */
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error message:", error.message);
      } else {
        console.log("Unknown error:", error);
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <BackButton />
      <div className="flex flex-col md:flex-row md:space-x-15">
        <DailyLayout textStyle="mt-15" />
        <div className="flex flex-col md:w-[450px] md:rounded-lg md:bg-white md:p-7 md:pt-3">
          {
            //   loader && <LoadingScreen />
          }

          <div className="relative hidden h-[50px] w-[100px] md:block">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="africa market place logo"
                fill
                className="object-contain object-center"
              />
            </Link>
          </div>
          <TextStyle
            textContent="Sign Up"
            textStyle="text-[28px] text-[#111827] text-bold mt-4"
          />
          <TextStyle
            textContent="Enter your credentials to access your account"
            textStyle="text-[16px] text-[#667185]/80 text-bold"
          />

          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 flex w-fit flex-col space-y-2"
            >
              <div className="mb-2 flex w-full flex-col space-y-2">
                <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                  <TextStyle
                    textContent="Full Name"
                    textStyle="text-[16px] text-[##667185] text-bold"
                  />
                </label>
                <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                  <input
                    {...register("fullname")}
                    placeholder="User"
                    className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
                  />
                  <User className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
                </div>
                <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
                  {errors.fullname?.message}
                </p>
              </div>
              <div className="mb-2 flex w-full flex-col space-y-2">
                <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                  <TextStyle
                    textContent="Email"
                    textStyle="text-[16px] text-[##667185] text-bold"
                  />
                </label>
                <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
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
              <div className="mb-2 flex w-full flex-col space-y-2">
                <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                  <TextStyle
                    textContent="Phone"
                    textStyle="text-[16px] text-[##667185] text-bold"
                  />
                </label>
                <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                  <input
                    {...register("phone")}
                    placeholder="07000000000"
                    className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
                  />
                  <Phone className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
                </div>
                <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
                  {errors.phone?.message}
                </p>
              </div>
              <div className="mb-2 flex w-full flex-col space-y-2">
                <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                  <TextStyle
                    textContent="Password"
                    textStyle="text-[16px] text-[##667185] text-bold"
                  />
                </label>
                <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                  <input
                    type={hidePassword ? "password" : "text"}
                    {...register("password")}
                    placeholder="12345678"
                    className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
                  />
                  {!hidePassword ? (
                    <Eye
                      onClick={() => {
                        setHidePassword(!hidePassword);
                      }}
                      className="h-4 w-4 transition-colors group-focus-within:text-green-600"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => {
                        setHidePassword(!hidePassword);
                      }}
                      onChange={() => setHidePassword(!hidePassword)}
                      className="h-4 w-4 transition-colors group-focus-within:text-green-600"
                    />
                  )}
                </div>
                <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
                  {errors.password?.message}
                </p>
              </div>

              <div className="mb-3 flex w-full flex-col space-y-2">
                <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                  <TextStyle
                    textContent="Confirm Password"
                    textStyle="text-[16px] text-[##667185] text-bold"
                  />
                </label>
                <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                  <input
                    type={hideConfirmPassword ? "password" : "text"}
                    {...register("confirmPassword")}
                    placeholder="12345678"
                    className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
                  />
                  {!hideConfirmPassword ? (
                    <Eye
                      onClick={() => {
                        setHideConfirmPassword(!hideConfirmPassword);
                      }}
                      className="h-4 w-4 transition-colors group-focus-within:text-green-600"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => {
                        setHideConfirmPassword(!hideConfirmPassword);
                      }}
                      className="h-4 w-4 transition-colors group-focus-within:text-green-600"
                    />
                  )}
                </div>
                <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
                  {errors.password?.message}
                </p>
              </div>
              {/* Terms and condition section */}

              <div className="w-[328px] flex-1 flex-row flex-wrap items-start">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={toggleCheckBox}
                  className="h-3 w-3 overflow-hidden rounded-full border-gray-300 bg-gray-100 text-[#2E7D32] accent-[#2E7D32] checked:bg-[#2E7D32] focus:ring-[#2E7D32] dark:bg-[#2E7D32]"
                />
                <span className="ml-1 font-['Aeonik-Regular'] text-[13px] font-medium text-zinc-600">
                  By continuing you agree to the{" "}
                </span>
                <span onClick={() => console.log(`now`)}>
                  <span className="font-['Aeonik-Medium'] text-[13px] leading-5 font-medium text-[#2E7D32]">
                    Term of Service{" "}
                  </span>
                </span>
                <span className="text-[13px] font-medium text-zinc-600">
                  and{" "}
                </span>
                <span>
                  <span className="text-[13px] font-medium text-[#2E7D32]">
                    Privacy Policy{" "}
                  </span>
                </span>

                <span className="text-[13px] leading-5 font-medium text-zinc-600">
                  of Africa market place.
                </span>
              </div>

              {/* submit button starts */}
              <button
                disabled={!isChecked || loader}
                className={`mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] p-2.5 hover:opacity-80 ${
                  !isChecked ? "bg-opacity-70 bg-[#6b916d]" : "bg-[#2E7D32]"
                }`}
              >
                <span className="text-sm leading-[18.90px] font-semibold text-white">
                  {loader ? "Please wait.." : "Create Account"}
                </span>
              </button>
            </form>

            <div className="my-6 flex flex-row items-center space-x-2">
              <hr className="border-px h-[0.5px] flex-1 border-[#F0F2F5]" />
              <TextStyle textContent="Or" textStyle="text-[#757575]" />
              <hr className="h-[0.5px] flex-1 border-[#F0F2F5]" />
            </div>

            <div className="flex h-[55px] cursor-pointer items-center justify-center space-x-2 rounded-[28px] bg-[#FAFAFA] hover:opacity-80">
              <Image
                src={"/images/google.jpg"}
                alt="google logo"
                width={20}
                height={20}
              />
              <TextStyle
                textContent="Continue with Google"
                textStyle="text-[#525252]   text-[16px] text-bold "
              />
            </div>
          </div>

          <div className="mt-3 flex w-full flex-row items-center justify-center space-x-1">
            <p className="text-slate-700/opacity-60 font-['Inter'] text-sm leading-[18px] font-medium">
              Already have an account?
            </p>
            <Link href={"/auth-vendor/login"}>
              <p className="font-['Inter'] text-sm leading-[18.90px] font-semibold text-[#6b916d] hover:opacity-80">
                Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComp;

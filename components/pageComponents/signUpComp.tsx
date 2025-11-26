"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { signUpSchema } from "@/lib/utility/yupvalidation";
import TextStyle from "../common/textStyle";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";

// Define TypeScript types for form values

const SignUpComp = () => {
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
    console.log(data);

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
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className=" flex flex-col   my-4">
      {
        //   loader && <LoadingScreen />
      }
      <TextStyle
        textContent="SignUp"
        textStyle="text-2xl sm:text-3xl text-[#111827] text-bold"
      />
      <TextStyle
        textContent="Enter your credentials to access your account"
        textStyle="text-[16px] text-[##667185] text-bold"
      />

      <div className=" w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col w-full space-y-2 "
        >
          <div className="flex flex-col space-y-1 w-full ">
            <label className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px]">
              <TextStyle
                textContent="Full Name"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="flex items-center flex-row rounded-lg shadow  border  border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
              <input
                {...register("fullname")}
                placeholder="User"
                className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px] focus:border-transparent 
              py-2.5 h-full  justify-start items-center  focus:outline-none
             flex-1
            "
              />
              <User className="w-4 h-4 transition-colors group-focus-within:text-green-600" />
            </div>
            <p className="text-red-700 text-sm font-medium font-['Inter'] leading-[18px]">
              {errors.fullname?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px]">
              <TextStyle
                textContent="Email"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="flex items-center flex-row rounded-lg shadow  border  border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
              <input
                {...register("email")}
                placeholder="user@gmail.com"
                className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px] focus:border-transparent 
              py-2.5 h-full  justify-start items-center  focus:outline-none
             flex-1
            "
              />
              <Mail className="w-4 h-4  transition-colors group-focus-within:text-green-600" />
            </div>
            <p className="text-red-700 text-sm font-medium font-['Inter'] leading-[18px]">
              {errors.email?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px]">
              <TextStyle
                textContent="Phone"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="flex items-center flex-row rounded-lg shadow  border  border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
              <input
                {...register("phone")}
                placeholder="07000000000"
                className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px] focus:border-transparent 
              py-2.5 h-full  justify-start items-center  focus:outline-none
             flex-1
            "
              />
              <Phone className="w-4 h-4 transition-colors group-focus-within:text-green-600" />
            </div>
            <p className="text-red-700 text-sm font-medium font-['Inter'] leading-[18px]">
              {errors.phone?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px]">
              <TextStyle
                textContent="Password"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="flex items-center flex-row rounded-lg shadow  border  border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
              <input
                type={hidePassword ? "password" : "text"}
                {...register("password")}
                placeholder="12345678"
                className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px] focus:border-transparent 
              py-2.5 h-full  justify-start items-center  focus:outline-none
             flex-1
            "
              />
              {!hidePassword ? (
                <Eye
                  onClick={() => {
                    setHidePassword(!hidePassword);
                  }}
                  className="w-4 h-4  transition-colors group-focus-within:text-green-600"
                />
              ) : (
                <EyeOff
                  onClick={() => {
                    setHidePassword(!hidePassword);
                  }}
                  onChange={() => setHidePassword(!hidePassword)}
                  className="w-4 h-4  transition-colors group-focus-within:text-green-600"
                />
              )}
            </div>
            <p className="text-red-700 text-sm font-medium font-['Inter'] leading-[18px]">
              {errors.password?.message}
            </p>
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px]">
              <TextStyle
                textContent="Confirm Password"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="flex items-center flex-row rounded-lg shadow  border  border-[#F4F4F4F4] h-[39px] overflow-hidden px-2.5 group transition-colors focus-within:border-green-600">
              <input
                type={hideConfirmPassword ? "password" : "text"}
                {...register("confirmPassword")}
                placeholder="12345678"
                className="text-slate-700 text-sm font-medium font-['Inter'] leading-[18px] focus:border-transparent 
              py-2.5 h-full  justify-start items-center  focus:outline-none
             flex-1
            "
              />
              {!hideConfirmPassword ? (
                <Eye
                  onClick={() => {
                    setHideConfirmPassword(!hideConfirmPassword);
                  }}
                  className="w-4 h-4  transition-colors group-focus-within:text-green-600"
                />
              ) : (
                <EyeOff
                  onClick={() => {
                    setHideConfirmPassword(!hideConfirmPassword);
                  }}
                  className="w-4 h-4  transition-colors group-focus-within:text-green-600"
                />
              )}
            </div>
            <p className="text-red-700 text-sm font-medium font-['Inter'] leading-[18px]">
              {errors.password?.message}
            </p>
          </div>
          {/* Terms and condition section */}

          <div className="flex-row  flex-wrap flex-1 items-start  w-[328px]">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={toggleCheckBox}
              className="w-3 h-3 text-[#2E7D32]
               bg-gray-100 border-gray-300 rounded-full  focus:ring-[#2E7D32] checked:bg-[#2E7D32]  dark:bg-[#2E7D32]  overflow-hidden
              accent-[#2E7D32]
               "
            />
            <span className="text-zinc-600 text-[13px] ml-1 font-medium font-['Aeonik-Regular'] ">
              By continuing you agree to the{" "}
            </span>
            <span onClick={() => console.log(`now`)}>
              <span className="text-[#2E7D32] text-[13px] font-medium font-['Aeonik-Medium'] leading-5">
                Term of Service{" "}
              </span>
            </span>
            <span className="text-zinc-600 text-[13px] font-medium ">and </span>
            <span>
              <span className="text-[#2E7D32] text-[13px] font-medium">
                Privacy Policy{" "}
              </span>
            </span>

            <span className="text-zinc-600 text-[13px] font-medium leading-5">
              of Africa market place.
            </span>
          </div>

          {/* submit button starts */}
          <button
            disabled={!isChecked || loader}
            className={` w-full h-[39px]  p-2.5  justify-center items-center cursor-pointer rounded-[27px]  inline-flex mt-4 ${
              !isChecked ? "bg-[#6b916d] bg-opacity-70 " : "bg-[#2E7D32]"
            }`}
          >
            <span className="text-white text-sm font-semibold  leading-[18.90px]">
              {loader ? "Please wait.." : "Create Account"}
            </span>
          </button>
        </form>

        <div className="flex flex-row items-center space-x-2 my-6">
          <hr className="flex-1 h-[0.5px] border-px border-[#F0F2F5] " />
          <TextStyle textContent="Or" textStyle="text-[#757575]" />
          <hr className="flex-1 h-[0.5px]  border-[#F0F2F5]" />
        </div>

        <div className="rounded-[28px] flex items-center justify-center  space-x-2 bg-[#FAFAFA] cursor-pointer h-[55px]">
          <Image
            src={"/images/google.jpg"}
            alt="google logo"
            width={20}
            height={20}
          />
          <TextStyle
            textContent="Continue with Google"
            textStyle="text-[#525252]  text-[16px] text-bold "
          />
        </div>
      </div>

      <div className="flex flex-row items-center mt-3 w-full justify-center space-x-1">
        <p className="text-slate-700/opacity-60 text-sm font-medium font-['Inter'] leading-[18px]">
          Already have an account?
        </p>
        <Link href={"/login"}>
          <p className="text-[#6b916d] text-sm font-semibold font-['Inter'] leading-[18.90px]">
            Login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUpComp;

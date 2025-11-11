"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { verifyEmailSchema } from "@/lib/utils/yupvalidation";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import TextStyle from "@/components/common/textStyle";

// Define TypeScript types for form values

const page = () => {
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

  const formOptions = { resolver: yupResolver(verifyEmailSchema) };




  const [form, setForm] = useState<{
email: string
  }>({
  email:""
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data: {
   email: string
  }) => {
   
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
    <div className=" flex flex-col   my-4">
      {
        //   loader && <LoadingScreen />
      }
      <TextStyle
        textContent="Email Address"
        textStyle="text-[28px] text-[#111827] text-bold"
      />
      <TextStyle
        textContent="Enter your E-mail to access your account"
        textStyle="text-[16px] text-[#667185] text-bold"
      />

      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col w-full space-y-2 "
        >
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

          {/* submit button starts */}
          <button
            disabled={ loader}
            className={` w-full h-[39px]  p-2.5  justify-center items-center cursor-pointer rounded-[27px]  inline-flex mt-4 bg-[#2E7D32]`}
          >
            <span className="text-white text-sm font-semibold  leading-[18.90px]">
              {loader ? "Please wait.." : "Reset"}
            </span>
          </button>
        </form>
          </div>
          
          <TextStyle
              textContent="Click reset and check your E-mail for an OTP code"
              textStyle="text-[#FBC642] my-[50px] text-3"
          
          />

    
    </div>
  );
};

export default page;

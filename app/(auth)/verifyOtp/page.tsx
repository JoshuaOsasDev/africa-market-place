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
import OtpComponent from "@/components/common/otpComponent";

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
      <div className="relative w-[116px] h-[146px] mx-auto">
        <Image src={"/images/lock.jpg"} fill alt="otp logo" />
      </div>
      <TextStyle
        textContent="We just emailed you"
        textStyle="text-[28px] text-[#111827] text-bold text-center"
      />
      <TextStyle
        textContent="Please enter the code we emailed you."
        textStyle="text-[16px] text-[#667185] text-bold text-center"
      />

      <div className="w-full mx-auto flex justify-center items-center my-6">
        <OtpComponent />
      </div>

          <div className="flex flex-row space-x-2">
              <TextStyle
                  textContent="Didn’t get a code? Resend Code"
                  textStyle="text-[16px] text-[#667185] text-bold text-center"
              />
    
              <button>
                  <TextStyle
                      textContent="Resend Code"
                      textStyle="text-[#FBC642]  text-3 cursor-pointer"
                  />
             
        </button>
      </div>
    </div>
  );
};

export default page;

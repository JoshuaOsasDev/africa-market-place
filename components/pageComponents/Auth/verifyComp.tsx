"use client";
import BackButton from "@/components/common/backButton";
import OtpComponent from "@/components/common/otpComponent";
import TextStyle from "@/components/common/textStyle";
import DailyLayout from "@/components/common/vendorDailyLayout";
import { verifyEmailSchema } from "@/lib/utils/yupvalidation";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

export default function VerifyComp() {
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
    <div>
      <ToastContainer />
      <BackButton />
      <div className="flex flex-col md:flex-row md:space-x-15">
        <DailyLayout textStyle="mt-0" />
        <div className="my-auto flex flex-col rounded-lg bg-white p-8">
          {
            //   loader && <LoadingScreen />
          }
          <div className="relative mx-auto h-[146px] w-[116px]">
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

          <div className="mx-auto my-6 flex w-full items-center justify-center">
            <OtpComponent />
          </div>

          <div className="flex flex-row items-center space-x-2">
            <TextStyle
              textContent="Didn’t get a code? Resend Code"
              textStyle="md:text-[16px] text-[10px] text-[#667185] text-bold text-center"
            />

            <button>
              <TextStyle
                textContent="Resend Code"
                textStyle="text-[#FBC642]  text-3 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

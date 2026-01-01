"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/utility/yupvalidation";
import TextStyle from "../../../common/textStyle";
import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth, signIn } from "@/services/apiServices/authApi";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/redux/store";
import { setLoaderAction } from "@/redux/slices/user";

const LoginComp = () => {
  /* naviagtion */
  const router = useRouter();

  /* use dispatch */
  const dispatch = useAppDispatch();

  //  const appState = useAppSelector(state => state)

  /* set the display of the loader */
  const [loader, setLoader] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);

  /* useEffect for responding to diffrent response from the user signup */

  const [hidePassword, setHidePassword] = useState(false);

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(loginSchema) };

  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const { mutate, error } = useMutation({
    mutationFn: signIn,
    onSuccess: async (data) => {
      console.log("data sent", data)
      dispatch(setLoaderAction(false));
      console.log("login data:", data);
      /*   dispatch(signIn(data.user));
      dispatch(setWishlist(data.user.wishlist)); */

      toast.success("Logged in successfully!");

      const isAdmin = data.user?.role?.includes("admin");
      const isVendor = data.user?.role?.includes("vendor");

      /* router.push(
        redirect
          ? redirect
          : isAdmin
            ? "/admin/dashboard"
            : isVendor
              ? "/vendor/dashboard"
              : "/",
      ); */
    },
    onError: (err) => {
      console.log("error occured")
      dispatch(setLoaderAction(false));
      if (err instanceof AxiosError) {
        toast.error(
          err?.response?.data?.message || "Sign in failed, please try again.",
        );
      } else {
        toast.error("Unknown error");
      }
    },
    onSettled: () => {
      
    },
  });

  console.log("mutation error", error);
  /* check the box */
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const loginWithGoogleFunc = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // tokenResponse.access_token
        console.log("googleToken", tokenResponse);
        setGoogleLoader(true);
        const user = await googleAuth(tokenResponse);

        toast.success("Login successfull");
        console.log("google user", user);

        setGoogleLoader(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(
            err?.response?.data?.message || "Sign in failed, please try again.",
          );
        } else {
          toast.error("Unknown error");
        }
      } finally {
        setLoader(false);
      }
    },

    onError: () => {
      console.log("Google login failed");
    },
  });
  const onSubmit = async (data: { email: string; password: string }) => {
    console.log("login input", data);

    try {
      dispatch(setLoaderAction(true));
      /* make api call fro user signIn */
       mutate({
        ...data,
        rememberMe: isChecked,
      });
      
      /* dispatch(userLoggedInAndLoggedOutAction(true))
      navigation.navigate('bottomTabNavigation') */
    } catch (err: any) {
      dispatch(setLoaderAction(false));
      console.log("login error", err);
      if (err instanceof AxiosError) {
        toast.error(
          err?.response?.data?.message || "Sign in failed, please try again.",
        );
      } else {
        toast.error("Unknown error");
      }
    } finally {
      setLoader(false);
     // dispatch(setLoaderAction(false));
    }
  };

  return (
    <div className="mt-4 flex flex-col">
      <TextStyle
        textContent="Hello Welcome back!"
        textStyle="text-2xl sm:text-3xl text-[#111827] text-bold"
      />
      <TextStyle
        textContent="Enter your credentials to access your account"
        textStyle="text-[16px] text-[#667185] text-bold"
      />

      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col space-y-2"
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

          <div className="flex w-full flex-col space-y-1">
            <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
              <TextStyle
                textContent="Password"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
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

          {/* remember password */}
          <div className="flex flex-row items-start justify-between">
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckBox}
                className="h-3 w-3 overflow-hidden rounded-full border-gray-300 bg-gray-100 text-[#2E7D32] accent-[#2E7D32] checked:bg-[#2E7D32] focus:ring-[#2E7D32] dark:bg-[#2E7D32]"
              />
              <span className="ml-1 font-['Aeonik-Regular'] text-[13px] font-medium text-zinc-600">
                Remember me for 30 days
              </span>
            </div>
            <div>
              <Link href={"/auth-user/resetPassword"}>
                <TextStyle
                  textContent="Forgot Password"
                  textStyle="text-[#6b916d] text-[16px]"
                />
              </Link>
            </div>
          </div>

          {/* submit button starts */}
          <button
            disabled={loader}
            className={`mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] bg-[#2E7D32] p-2.5`}
          >
            <span className="text-sm leading-[18.90px] font-semibold text-white">
              {loader ? "Please wait.." : "Login To Your Account"}
            </span>
          </button>
        </form>

        <div className="my-6 flex flex-row items-center space-x-2">
          <hr className="border-px h-[0.5px] flex-1 border-[#F0F2F5]" />
          <TextStyle textContent="Or" textStyle="text-[#757575]" />
          <hr className="h-[0.5px] flex-1 border-[#F0F2F5]" />
        </div>

        <div
          className={`flex h-13.75 ${googleLoader ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center space-x-2 rounded-[28px] bg-[#FAFAFA]`}
          onClick={() => loginWithGoogleFunc()}
        >
          {!googleLoader ? (
            <>
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
            </>
          ) : (
            "Please wait..."
          )}
        </div>
      </div>

      <div className="mt-3 flex w-full flex-row items-center justify-center space-x-1">
        <p className="text-slate-700/opacity-60 font-['Inter'] text-sm leading-[18px] font-medium">
          Already you new?
        </p>
        <Link href={"/auth-user/register/vendor"}>
          <p className="font-['Inter'] text-sm leading-[18.90px] font-semibold text-[#2E7D32]">
            Create an account
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginComp;

"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

import TextStyle from "@/components/common/textStyle";
import {
  changePasswordSchema,
} from "@/lib/utility/yupvalidation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoaderAction } from "@/redux/slices/user";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/apiServices/authApi";

// Define TypeScript types for form values
export const PasswordSettingComp = () => {
  /* naviagtion */
  const router = useRouter();

  /* use dispatch */
  const dispatch = useAppDispatch();


  const appLoader = useAppSelector(state => state.user.loading)
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  const [hideNewPassword, setHideNewPassword] = useState(false);

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(changePasswordSchema) };

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

  const { mutateAsync } = useMutation({
    mutationFn: resetPassword,
  });

  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      /*  dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        token,
        newPassword: data.password,
      });

     // toast.success("Password updated successfully");
      toast.success(result.message);
      router.push("/auth-user/login"); */
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message ||
            "Password update failed, please try again.",
        );
      } else {
        toast.error("Unknown error");
      }
    } finally {
      dispatch(setLoaderAction(false));
    }
  };

  return (
    <div className="mx-auto my-4 flex w-full flex-col rounded-md bg-white p-2 md:w-4/5 md:p-4 lg:w-3/5">
      <div className="w-full">
      <TextStyle
        textContent="Password Setting"
        textStyle="text-xl sm:text-2xl"
      />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="xs:w-[350px] mt-4 flex flex-col space-y-2"
              >
                {/* Password */}
                <div className="mb-2 flex w-full flex-col space-y-2">
                  <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                    <TextStyle
                      textContent="Current Password"
                      textStyle="text-[16px] text-[#667185] text-bold"
                    />
                  </label>

                  <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                    <input
                      type={hidePassword ? "password" : "text"}
                      {...register("currentPassword")}
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
                    {errors.currentPassword?.message}
                  </p>
                </div>

                {/* New Password */}
                <div className="mb-3 flex w-full flex-col space-y-2">
                  <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
                    <TextStyle
                      textContent="New Password"
                      textStyle="text-[16px] text-[#667185] text-bold"
                    />
                  </label>

                  <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-sm border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
                    <input
                      type={hideNewPassword ? "password" : "text"}
                      {...register("newPassword")}
                      placeholder="Enter new password"
                      className="h-full flex-1 py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:outline-none"
                    />

                    {!hideNewPassword ? (
                      <Eye
                        onClick={() =>
                          setHideNewPassword(!hideNewPassword)
                        }
                        className="h-4 w-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                      />
                    ) : (
                      <EyeOff
                        onClick={() =>
                          setHideNewPassword(!hideNewPassword)
                        }
                        className="h-4 w-4 cursor-pointer transition-colors group-focus-within:text-green-600"
                      />
                    )}
                  </div>

                  <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
                    {errors.newPassword?.message}
                  </p>
                </div>
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

                <button
            disabled={appLoader}
            className={`mt-4 cursor-pointer flex ml-auto mr-auto lg:mr-0  px-8 lg:px-10 py-2.5 lg:py-3  border-0 items-center justify-center rounded-md bg-[#2E7D32] `}
          >
            <span className="text-sm leading-[18.90px] font-semibold text-white">
              {appLoader ? "Please wait.." : "Save Changes"}
            </span>
          </button>
              </form>
            </div>
    </div>
  );
};

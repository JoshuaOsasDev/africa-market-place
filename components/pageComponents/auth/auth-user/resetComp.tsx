"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

import TextStyle from "@/components/common/textStyle";
import DailyLayout from "@/components/common/vendorDailyLayout";
import { resetPasswordSchema } from "@/lib/utility/yupvalidation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoaderAction } from "@/redux/slices/user";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/apiServices/authApi";

// Define TypeScript types for form values
export const ResetComp = () => {
  /* naviagtion */
  const router = useRouter();

  /* use dispatch */
  const dispatch = useAppDispatch();

  const appState = useAppSelector((state) => state);

  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(resetPasswordSchema) };

  const [isChecked, setIsChecked] = useState(false);

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
    mutationFn: resetPassword
  });

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        ...data,
      });
      toast.success(result.message);
      router.push("/auth-user/login");
      dispatch(setLoaderAction(false));
    } catch (err) {
      dispatch(setLoaderAction(false));
      console.log("error", err)
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message ||
            "Failed to change password, please try again.",
        );
      } else {
        toast.error("Unknown error");
      }
    } finally {
      dispatch(setLoaderAction(false));
    }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:space-x-15">
        <div className="flex flex-col md:my-auto md:h-fit md:w-[500px] md:rounded-lg md:bg-white md:p-10 md:pt-3">
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

                {/* Submit Button */}
                <button className="mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] bg-[#2E7D32] p-2.5 hover:opacity-80">
                  <span className="text-sm leading-[18.90px] font-semibold text-white">
                    Reset
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

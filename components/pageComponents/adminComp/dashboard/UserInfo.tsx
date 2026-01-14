"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { userProfileSchema } from "@/lib/utility/yupvalidation";
import TextStyle from "../../../common/textStyle";
import { Mail, Phone, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/apiServices/authApi";
import { setLoaderAction } from "@/redux/slices/user";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { useImageUpload } from "@/lib/hooks/useUpload";

// Define TypeScript types for form values

const UserInfoComp = () => {
  /* naviagtion */
  const router = useRouter();

  const { file, preview, onSelectFile, clear } = useImageUpload();
  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(userProfileSchema) };

  const appLoader = useAppSelector((state) => state.user.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation({
    mutationFn: signUp,
  });

  const onSubmit = async (data: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    postCode: string;
    address: string;
    city: string;
  }) => {
    try {
      /* const result = await mutateAsync({
        ...data,
      }); */
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message ||
            "User profile update failed, please try again.",
        );
      } else {
        toast.error("Unknown error");
      }
    } finally {
      dispatch(setLoaderAction(false));
    }
  };

  return (
    <div className="mx-auto my-4 flex w-4/5 flex-col rounded-md bg-white p-4 lg:w-3/5">
      <div className="flex flex-col gap-4">
        {preview ? (
          <div className="flex flex-col gap-2">
            <div className="relative mx-auto flex h-37.5 w-37.5 items-center justify-center rounded-full">
              <div className="relative mx-auto flex h-37.5 w-37.5 items-center justify-center rounded-full overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="rounded-lg"
                />
              </div>
              <div className="absolute -right-1 bottom-2 rounded-full bg-white p-1">
                <div className="relative flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#2E7D32]">
                  <input
                    type="file"
                    className="z-2 h-9.5 w-9.5 opacity-0"
                    accept="image/*"
                    onChange={onSelectFile}
                  />
                  <FiCamera className="absolute text-white" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto flex h-37.5 w-37.5 items-center justify-center rounded-full bg-[#F3F3F3]">
            <Image
              alt="user"
              src={"/common/userLogo.png"}
              width={54}
              height={54}
            />
            <div className="absolute -right-1 bottom-2 rounded-full bg-white p-1">
              <div className="relative flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#2E7D32]">
                <input
                  type="file"
                  className="z-2 h-9.5 w-9.5 opacity-0"
                  accept="image/*"
                  onChange={onSelectFile}
                />
                <FiCamera className="absolute text-white" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col space-y-2"
        >
          <div className="flex w-full flex-col space-y-1">
            <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
              <TextStyle
                textContent="First Name"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
              <input
                {...register("firstName")}
                placeholder="User"
                className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
              />
              <User className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
            </div>
            <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
              {errors.firstName?.message}
            </p>
          </div>
          <div className="flex w-full flex-col space-y-1">
            <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
              <TextStyle
                textContent="Last Name"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
              <input
                {...register("lastName")}
                placeholder="User"
                className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
              />
              <User className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
            </div>
            <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
              {errors.lastName?.message}
            </p>
          </div>
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
                textContent="Phone"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
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

          <div className="flex w-full flex-col space-y-1">
            <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
              <TextStyle
                textContent="Address"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
              <input
                {...register("address")}
                placeholder="Enter Address"
                className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
              />
            </div>
            <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
              {errors.address?.message}
            </p>
          </div>

          <div className="flex w-full flex-col space-y-1">
            <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
              <TextStyle
                textContent="City"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
              <input
                {...register("city")}
                placeholder="Enter city"
                className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
              />
            </div>
            <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
              {errors.city?.message}
            </p>
          </div>
          <div className="flex w-full flex-col space-y-1">
            <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
              <TextStyle
                textContent="Post code"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
              <input
                {...register("postCode")}
                placeholder="Enter post code"
                className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
              />
            </div>
            <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
              {errors.postCode?.message}
            </p>
          </div>

          {/* submit button starts */}
          <button
            disabled={appLoader}
            className={`mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] bg-[#2E7D32] p-2.5`}
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

export default UserInfoComp;

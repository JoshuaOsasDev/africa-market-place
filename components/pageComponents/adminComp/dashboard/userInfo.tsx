"use client";

import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { userProfileSchema } from "@/lib/utility/yupvalidation";

import TextStyle from "@/components/common/textStyle";
import { Mail, Phone, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";

import { setLoaderAction, updateProfileAction } from "@/redux/slices/user";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";

import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { updateProfileApi } from "@/services/apiServices/userApi";
import UKAddressAutocomplete from "@/components/common/googlAddressUserLocation";

// Define TypeScript types for form values

const UserInfoComp = () => {
  /* naviagtion */
  const router = useRouter();

  const onSelect = (data: any) => {
    // console.log("location", data);
  };
  const onError = (error: any) => {
    // console.log("error", error);
  };

  const restoreScroll = () => {
    document.body.style.overflow = "";
  };

  const userProfile = useAppSelector((state) => state.user.user!);

  // console.log("user info", userProfile);
  const [file, setFile] = useState<{
    public_id: string;
    secure_url: string;
  }>({
    public_id: "",
    secure_url: userProfile?.cover?.url || "",
  });
  /* yup validation and react hook form */

  // console.log(userProfile, "profile");
  const formOptions = { resolver: yupResolver(userProfileSchema) };

  const appLoader = useAppSelector((state) => state.user.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation({
    mutationFn: updateProfileApi,
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
      dispatch(setLoaderAction(true));
      if (!file.secure_url) {
        toast.error("Image is required");
        return;
      }

      const result = await mutateAsync({
        ...data,
        cover: {
          _id: file.public_id,
          url: file.secure_url,
        },
      });

      dispatch(updateProfileAction(result.data));

      toast.success("User profile updated successfully");
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
    <div className="mx-auto mt-15 flex w-full flex-col rounded-md bg-white p-2 md:my-4 md:w-4/5 md:p-4 lg:w-3/5">
      <div className="flex flex-col gap-4">
        {file.secure_url ? (
          <div className="flex flex-col gap-2">
            <div className="relative mx-auto flex h-27.5 w-27.5 items-center justify-center rounded-full lg:h-37.5 lg:w-37.5">
              <div className="relative mx-auto flex h-27.5 w-27.5 items-center justify-center overflow-hidden rounded-full lg:h-37.5 lg:w-37.5">
                <Image
                  src={file.secure_url}
                  alt="Preview"
                  fill
                  className="rounded-lg"
                />
              </div>
              <div className="absolute -right-1 bottom-2 rounded-full bg-white p-1">
                <MdCancel
                  className="relative flex h-8 w-8 items-center justify-center rounded-full text-red-400"
                  onClick={() =>
                    setFile({
                      public_id: "",
                      secure_url: "",
                    })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto flex h-27.5 w-27.5 items-center justify-center rounded-full bg-[#F3F3F3] lg:h-37.5 lg:w-37.5">
            <Image
              alt="user"
              src={userProfile?.cover?.url || "/common/userLogo.png"}
              fill
            />
            <div className="absolute -right-1 bottom-2 rounded-full bg-white p-1">
              <div className="relative flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#2E7D32]">
                <CldUploadWidget
                  uploadPreset="africamarketplace"
                  onSuccess={(data: any) => {
                    restoreScroll();
                    setFile({
                      public_id: data.info.public_id,
                      secure_url: data.info.secure_url,
                    });
                  }}
                  // onClose={() => {
                  //   document.body.style.overflow = "scroll";
                  // }}
                  options={{
                    showPoweredBy: false, // hides Cloudinary logo
                    multiple: true, // allow multiple uploads

                    clientAllowedFormats: ["png", "jpg"], // restrict file types
                    folder: "user_profile", // optional folder
                    maxFileSize: 1 * 1024 * 1024, // max 5MB per file
                  }}
                >
                  {({ open }) => (
                    <button type="button" onClick={() => open()}>
                      <FiCamera className="text-white" />
                    </button>
                  )}
                </CldUploadWidget>
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
                defaultValue={userProfile?.firstName}
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
                defaultValue={userProfile?.lastName}
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
                value={userProfile?.email}
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
                defaultValue={userProfile?.phone}
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
                defaultValue={userProfile?.address}
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
                defaultValue={userProfile?.city}
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
          <div className="flex w-full flex-col space-y-1">
            <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
              <TextStyle
                textContent="Role"
                textStyle="text-[16px] text-[##667185] text-bold"
              />
            </label>
            <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
              <input
                {...register("role")}
                value={userProfile?.role}
                placeholder="Enter post code"
                className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
              />
            </div>
            <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
              {errors.role?.message}
            </p>
          </div>
          <UKAddressAutocomplete />
          {/* submit button starts */}
          <button
            disabled={appLoader}
            className={`mt-4 mr-auto ml-auto flex cursor-pointer items-center justify-center rounded-md border-0 bg-[#2E7D32] px-8 py-2.5 lg:mr-0 lg:px-10 lg:py-3`}
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              {appLoader ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Please wait...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoComp;

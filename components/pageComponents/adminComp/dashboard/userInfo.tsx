"use client";

import { Resolver, useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import {
  UserProfileFormData,
  userProfileSchema,
} from "@/lib/utility/yupvalidation";

import logo from "../../../../lib/public/images/logo.png";
import TextStyle from "@/components/common/textStyle";
import {
  Mail,
  Phone,
  User,
  MapPin,
  Shield,
  Pencil,
  X,
  Check,
  Camera,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";

import { setLoaderAction, updateProfileAction } from "@/redux/slices/user";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";

import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { updateProfileApi } from "@/services/apiServices/userApi";
import UKAddressAutocomplete, {
  AddressResult,
} from "@/components/common/googlAddressUserLocation";

const UserInfoComp = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const onSelect = (data: any) => {};
  const onError = (error: any) => {};

  const restoreScroll = () => {
    document.body.style.overflow = "";
  };

  const userProfile = useAppSelector((state) => state.user.user!);

  const [file, setFile] = useState<{
    public_id: string;
    secure_url: string;
  }>({
    public_id: "",
    secure_url: userProfile?.cover?.url || "",
  });

  const appLoader = useAppSelector((state) => state.user?.loading);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: yupResolver(userProfileSchema) as Resolver<UserProfileFormData>,
  });

  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation({
    mutationFn: updateProfileApi,
  });

  const handleAddressSelect = (data: AddressResult) => {
    setValue("postCode", data.postcode);
    setValue("address", data.address);
    setValue("city", data.city);
    setValue("country", data.country);
    setValue("houseNumber", data.houseNumber);
  };

  const onSubmit = async (data: UserProfileFormData) => {
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
      setIsEditing(false);
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

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header Card — Avatar + Name + Edit Button */}
        <div className="relative mb-4 overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Top banner strip */}
          <div className="relative h-24 bg-gradient-to-r from-[#2E7D32] via-[#388E3C] to-[#43A047]">
            <Image
              src={userProfile?.cover?.url || logo}
              alt="cover image"
              fill
              className="object-cover"
            />
          </div>

          {/* Avatar + top actions */}
          <div className="px-6 pb-6">
            <div className="-mt-12 flex items-end justify-between">
              {/* Avatar */}
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-[#F3F3F3] shadow-md">
                  <Image
                    src={
                      file.secure_url ||
                      userProfile?.cover?.url ||
                      "/common/userLogo.png"
                    }
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                {/* Camera upload — only in edit mode */}
                {isEditing && (
                  <div className="absolute -right-2 -bottom-2 rounded-xl bg-[#2E7D32] p-1.5 shadow">
                    {file.secure_url ? (
                      <button
                        type="button"
                        onClick={() =>
                          setFile({ public_id: "", secure_url: "" })
                        }
                        className="flex items-center justify-center"
                      >
                        <X className="h-3.5 w-3.5 text-white" />
                      </button>
                    ) : (
                      <CldUploadWidget
                        uploadPreset="africamarketplace"
                        onSuccess={(data: any) => {
                          restoreScroll();
                          setFile({
                            public_id: data.info.public_id,
                            secure_url: data.info.secure_url,
                          });
                        }}
                        options={{
                          showPoweredBy: false,
                          multiple: true,
                          clientAllowedFormats: ["png", "jpg"],
                          folder: "user_profile",
                          maxFileSize: 1 * 1024 * 1024,
                        }}
                      >
                        {({ open, isLoading }) => (
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => {
                              if (typeof open === "function") open();
                            }}
                            className="flex items-center justify-center"
                          >
                            <FiCamera className="h-3.5 w-3.5 text-white" />
                          </button>
                        )}
                      </CldUploadWidget>
                    )}
                  </div>
                )}
              </div>

              {/* Edit / Cancel buttons */}
              <div className="mb-1 flex gap-2">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 rounded-xl border border-[#2E7D32] px-4 py-2 text-sm font-semibold text-[#2E7D32] transition hover:bg-[#2E7D32] hover:text-white"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Name + role display */}
            <div className="mt-1">
              <h2 className="text-xl font-bold text-slate-800">
                {userProfile?.firstName} {userProfile?.lastName}
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-0.5 text-xs font-medium text-green-700">
                <Shield className="h-3 w-3" />
                {userProfile?.role || "Member"}
              </span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Info Section */}
          <Section
            title="Personal Information"
            icon={<User className="h-4 w-4" />}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="First Name"
                error={errors.firstName?.message}
                editing={isEditing}
                displayValue={userProfile?.firstName}
              >
                <input
                  {...register("firstName")}
                  defaultValue={userProfile?.firstName}
                  placeholder="First name"
                  className={inputClass}
                />
              </Field>
              <Field
                label="Last Name"
                error={errors.lastName?.message}
                editing={isEditing}
                displayValue={userProfile?.lastName}
              >
                <input
                  {...register("lastName")}
                  defaultValue={userProfile?.lastName}
                  placeholder="Last name"
                  className={inputClass}
                />
              </Field>
            </div>
            <Field
              label="Email Address"
              error={errors.email?.message}
              editing={isEditing}
              displayValue={userProfile?.email}
              icon={<Mail className="h-4 w-4 text-slate-400" />}
            >
              <input
                {...register("email")}
                value={userProfile?.email}
                placeholder="email@example.com"
                className={inputClass}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Phone"
                error={errors.phone?.message}
                editing={isEditing}
                displayValue={userProfile?.phone}
                icon={<Phone className="h-4 w-4 text-slate-400" />}
              >
                <input
                  {...register("phone")}
                  defaultValue={userProfile?.phone}
                  placeholder="07000000000"
                  className={inputClass}
                />
              </Field>
              <Field
                label="Role"
                error={errors.role?.message}
                editing={isEditing}
                displayValue={userProfile?.role}
              >
                <input
                  {...register("role")}
                  value={userProfile?.role}
                  placeholder="Role"
                  className={inputClass}
                />
              </Field>
            </div>
          </Section>

          {/* Address Section */}
          <Section title="Address" icon={<MapPin className="h-4 w-4" />}>
            {isEditing && (
              <div className="mb-4">
                <label className={labelClass}>Search Address</label>
                <UKAddressAutocomplete onSelect={handleAddressSelect} />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="House Number"
                error={errors.houseNumber?.message}
                editing={isEditing}
                displayValue={userProfile?.houseNumber}
              >
                <input
                  {...register("houseNumber")}
                  defaultValue={userProfile?.houseNumber}
                  placeholder="House number"
                  className={inputClass}
                />
              </Field>
              <Field
                label="Post Code"
                error={errors.postCode?.message}
                editing={isEditing}
                displayValue={userProfile?.postCode}
              >
                <input
                  {...register("postCode")}
                  defaultValue={userProfile?.postCode}
                  placeholder="Post code"
                  disabled
                  className={`${inputClass} bg-slate-50 disabled:cursor-not-allowed`}
                />
              </Field>
            </div>
            <Field
              label="Street Address"
              error={errors.address?.message}
              editing={isEditing}
              displayValue={userProfile?.address}
            >
              <input
                {...register("address")}
                defaultValue={userProfile?.address}
                placeholder="Street address"
                disabled
                className={`${inputClass} bg-slate-50 disabled:cursor-not-allowed`}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="City"
                error={errors.city?.message}
                editing={isEditing}
                displayValue={userProfile?.city}
              >
                <input
                  {...register("city")}
                  defaultValue={userProfile?.city}
                  placeholder="City"
                  disabled
                  className={`${inputClass} bg-slate-50 disabled:cursor-not-allowed`}
                />
              </Field>
              <Field
                label="Country"
                error={errors.country?.message}
                editing={isEditing}
                displayValue={userProfile?.country}
              >
                <input
                  {...register("country")}
                  defaultValue={userProfile?.country}
                  placeholder="Country"
                  disabled
                  className={`${inputClass} bg-slate-50 disabled:cursor-not-allowed`}
                />
              </Field>
            </div>
          </Section>

          {/* Save button — only shown in edit mode */}
          {isEditing && (
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={appLoader}
                className="flex items-center gap-2 rounded-xl bg-[#2E7D32] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#256427] disabled:opacity-60"
              >
                {appLoader ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

/* ─── Shared helpers ─── */

const inputClass =
  "h-full w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/10 transition";

const labelClass =
  "block mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400";

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({ title, icon, children }: SectionProps) => (
  <div className="mb-4 rounded-2xl bg-white p-6 shadow-sm">
    <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50 text-[#2E7D32]">
        {icon}
      </span>
      <h3 className="text-sm font-bold tracking-wide text-slate-500 uppercase">
        {title}
      </h3>
    </div>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

interface FieldProps {
  label: string;
  error?: string;
  editing: boolean;
  displayValue?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Field = ({
  label,
  error,
  editing,
  displayValue,
  icon,
  children,
}: FieldProps) => (
  <div className="flex flex-col gap-1">
    <label className={labelClass}>{label}</label>
    {editing ? (
      <>
        <div className="relative flex h-10 items-center">
          {children}
          {icon && (
            <span className="pointer-events-none absolute right-3">{icon}</span>
          )}
        </div>
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </>
    ) : (
      <p className="flex min-h-[40px] items-center rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
        {displayValue || <span className="text-slate-400 italic">Not set</span>}
      </p>
    )}
  </div>
);

export default UserInfoComp;

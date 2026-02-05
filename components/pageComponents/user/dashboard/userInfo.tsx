// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { AxiosError } from "axios";
// import { profileSchema } from "@/lib/utility/yupvalidation";

// import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
// import Image from "next/image";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { useMutation } from "@tanstack/react-query";
// import { googleAuth, signUp } from "@/services/apiServices/authApi";
// import { setLoaderAction, signInAction } from "@/redux/slices/user";
// import { setWishlistAction } from "@/redux/slices/wishlist";
// import toast from "react-hot-toast";
// import { useGoogleLogin } from "@react-oauth/google";
// import TextStyle from "@/components/common/textStyle";
// import { userInfoType } from "@/types/appTypes";

// // Define TypeScript types for form values

// const UserInfoComp = () => {
//   /* naviagtion */
//   const router = useRouter();
//   /* use dispatch */
//   // const dispatch = useAppDispatch()

//   const searchParam = useSearchParams();
//   const redirect = searchParam.get("redirect");

//   const [hidePassword, setHidePassword] = useState(false);
//   const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

//   /* yup validation and react hook form */

//   const formOptions = { resolver: yupResolver(profileSchema) };

//   const [isChecked, setIsChecked] = useState(false);

//   /* check the box */
//   const toggleCheckBox = () => {
//     setIsChecked(!isChecked);
//   };

//   const appLoader = useAppSelector((state) => state.user.loading);

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm(formOptions);

//   const dispatch = useAppDispatch();

//   const { mutateAsync } = useMutation({
//     mutationFn: signUp,
//   });

//   const onSubmit = async (data: userInfoType) => {
//     try {
//       dispatch(setLoaderAction(true));

//       const result = await mutateAsync({
//         ...data,
//       });
//       dispatch(signInAction(result.user));
//       dispatch(setWishlistAction(result.user.wishlist));

//       if (!result.user.isVerified) {
//         toast.error(`Verification email has been sent to ${result.user.email}`);
//         router.push("/auth-user/verifyOtp");
//         return;
//       }
//       toast.success("user created successfully");
//     } catch (err) {
//       if (err instanceof AxiosError) {
//         toast.error(
//           err.response?.data?.message || "Sign in failed, please try again.",
//         );
//       } else {
//         toast.error("Unknown error");
//       }
//     } finally {
//       dispatch(setLoaderAction(false));
//     }
//   };

//   const loginWithGoogleFunc = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         // tokenResponse.access_token
//         dispatch(setLoaderAction(true));
//         const result = await googleAuth(tokenResponse);

//         dispatch(signInAction(result.data.user));
//         dispatch(setWishlistAction(result.data.user.wishlist));
//         toast.success("Login successfull");

//         dispatch(setLoaderAction(false));
//         const isAdmin = result.data.user?.role?.includes("admin");
//         const isVendor = result.data.user?.role?.includes("vendor");
//         const goto = redirect
//           ? redirect
//           : isAdmin
//             ? "/admin/dashboard"
//             : isVendor
//               ? "/vendor/dashboard"
//               : "/";

//         router.push(goto);
//       } catch (err) {
//         if (err instanceof AxiosError) {
//           toast.error(
//             err?.response?.data?.message || "Sign in failed, please try again.",
//           );
//         } else {
//           toast.error("Unknown error");
//         }
//       } finally {
//         dispatch(setLoaderAction(false));
//       }
//     },

//     onError: () => {
//       toast.error("Google login failed");
//       dispatch(setLoaderAction(false));
//     },
//   });

//   return (
//     <div className="my-4 flex flex-col">
//       <TextStyle
//         textContent="SignUp"
//         textStyle="text-2xl sm:text-3xl text-[#111827] text-bold"
//       />
//       <TextStyle
//         textContent="Enter your credentials to create an account"
//         textStyle="text-[16px] text-[##667185] text-bold"
//       />

//       <div className="w-full">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="mt-4 flex w-full flex-col space-y-2"
//         >
//           <div className="flex w-full flex-col space-y-1">
//             <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//               <TextStyle
//                 textContent="First Name"
//                 textStyle="text-[16px] text-[##667185] text-bold"
//               />
//             </label>
//             <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
//               <input
//                 {...register("firstName")}
//                 placeholder="User"
//                 className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//               />
//               <User className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
//             </div>
//             <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//               {errors.firstName?.message}
//             </p>
//           </div>
//           <div className="flex w-full flex-col space-y-1">
//             <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//               <TextStyle
//                 textContent="Last Name"
//                 textStyle="text-[16px] text-[##667185] text-bold"
//               />
//             </label>
//             <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
//               <input
//                 {...register("lastName")}
//                 placeholder="User"
//                 className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//               />
//               <User className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
//             </div>
//             <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//               {errors.lastName?.message}
//             </p>
//           </div>
//           <div className="flex w-full flex-col space-y-1">
//             <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//               <TextStyle
//                 textContent="Email"
//                 textStyle="text-[16px] text-[##667185] text-bold"
//               />
//             </label>
//             <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
//               <input
//                 {...register("email")}
//                 placeholder="user@gmail.com"
//                 className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//               />
//               <Mail className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
//             </div>
//             <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//               {errors.email?.message}
//             </p>
//           </div>
//           <div className="flex w-full flex-col space-y-1">
//             <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//               <TextStyle
//                 textContent="Phone"
//                 textStyle="text-[16px] text-[##667185] text-bold"
//               />
//             </label>
//             <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
//               <input
//                 {...register("phone")}
//                 placeholder="07000000000"
//                 className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//               />
//               <Phone className="h-4 w-4 transition-colors group-focus-within:text-green-600" />
//             </div>
//             <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//               {errors.phone?.message}
//             </p>
//           </div>
//           <div className="flex w-full flex-col space-y-1">
//             <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//               <TextStyle
//                 textContent="Password"
//                 textStyle="text-[16px] text-[##667185] text-bold"
//               />
//             </label>
//             <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
//               <input
//                 type={hidePassword ? "password" : "text"}
//                 {...register("password")}
//                 placeholder="12345678"
//                 className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//               />
//               {!hidePassword ? (
//                 <Eye
//                   onClick={() => {
//                     setHidePassword(!hidePassword);
//                   }}
//                   className="h-4 w-4 transition-colors group-focus-within:text-green-600"
//                 />
//               ) : (
//                 <EyeOff
//                   onClick={() => {
//                     setHidePassword(!hidePassword);
//                   }}
//                   onChange={() => setHidePassword(!hidePassword)}
//                   className="h-4 w-4 transition-colors group-focus-within:text-green-600"
//                 />
//               )}
//             </div>
//             <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//               {errors.password?.message}
//             </p>
//           </div>

//           <div className="flex w-full flex-col space-y-1">
//             <label className="font-['Inter'] text-sm leading-[18px] font-medium text-slate-700">
//               <TextStyle
//                 textContent="Confirm Password"
//                 textStyle="text-[16px] text-[##667185] text-bold"
//               />
//             </label>
//             <div className="group flex h-[39px] flex-row items-center overflow-hidden rounded-lg border border-[#F4F4F4F4] px-2.5 shadow transition-colors focus-within:border-green-600">
//               <input
//                 type={hideConfirmPassword ? "password" : "text"}
//                 {...register("confirmPassword")}
//                 placeholder="12345678"
//                 className="h-full flex-1 items-center justify-start py-2.5 font-['Inter'] text-sm leading-[18px] font-medium text-slate-700 focus:border-transparent focus:outline-none"
//               />
//               {!hideConfirmPassword ? (
//                 <Eye
//                   onClick={() => {
//                     setHideConfirmPassword(!hideConfirmPassword);
//                   }}
//                   className="h-4 w-4 transition-colors group-focus-within:text-green-600"
//                 />
//               ) : (
//                 <EyeOff
//                   onClick={() => {
//                     setHideConfirmPassword(!hideConfirmPassword);
//                   }}
//                   className="h-4 w-4 transition-colors group-focus-within:text-green-600"
//                 />
//               )}
//             </div>
//             <p className="font-['Inter'] text-sm leading-[18px] font-medium text-red-700">
//               {errors.password?.message}
//             </p>
//           </div>
//           {/* Terms and condition section */}

//           <div className="w-[328px] flex-1 flex-row flex-wrap items-start">
//             <input
//               type="checkbox"
//               checked={isChecked}
//               onChange={toggleCheckBox}
//               className="h-3 w-3 overflow-hidden rounded-full border-gray-300 bg-gray-100 text-[#2E7D32] accent-[#2E7D32] checked:bg-[#2E7D32] focus:ring-[#2E7D32] dark:bg-[#2E7D32]"
//             />
//             <span className="ml-1 font-['Aeonik-Regular'] text-[13px] font-medium text-zinc-600">
//               By continuing you agree to the{" "}
//             </span>
//             <span onClick={() => console.log(`now`)}>
//               <span className="font-['Aeonik-Medium'] text-[13px] leading-5 font-medium text-[#2E7D32]">
//                 Term of Service{" "}
//               </span>
//             </span>
//             <span className="text-[13px] font-medium text-zinc-600">and </span>
//             <span>
//               <span className="text-[13px] font-medium text-[#2E7D32]">
//                 Privacy Policy{" "}
//               </span>
//             </span>

//             <span className="text-[13px] leading-5 font-medium text-zinc-600">
//               of Africa market place.
//             </span>
//           </div>

//           {/* submit button starts */}
//           <button
//             disabled={!isChecked || appLoader}
//             className={`mt-4 inline-flex h-[39px] w-full cursor-pointer items-center justify-center rounded-[27px] p-2.5 ${
//               !isChecked ? "bg-opacity-70 bg-[#61ae64]" : "bg-[#2E7D32]"
//             }`}
//           >
//             <span className="text-sm leading-[18.90px] font-semibold text-white">
//               {appLoader ? "Please wait.." : "Create Account"}
//             </span>
//           </button>
//         </form>

//         <div className="my-6 flex flex-row items-center space-x-2">
//           <hr className="border-px h-[0.5px] flex-1 border-[#F0F2F5]" />
//           <TextStyle textContent="Or" textStyle="text-[#757575]" />
//           <hr className="h-[0.5px] flex-1 border-[#F0F2F5]" />
//         </div>

//         <div
//           className={`flex h-13.75 ${appLoader ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center space-x-2 rounded-[28px] bg-[#FAFAFA]`}
//           onClick={() => loginWithGoogleFunc()}
//         >
//           {!appLoader ? (
//             <>
//               <Image
//                 src={"/images/google.jpg"}
//                 alt="google logo"
//                 width={20}
//                 height={20}
//               />
//               <TextStyle
//                 textContent="Continue with Google"
//                 textStyle="text-[#525252]  text-[16px] text-bold "
//               />
//             </>
//           ) : (
//             "Please wait..."
//           )}
//         </div>
//       </div>

//       <div className="mt-3 flex w-full flex-row items-center justify-center space-x-1">
//         <p className="text-slate-700/opacity-60 font-['Inter'] text-sm leading-[18px] font-medium">
//           Already have an account?
//         </p>
//         <Link href={"/auth-user/login"}>
//           <p className="font-['Inter'] text-sm leading-[18.90px] font-semibold text-[#6b916d]">
//             Login
//           </p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default UserInfoComp;

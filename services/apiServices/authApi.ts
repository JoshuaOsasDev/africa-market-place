import {
  userForgetPasswordType,
  userLoginType,
  userResetPasswordType,
  userSendVerificationOtpType,
  userSignupType,
  userVerifyOtpType,
} from "@/types/authTypes";
import http from "./http";
import { AxiosError } from "axios";

export const signUp = async (payload: userSignupType) => {
  try {
    const { data } = await http.post(`/auth/sign-up`, payload);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    }

    throw new Error("An unexpected error occurred");
  }
};
export const verifyOTP = async (payload: userVerifyOtpType) => {
  try {
    const { data } = await http.post(`/auth/verify-otp`, payload);

    return data;
  } catch (error) {
    console.error("OTP verification error:", error);
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    }

    throw new Error("An unexpected error occurred");
  }
};

export const sendVerificationOtp = async (
  payload: userSendVerificationOtpType,
) => {
  const { data } = await http.post(`/auth/resend-otp`, payload);
  return data;
};

export const signIn = async (payload: userLoginType) => {
  const { data } = await http.post(`/auth/sign-in`, payload);
  return data;
};

export const forgetPasswordApi = async (payload: userForgetPasswordType) => {
  //console.log("reset password payload2:", payload);
  const { data } = await http.post("/auth/forget-password", payload);
  return data;
};

export const resetPassword = async (payload: userResetPasswordType) => {
  //console.log("reset password payload:", payload);
  const { data } = await http.post("/auth/reset-password", payload);
  return data;
};
export const googleAuth = async (payload: { access_token: string }) => {
  const data = await http.post("/auth/google", {
    accessToken: payload.access_token,
  });
  return data;
};

export const signOut = async () => {
  const { data } = await http.get(`/auth/sign-out`);
  return data;
};

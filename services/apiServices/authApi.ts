import { userForgetPasswordType, userLoginType, userResetPasswordType, userSendVerificationOtpType, userSignupType, userVerifyOtpType } from "@/types/authTypes";
import http from "./http";


export const signUp = async (payload:userSignupType) => {
  const { data } = await http.post(`/auth/sign-up`, payload);
  return data;
};

export const verifyOTP = async(payload:userVerifyOtpType) => {
  const { data } = await http.post(`/auth/verify-otp`, payload);
  return data;
};


export const sendVerificationOtp = async (payload: userSendVerificationOtpType) => {
  const { data } = await http.post(`/auth/resend-otp`, payload);
  return data;
};

export const signIn = async (payload: userLoginType) => {
  const { data } = await http.post(`/auth/sign-in`, payload);
  return data;
};

export const forgetPasswordApi = async (payload: userForgetPasswordType) => {
  const { data } = await http.post('/auth/forget-password', payload);
  return data;
};

export const resetPassword = async (payload: userResetPasswordType) => {
  const { data } = await http.post('/auth/reset-password', payload);
  return data;
};
export const 
googleAuth = async (payload:
  {
    access_token: string
  }
) => {
  const data = await http.post("/auth/google", { accessToken: payload.access_token, });
  return data;
};

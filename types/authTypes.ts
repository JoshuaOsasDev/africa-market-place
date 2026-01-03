export type userLoginType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
export type userSignupType = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
};
export type userSendOtpType = {
  email: string;
};
export type userVerifyOtpType = {
  otp: string;
};
export type userResendOtpType = {
  otp: string;
};
export type userForgetPasswordType = {
  email: string;
};

export type userType = {
  email: string;
  firstName: string;
  lastName: string;
  cover: string;
  status: boolean;
  isVerified: boolean;
  role: string;
  gender: string;
  phone: string;
  wishList: string[];
};

export type userAuthType = {
  isAuthenticated: boolean;
  user: null | userType;
  count: number;
  isInitialized: boolean;
  loading: boolean;
};

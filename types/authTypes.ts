export type userLoginType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
export type userSignupType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  confirmPassword: string;
};

export type userSendOtpType = {
  email: string;
};
export type userVerifyOtpType = {
  otp: string;
  email: string;
};
export type userResendOtpType = {
  otp: string;
};
export type userSendVerificationOtpType = {
  email: string;
};
export type userForgetPasswordType = {
  email: string;
};
export type userResetPasswordType = {
  newPassword: string;
  token: string;
};

export type userType = {
  email: string;
  firstName: string;
  lastName: string;
  cover: { public_id: string; url: string };
  status: boolean;
  isVerified: boolean;
  role: string;
  gender: string;
  phone: string;
  wishList: string[];
  city: string;
  address: string;
  postCode: string;
  houseNumber: string;
  country?: string;
  _id?: string;
};

export type userAuthType = {
  isAuthenticated: boolean;
  user: null | userType;
  count: number;
  isInitialized: boolean;
  loading: boolean;
  token: string | null;
};

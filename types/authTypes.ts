export type userLoginType = {
    email: string,
    password: string,
    rememberMe?: boolean
}
export type userSignupType = {
    email: string,
    password: string,
    fullName: string,
    phone: string
}
export type userSendOtpType = {
    email: string
}
export type userVerifyOtpType = {
    otp: string
}
export type userResendOtpType = {
    otp: string
}
export type userForgetPasswordType = {
 email: string
}
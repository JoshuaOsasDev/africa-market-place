import TextStyle from "@/components/common/textStyle";
import { setLoaderAction } from "@/redux/slices/user";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { sendVerificationOtp } from "@/services/apiServices/authApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTimer } from "react-timer-hook";
import { useRouter } from "next/navigation";
function OtpTimer() {
  const [isCodeExpired, setisCodeExpired] = useState(false);
  const expiryTime = new Date();
  expiryTime.setSeconds(expiryTime.getSeconds() + 60);
const [restartTimer, setRestartTimer] = useState(false)
    
  const { seconds, minutes, restart } = useTimer({
      expiryTimestamp: expiryTime,
      
    autoStart: true,
    onExpire: () => setisCodeExpired(true),
  });

  const appState = useAppSelector((state) => state.user.user);

  const { mutateAsync } = useMutation({
    mutationFn: sendVerificationOtp,
  });

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      if (!appState?.email) {
        router.push("/auth-user/login");
        return;
      }
      dispatch(setLoaderAction(true));

      const result = await mutateAsync({
        email: appState?.email,
      });
        setRestartTimer(true)
        setisCodeExpired(false)
        restart(expiryTime)
      toast.success(result.message);
      dispatch(setLoaderAction(false));
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message || "Failed to send otp... Pls retry.",
        );
      } else {
        toast.error("Unknown error");
      }
    } finally {
      dispatch(setLoaderAction(false));
    }
  };

  return (
    <div className="flex w-full flex-row justify-between">
      <p>
        Code expires{" "}
        {!isCodeExpired ? (
          <span className="">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        ) : (
          <span className="text-red-600">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        )}
      </p>

      <div className="flex flex-col lg:flex-row space-x-1">
        <TextStyle
          textContent="Didn’t get a code?"
          textStyle="text-[16px] text-[#667185] text-bold text-center"
        />
        <button onClick={() => handleSubmit()}>
          <TextStyle
            textContent="Resend Code"
            textStyle="text-[#FBC642]  text-3 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
export default OtpTimer;

"use client";
import SendOtpcomp from "@/components/pageComponents/auth/auth-user/sendOtpComp";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  // console.log("params:", params)

  const url = params.url as string;

  return (
    <div>
      <SendOtpcomp url={url} />
    </div>
  );
};

export default Page;

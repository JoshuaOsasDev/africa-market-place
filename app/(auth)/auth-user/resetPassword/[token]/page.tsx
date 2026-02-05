"use client";
import { ResetComp } from "@/components/pageComponents/auth/auth-user/resetComp";
import { useParams } from "next/navigation";

export default function page() {
  const param = useParams();
  const token = param.token as string;
  // console.log("password reset token:", token)

  return <ResetComp token={token} />;
}

"use client";
import { ResetComp } from "@/components/pageComponents/auth/auth-user/resetComp";
import { useParams } from "next/navigation";

export default function Page() {
  const param = useParams();
  const token = param.token as string;

  return <ResetComp token={token} />;
}

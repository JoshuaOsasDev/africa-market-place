import LoginComp from "@/components/pageComponents/auth/auth-user/loginComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Login",
  description: "Africa Market Place, multi vendor ecommerce website",
};
function Page() {
  return (
    <div className="mt-10 py-2 md:mt-0">
      {/* <AuthProgressBarUserAuth level={2} /> */}
      <LoginComp />
    </div>
  );
}

export default Page;

import AuthProgressBarUserAuth from "@/components/common/authProgressBarUserAuth";
import LoginComp from "@/components/pageComponents/auth/auth-user/loginComp";

function page() {
  return (
    <div className="py-2">
      <AuthProgressBarUserAuth level={2} />
      <LoginComp />
    </div>
  );
}

export default page;

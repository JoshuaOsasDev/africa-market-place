import AuthProgressBarUserAuth from "@/components/common/authProgressBarUserAuth";
import SignUpComp from "@/components/pageComponents/auth/auth-user/signUpComp";

function page() {
  return (
    <div className="py-2">
      <AuthProgressBarUserAuth level={2} />
      <SignUpComp />
    </div>
  );
}

export default page;

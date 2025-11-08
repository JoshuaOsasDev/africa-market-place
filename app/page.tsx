import Banner from "@/components/common/banner";
import Header from "../components/common/header";
import Onboarding from "@/components/common/onboarding";



export default function Home() {
  return (
    <div className="px-2 bg-[#EAEAEA] min-h-screen flex flex-col">
      <Header />
      <Banner />
       <Onboarding />
    </div>
  );
}

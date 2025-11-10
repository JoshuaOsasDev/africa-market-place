import Banner from "@/components/common/banner";
import Header from "../components/common/header";
import Footer from "@/components/common/footer";
import SignUpComp from "@/components/pageComponents/signUpComp";

export default function Home() {
  return (
    <div className=" min-h-screen  bg-[#EAEAEA] px-2 flex flex-col">
      <Header />
      <Banner />
     
  
      <Footer />
    </div>
  );
}

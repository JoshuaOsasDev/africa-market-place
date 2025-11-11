import Banner from "@/components/common/banner";
import Header from "../components/common/header";
import Footer from "@/components/common/footer";
import SignUpComp from "@/components/pageComponents/signUpComp";
import SlidderComp from "@/components/pageComponents/Home/slidderComp";

export default function Home() {
  return (
    <div className=" min-h-screen  bg-white px-2 flex flex-col">
      <Header />
      <Banner />
      <SlidderComp />
      <div>
        home page
     </div>
  
      <Footer />
    </div>
  );
}

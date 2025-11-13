import Banner from "@/components/common/banner";
import Header from "../components/common/header";
import Footer from "@/components/common/footer";
import SlidderComp from "@/components/pageComponents/Home/slidderComp";
import Topcategories from "@/components/pageComponents/Home/topcategories";
import BestSellingProducts from "@/components/pageComponents/Home/bestSellingProducts";
import Newletter from "@/components/pageComponents/Home/Newletter";

export default function Home() {
  return (
    <div className=" min-h-screen  bg-white flex flex-col">
      <Header />
      <Banner />
      <SlidderComp />
      <Topcategories />
      <BestSellingProducts />
       <Newletter />
      <Footer />
    </div>
  );
}

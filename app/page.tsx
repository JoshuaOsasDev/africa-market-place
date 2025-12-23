import Banner from "@/components/common/banner";
import Header from "../components/common/header";
import Footer from "@/components/common/footer";
import SlidderComp from "@/components/pageComponents/user/Home/slidderComp";

import BestSellingProducts from "@/components/pageComponents/user/Home/bestSellingProducts";
import Newletter from "@/components/pageComponents/user/Home/Newletter";
import Topcategories from "@/components/pageComponents/user/Home/topcategories";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
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

import Banner from "@/components/common/banner";
import Header from "../components/common/header";
import Footer from "@/components/common/footer";
import SlidderComp from "@/components/pageComponents/user/Home/slidderComp";

import BestSellingProducts from "@/components/pageComponents/user/Home/bestSellingProducts";
import Newletter from "@/components/pageComponents/user/Home/Newletter";
import Topcategories from "@/components/pageComponents/user/Home/topcategories";
import { HealthSafetyBanner } from "@/components/common/healthSafetyBanner";
import DealsForTheDay from "@/components/pageComponents/user/Home/dealsForTheDay";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-2 bg-white lg:px-2">
      <Header />
      {/* <Banner /> */}
      <SlidderComp />
      <Topcategories />
      <HealthSafetyBanner />
      <BestSellingProducts />
      <DealsForTheDay />
      <Newletter />
      <Footer />
    </div>
  );
}

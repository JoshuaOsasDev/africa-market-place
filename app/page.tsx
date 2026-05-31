import Footer from "@/components/common/footer";
import SlidderComp from "@/components/pageComponents/user/home/slidderComp";

import BestSellingProducts from "@/components/pageComponents/user/home/bestSellingProducts";
import Newletter from "@/components/pageComponents/user/home/newletter";
import Topcategories from "@/components/pageComponents/user/home/topcategories";
import { HealthSafetyBanner } from "@/components/common/healthSafetyBanner";
import DealsForTheDay from "@/components/pageComponents/user/home/dealsForTheDay";
import Header from "@/components/common/header";
import PromoSection from "@/components/common/promoSection";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-2 bg-white lg:px-2">
      <Header />
      <SlidderComp />
      <PromoSection />
      <Topcategories />
      <HealthSafetyBanner />
      <BestSellingProducts />
      <DealsForTheDay />
      <Newletter />
      <Footer />
    </div>
  );
}

import Carousel from "@/components/common/carousel";
import HomeAccordion from "./homeAccordion";

function SlidderComp() {
  return (
    <div className="my-3 mt-25 grid grid-cols-10 gap-3 px-2 sm:mt-0">
      <div className="hidden rounded-[10px] border-2 border-[#EAEAEA] p-4 lg:col-span-2 lg:block">
        <HomeAccordion />
      </div>
      <div className="col-span-10 lg:col-span-8">
        <Carousel />
      </div>
    </div>
  );
}

export default SlidderComp;

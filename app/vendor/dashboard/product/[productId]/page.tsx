import ProductDetails from "@/components/pageComponents/vendor/Product/ProductDetails";
import ProductDetailsButton from "@/components/pageComponents/vendor/Product/productDetailsButton";
import ProductLinkNav from "@/components/pageComponents/vendor/Product/productLinkNav";
import { ArrowLeft } from "lucide-react";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  console.log(params, "params");
  return (
    <div className="">
      <div className="hidden items-end justify-between md:flex">
        <div className="flex flex-col gap-2">
          <h1 className="hidden text-2xl font-medium leading-8 tracking-[0.5%] text-[#333843] md:block">
            Products Details
          </h1>
          <ProductLinkNav />
        </div>
        <ProductDetailsButton />
      </div>

      <ArrowLeft className="ml-2 md:hidden" />
      <ProductDetails />
    </div>
  );
}

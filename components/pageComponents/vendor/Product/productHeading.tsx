import ExportProduct from "./exportProduct";
import ProductLinkNav from "./productLinkNav";

export default function ProductHeading() {
  return (
    <div className="items-end justify-between md:flex">
      <div className="flex flex-col gap-2">
        <h1 className="hidden text-2xl leading-8 font-medium tracking-[0.5%] text-[#333843] md:block">
          Products
        </h1>
        <ProductLinkNav />
      </div>
      <ExportProduct />
    </div>
  );
}

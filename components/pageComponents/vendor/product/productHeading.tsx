import ExportProduct from "./exportProduct";
import ProductLinkNav from "./productLinkNav";

export default function ProductHeading({
  name,
  id,
  showid,
  type,
}: {
  name: string;
  id: string;
  type: string;
  showid: boolean;
}) {
  return (
    <div className="items-end justify-between md:flex">
      <div className="flex flex-col gap-2">
        <h1 className="hidden text-2xl leading-8 font-medium tracking-[0.5%] text-[#333843] md:block">
          {type}
        </h1>
        <ProductLinkNav name={name} id={id} />
      </div>
      <ExportProduct name={name} typeId={type} showId={showid} />
    </div>
  );
}

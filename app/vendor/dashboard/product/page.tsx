
import ProductHeading from "@/components/pageComponents/Product/productHeading";
import ProductTable from "@/components/pageComponents/Product/productTable";
import SearchAndFilterProduct from "@/components/pageComponents/Product/searchAndFilterProduct";
import SetShowForm from "@/components/pageComponents/Product/setShowForm";
import { Suspense } from "react";

const ProductPage = () => {
  return (
    <div>
      <Suspense fallback={ <div>Loading...</div>}>
        
      <SetShowForm />
         </Suspense>
    </div>
  );
};

export default ProductPage;


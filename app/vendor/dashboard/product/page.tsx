import SetShowForm from "@/components/pageComponents/vendor/Product/setShowForm";
import { Suspense } from "react";

const ProductPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SetShowForm />
      </Suspense>
    </div>
  );
};

export default ProductPage;

"use client";
import SetShowForm from "@/components/pageComponents/vendor/product/setShowForm";

const ProductPage = () => {
  // const dispatch = useAppDispatch();
  // const { allCategories } = useAllCategories();
  // console.log(allCategories, "all cat");

  // useEffect(() => {
  //   if (allCategories) {
  //     dispatch(setCategories(allCategories));
  //   }
  // }, [allCategories, dispatch]);

  return (
    <div>
      <SetShowForm />
    </div>
  );
};

export default ProductPage;

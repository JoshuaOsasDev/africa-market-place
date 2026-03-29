import Banner from "@/components/common/banner";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { CategoryProvider } from "@/components/pageComponents/user/categories/categoryContext";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Banner />
      <CategoryProvider>
        <div className="mt-3 md:mt-0">{children}</div>
      </CategoryProvider>
      <Footer />
    </div>
  );
}

export default layout;

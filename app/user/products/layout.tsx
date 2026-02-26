import Banner from "@/components/common/banner";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      <Banner />
      {children}
      <Footer />
    </div>
  );
}

export default layout;

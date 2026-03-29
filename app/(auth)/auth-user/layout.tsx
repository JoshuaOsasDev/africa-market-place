import Banner from "@/components/common/banner";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#EAEAEA]">
      {/* <Header />
      <Banner /> */}
      <div className="mx-auto my-10 flex flex-1 flex-col items-center justify-center space-y-2 rounded-lg bg-white px-4 md:my-4 md:px-6 lg:px-8">
        <div className="rounded-md">{children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default layout;

//xs:w-5/6 w-4/6

//flex flex-col justify-center items-center flex-1 xs:w-5/6 w-8/9  sm:5/10 md:w-5/10 lg:w-1/3  mx-auto space-y-2 bg-white my-4 rounded-lg p-8

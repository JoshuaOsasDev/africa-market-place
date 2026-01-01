import Banner from "@/components/common/banner";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import SignUpNav from "@/components/common/signUpNav";


function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" min-h-screen  bg-[#EAEAEA] px-2 flex flex-col">
      <Header />
      <Banner />
      <div className="flex flex-col justify-center items-center flex-1  mx-auto  space-y-2 bg-white my-4 rounded-lg px-4
      md:px-6 lg:px-8
      ">
        <div className="rounded-md">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default layout;

//xs:w-5/6 w-4/6

//flex flex-col justify-center items-center flex-1 xs:w-5/6 w-8/9  sm:5/10 md:w-5/10 lg:w-1/3  mx-auto space-y-2 bg-white my-4 rounded-lg p-8

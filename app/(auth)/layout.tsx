import SignUpNav from "@/components/common/signUpNav";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#EAEAEA]">
      <SignUpNav />
      <div className="xs:w-5/6 m-auto my-10 flex w-9/10 flex-col items-center justify-center rounded-lg bg-[#FFFFFF] md:flex-1 md:bg-[#EAEAEA]">
        <div className="rounded-md p-4">
          <div>{children}</div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default layout;

//xs:w-5/6 w-4/6

//flex flex-col justify-center items-center flex-1 xs:w-5/6 w-8/9  sm:5/10 md:w-5/10 lg:w-1/3  mx-auto space-y-2 bg-white my-4 rounded-lg p-8

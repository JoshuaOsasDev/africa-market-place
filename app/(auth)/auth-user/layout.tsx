function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-[#EAEAEA]">
      <div className="mx-auto my-5 flex flex-1 flex-col items-center justify-center space-y-2 rounded-lg bg-white px-4 md:my-13 md:px-6 lg:px-8">
        <div className="rounded-md px-5 shadow-2xl md:px-0 md:shadow-none">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;

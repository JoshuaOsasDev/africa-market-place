import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

import UserSideBar from "@/components/common/userSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-0 md:grid-cols-[16rem_1fr] md:grid-rows-[auto_1fr_auto]">
      {/* Header spans full width */}
      <div className="md:col-span-2">
        <Header />
      </div>

      {/* Sidebar - only visible on md and above */}
      <aside className="mt-30 hidden bg-white md:mt-2 md:mb-4 md:block">
        <UserSideBar />
      </aside>

      {/* Main content */}
      <main className="mt-13 bg-white px-4 pb-1 md:mt-2 md:bg-[#F0F1F3] md:pt-5">
        {children}
      </main>

      {/* Footer spans full width */}
      <footer className="md:col-span-2">
        <Footer />
      </footer>
    </div>
  );
}

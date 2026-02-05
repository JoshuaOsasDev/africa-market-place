import Banner from "@/components/common/banner";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default layout;

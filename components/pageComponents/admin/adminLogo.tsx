import { changa } from "@/app/admin/dashboard/layout";
import { Link } from "lucide-react";

export default function AdminLogo() {
  return (
    <div className="hidden w-[296px] items-center justify-between md:flex">
      <Link href="/" className="px-[30px] py-3">
        <h1 className={`text-[${changa}]text-2xl text-[#2E7D32]`}>
          African Kitchen{" "}
        </h1>
      </Link>
    </div>
  );
}

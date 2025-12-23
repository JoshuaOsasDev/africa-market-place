import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-[#111827] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#111827] mb-2">
            Product Not Found
          </h2>
          <p className="text-[#6F6F6F] text-base">
            Sorry, we couldn't find the product you're looking for. It may have
            been removed or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-[#2E7D32] hover:bg-[#246628] gap-2">
              <Home size={20} />
              Go Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="gap-2">
              <Search size={20} />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
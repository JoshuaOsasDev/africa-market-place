import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2E7D32] px-6 text-center text-white">
     

      {/* Heading */}
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">
        Oops! Page not found.
      </h2>

      {/* Description */}
      <p className="mb-8 max-w-md mx-auto">
        The page you’re looking for doesn’t exist or has been moved. Don’t worry,
        you can go back to the home page.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-white text-[#2E7D32] font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

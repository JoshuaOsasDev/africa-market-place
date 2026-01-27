"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function CabinError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const route = useRouter();
  const reload = () => {
    startTransition(() => {
      route.refresh();
      reset();
    });
  };
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={reload}
        className="bg-accent-500 text-primary-800 inline-block px-6 py-3 text-lg"
      >
        <Link href="/product">Try again</Link>
      </button>
    </main>
  );
}

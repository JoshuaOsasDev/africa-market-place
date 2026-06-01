// app/user/products/[slug]/page.tsx

import ProductDetailClient from "@/components/pageComponents/user/home/productDetailClient";

interface PageProps {
  // In Next.js 15/16, params is a Promise
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // 1. Explicitly await the promise on the server side
  const resolvedParams = await params;

  // 2. Pass the raw object down cleanly
  return <ProductDetailClient resolvedParams={resolvedParams} />;
}

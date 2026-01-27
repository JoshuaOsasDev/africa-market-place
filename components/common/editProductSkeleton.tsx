export default function EditProductSkeleton() {
  return (
    <div className="min-h-screen animate-pulse py-6">
      <div className="grid max-w-7xl grid-cols-1 gap-6 px-2 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-2">
          {/* General Information */}
          <SkeletonCard>
            <SkeletonTitle />
            <SkeletonInput />
            <SkeletonTextarea />
          </SkeletonCard>

          {/* Media */}
          <SkeletonCard>
            <SkeletonTitle />
            <div className="flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100">
              <div className="h-16 w-16 rounded-full bg-gray-300" />
            </div>
          </SkeletonCard>

          {/* Price */}
          <SkeletonCard>
            <SkeletonTitle />
            <SkeletonInput />
            <SkeletonInput />
          </SkeletonCard>

          {/* Inventory */}
          <SkeletonCard>
            <SkeletonTitle />
            <div className="grid grid-cols-2 gap-4">
              <SkeletonInput />
              <SkeletonInput />
            </div>
          </SkeletonCard>

          {/* Shipping */}
          <SkeletonCard>
            <SkeletonTitle />
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded bg-gray-300" />
              <div className="h-4 w-40 rounded bg-gray-300" />
            </div>
          </SkeletonCard>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Category */}
          <SkeletonCard>
            <SkeletonTitle />
            <SkeletonInput />
          </SkeletonCard>

          {/* Status */}
          <SkeletonCard>
            <SkeletonTitle />
            <SkeletonInput />
            <div className="mt-4 flex items-center gap-3">
              <div className="h-5 w-5 rounded bg-gray-300" />
              <div className="h-4 w-32 rounded bg-gray-300" />
            </div>
          </SkeletonCard>
        </div>

        {/* FOOTER */}
        <div className="lg:col-span-3">
          <div className="flex justify-center gap-4 py-4">
            <div className="h-10 w-40 rounded-lg bg-gray-300" />
            <div className="h-10 w-48 rounded-lg bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small reusable pieces ---------- */

function SkeletonCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SkeletonTitle() {
  return <div className="h-5 w-48 rounded bg-gray-300" />;
}

function SkeletonInput() {
  return <div className="h-10 w-full rounded-lg bg-gray-300" />;
}

function SkeletonTextarea() {
  return <div className="h-24 w-full rounded-lg bg-gray-300" />;
}

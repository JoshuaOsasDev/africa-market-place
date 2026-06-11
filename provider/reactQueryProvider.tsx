// "use client";
// import ErrorScreen from "@/components/common/errorScreen";
// import {
//   QueryCache,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ErrorBoundary } from "next/dist/client/components/error-boundary";
// import { useState } from "react";

// export default function ReactQueryProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             retry: false,
//           },
//         },

//         queryCache: new QueryCache({
//           onError: (error: any) => {
//             const message =
//               error?.response?.data?.message ||
//               error?.message ||
//               "Something went wrong";

//             toast.error(message, {
//               duration: 4000,
//               icon: "✗",
//               position: "top-center",
//               style: {
//                 background: "#fee2e2",
//                 color: "#b91c1c",
//                 border: "1px solid #fecaca",
//               },
//             });
//           },
//         }),
//       }),
//   );

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ErrorBoundary errorComponent={ErrorScreen}>
//         <ReactQueryDevtools initialIsOpen={false} />

//         {children}
//       </ErrorBoundary>
//     </QueryClientProvider>
//   );
// }

"use client";
import ErrorScreen from "@/components/common/errorScreen";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useState } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );

  // Check if the current environment is development
  const isDev = process.env.NODE_ENV === "development";

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      {isDev ? (
        // Development: Wrap with local ErrorBoundary for quick debugging
        <ErrorBoundary errorComponent={ErrorScreen}>{children}</ErrorBoundary>
      ) : (
        // Production: Pass through directly so Next.js error.js/global-error.js handles it
        <>{children}</>
      )}
    </QueryClientProvider>
  );
}

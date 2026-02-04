"use client";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import toast from "react-hot-toast";

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

        //Handle general error
        queryCache: new QueryCache({
          onError: (error: any) => {
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Something went wrong";

            toast.error(message, {
              duration: 4000,
              icon: "✗",
              position: "top-center",
              style: {
                background: "#fee2e2",
                color: "#b91c1c",
                border: "1px solid #fecaca",
              },
            });
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}

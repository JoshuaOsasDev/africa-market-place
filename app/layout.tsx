import type { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/provider/reactQueryProvider";
import ReduxProvider from "@/provider/ReduxProvider";
import ToastProvider from "@/provider/toastProvider";
import StripProvider from "@/provider/stripPaymentProvider";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Africa Market Place",
  description: "A multivendor ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className={nunito.className}>
        <ReduxProvider>
          <ReactQueryProvider>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              <ToastProvider>
                <StripProvider>{children}</StripProvider>
              </ToastProvider>
            </GoogleOAuthProvider>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

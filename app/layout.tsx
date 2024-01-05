import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Header from "@/components/organisms/Header";
import MaxWidthWrapper from "@/components/atoms/MaxWidthContainer";
import { ReactReduxProvider } from "@/providers/ReactReduxProvider";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studiopresto",
  description: "Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactReduxProvider>
          <MaxWidthWrapper className="mt-10 shadow-xl p-6 rounded-xl">
            <Header />
            {children}
            <ToastContainer position="bottom-left" />
          </MaxWidthWrapper>
        </ReactReduxProvider>
      </body>
    </html>
  );
}

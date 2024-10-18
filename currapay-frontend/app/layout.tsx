import type { Metadata } from "next";
import { StoreProvider } from "../stores/provider";
import { Suspense } from "react";
import { Urbanist } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "react-material-symbols/rounded";
import "../globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Currapay",
  description: "currapay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-urbanist ${urbanist.variable}`}
      >
        <div>
          <StoreProvider>
            <Suspense>
              <Nav />
              {children}
              <Footer />
            </Suspense>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}

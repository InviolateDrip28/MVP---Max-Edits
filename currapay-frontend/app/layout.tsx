import type { Metadata } from "next";
import { StoreProvider } from "../stores/provider";
import { Suspense } from "react";
import { DM_Sans, Poppins, Raleway } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "react-material-symbols/rounded";
import "../globals.css";

const raleway = Raleway({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const DM = DM_Sans({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmSans",
});

const poppins = Poppins({
  variable: "--font-poppins",
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
        className={`font-dmSans ${raleway.variable} ${DM.variable} ${poppins.variable}`}
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

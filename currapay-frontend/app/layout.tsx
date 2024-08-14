import type { Metadata } from "next";
import { DM_Sans, Poppins, Raleway } from "next/font/google";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import "../globals.css";

const raleway = Raleway({
  weight: ["300", "400", "500","600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const DM = DM_Sans({
  weight: ["300", "400", "500","600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmSans",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500","600", "700"],
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
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

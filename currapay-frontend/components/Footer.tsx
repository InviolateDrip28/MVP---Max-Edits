import Link from "next/link";
import CurrapayLogo from "../public/Currapay.png";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="px-6 py-8 sm:px-10 box-border bg-secondary/30 flex flex-col w-full">
      <div>
        <Image
          src={CurrapayLogo}
          alt="Currapay Logo"
          className="h-1/6 w-1/6 mb-8 -ml-4"
        ></Image>
      </div>

      <div className="flex flex-row">
        <div>
          <p>&copy; CurraPay, Inc. {new Date().getFullYear()}</p>
          <div id="terms-and-privacy" className="flex">
            <Link href="/" className="hover:underline">Terms of Service</Link>
            <p className="px-2">|</p>
            <Link href="/" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>

        <div className="ml-auto">
          <div id="media-links" className="flex gap-4">
            <Link href="https://www.linkedin.com/company/currapay/" target="_blank" className="hover:underline">
              LinkedIn
            </Link>
            <Link href="https://x.com/CurraPay" target="_blank" className="hover:underline">X</Link>
            <Link href="https://www.youtube.com/@Currapay" target="_blank" className="hover:underline">
              YouTube
            </Link>
          </div>
          <div>more footer links here</div>
        </div>
      </div>
    </footer>
  );
};

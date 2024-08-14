import Link from "next/link";
import CurrapayLogo from "../public/Currapay.png";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

export const Footer = () => {
  return (
    <footer className="px-6 py-8 sm:px-10 box-border bg-backgroundSecondary flex flex-col w-full">
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
            <Link href="/" className="hover:underline">
              Terms of Service
            </Link>
            <p className="px-2">|</p>
            <Link href="/" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="ml-auto">
          <div id="media-links" className="flex gap-6">
            <Link
              href="https://www.linkedin.com/company/currapay/"
              target="_blank"
            >
              <LinkedInIcon className="hover:text-accent hover:scale-110" />
            </Link>
            <Link href="https://x.com/CurraPay" target="_blank">
              <XIcon className="hover:text-accent hover:scale-110" />
            </Link>
            <Link
              href="https://www.youtube.com/@Currapay"
              target="_blank"
            >
              <YouTubeIcon className="hover:text-accent hover:scale-110" />
            </Link>
          </div>
          <div>more footer links here</div>
        </div>
      </div>
    </footer>
  );
};

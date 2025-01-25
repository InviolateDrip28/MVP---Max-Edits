import Link from "next/link";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CurrapayPrimaryLogoBlack from "@/public/logos/CurrapayPrimaryLogoBlack.png";

/* Footer for the main layout */
export const Footer = () => {
  return (
    <footer className="px-6 py-8 md:px-10 box-border bg-secondary/10 flex flex-col w-full">
      <div className="py-4">
        <Image
          src={CurrapayPrimaryLogoBlack}
          alt="Currapay Logo"
          className="w-[200px] -mx-2"
        />
        <p className="-ml-0.5">
          &copy; CurraPay, Inc. {new Date().getFullYear()}
        </p>
      </div>
      <p className="pt-2 pb-8 sm:pt-2 sm:pb-0 text-sm sm:text-base 2xl:text-lg">
        <u>Disclaimer</u>: Instead of banner ads and paywalls, CurraPay makes money
        through affiliate links to the various payment service
        providers featured on our website. While we work hard to scout
        the market for the best deals, we&apos;re unable to consider
        every possible product available to you. Our extensive range
        of trusted affiliate partners enables us to make detailed,
        unbiased, and solution-driven recommendations for all types of
        consumer questions and problems. This allows us to match our
        users with the right providers to suit their needs and, in
        doing so, match our providers with new customers, creating a
        win-win for everybody involved. However, while some links on
        CurraPay may indeed earn us a commission, this fact never
        impacts the independence and integrity of our opinions,
        recommendations, and evaluations.
      </p>

      <div className="flex flex-col sm:flex-row pt-6 md:pt-12 space-y-8 sm:space-y-0 -ml-0.5">
        <div>
          <div id="terms-and-privacy" className="flex flex-col">
            <Link
              href="https://www.iubenda.com/terms-and-conditions/17897588"
              className="link"
              target="_blank"
            >
              Terms of Service
            </Link>
            <Link
              href="https://www.iubenda.com/privacy-policy/17897588"
              className="link"
              target="_blank"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://www.iubenda.com/privacy-policy/17897588/cookie-policy"
              className="link"
              target="_blank"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        <div className="sm:ml-auto">
          Follow us on:
          <div
            id="media-links"
            className="flex -ml-1 gap-2 md:ml-0 md:gap-6"
          >
            <Link
              href="https://www.linkedin.com/company/currapay/"
              target="_blank"
            >
              <LinkedInIcon className="scale-75 hover:scale-90 md:scale-100 hover:text-accent md:hover:scale-110" />
            </Link>

            <Link
              href="https://www.facebook.com/share/qayqz95KLMDakGb2/?mibextid=LQQJ4d"
              target="_blank"
            >
              <FacebookIcon className="scale-75 hover:scale-90 md:scale-100 hover:text-accent md:hover:scale-110" />
            </Link>

            <Link
              href="https://www.instagram.com/currapay/"
              target="_blank"
            >
              <InstagramIcon className="scale-75 hover:scale-90 md:scale-100 hover:text-accent md:hover:scale-110" />
            </Link>

            <Link href="https://x.com/CurraPay" target="_blank">
              <XIcon className="scale-75 hover:scale-90 md:scale-100 hover:text-accent md:hover:scale-110" />
            </Link>

            <Link
              href="https://www.youtube.com/@Currapay"
              target="_blank"
            >
              <YouTubeIcon className="scale-75 hover:scale-90 md:scale-100 hover:text-accent md:hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

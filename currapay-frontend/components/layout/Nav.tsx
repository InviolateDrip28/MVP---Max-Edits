"use client";
import Image from "next/image";
import Link from "next/link";
import CurrapayShortLogoBlack from "@/public/logos/CurrapayShortLogoBlack.png";
import CurrapayPrimaryLogoBlack from "@/public/logos/CurrapayPrimaryLogoBlack.png";
import NavPopover from "./NavDrawer";
import { useUserStore } from "@/stores/provider";
import { observer } from "mobx-react";
import { MaterialSymbol } from "react-material-symbols";
import LanguagePopover from "./LanguagePopover";

/** Navbar for the main layout */
const Nav = observer(() => {
  const userStore = useUserStore();

  return (
    <header className="fixed top-0 w-full bg-white glass px-6 py-3 sm:px-10 sm:py-4 box-border flex items-center shadow-lg z-[50]">
      <Link href="/" className="hidden md:flex">
        <Image
          src={CurrapayPrimaryLogoBlack}
          alt="Currapay Primary Logo"
          className="w-[200px] -m-2"
        />
      </Link>

      <Link href="/" className="md:hidden">
        <Image
          src={CurrapayShortLogoBlack}
          alt="Currapay Small Logo"
          className="w-[70px] -m-2"
        />
      </Link>

      {/* Desktop */}
      <div
        id="navbar-tabs"
        className="hidden sm:flex items-center gap-2 justify-between w-full"
      >
        <span className="mr-auto">
          <Link
            href="/"
            className="py-2 px-4 hover:underline hover:underline-offset-8 hover:text-accent"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="py-2 px-4 hover:underline hover:underline-offset-8 hover:text-accent"
          >
            About
          </Link>
          {/* <Link
          href="/rates"
          className="py-2 px-4 hover:underline hover:underline-offset-8 hover:text-accent"
        >
          Rates
        </Link> */}
          <Link
            href="/news"
            className="py-2 pl-4 hover:underline hover:underline-offset-8 hover:text-accent"
          >
            News
          </Link>

          {/* <LanguagePopover /> */}
        </span>
        <span className="right-0">
          <Link
            href="/profile"
            className="ml-4 px-3 py-1.5 rounded-lg text-white hover:bg-accent/75 flex items-center bg-accent font-semibold"
          >
            {userStore.loggedIn ? (
              <MaterialSymbol
                icon="account_circle"
                fill
                size={24}
                weight={300}
                color="inherit"
                className="mr-1 -ml-1"
              />
            ) : (
              <MaterialSymbol
                icon="login"
                fill
                size={24}
                weight={300}
                color="inherit"
                className="mr-1 -ml-1"
              />
            )}
            {userStore.loggedIn ? "Profile" : "Sign in"}
          </Link>
        </span>
      </div>

      {/* Medium screens and mobile View */}
      <div className="ml-auto absolute right-6 sm:hidden items-center inline-flex gap-3">
        {/* <LanguagePopover /> */}
        <NavPopover />
      </div>
    </header>
  );
});

export default Nav;

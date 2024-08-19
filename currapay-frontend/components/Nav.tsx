"use client";
import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import { CurrapaySimpleIcon } from "../public/CurrapaySimpleIcon";
import CurrapayPrimaryLogo from "@/public/CurrapayPrimaryLogo.png";
import NavPopover from "./NavPopover";
import LanguagePopover from "./LanguagePopover";

export const Nav = () => {
  return (
    <header className="sticky top-0 w-full bg-white px-6 py-3 sm:px-10 sm:py-4 box-border flex items-center shadow-xl z-[50]">
      <Link href="/" className="hidden md:flex">
        <Image
          src={CurrapayPrimaryLogo}
          alt="Currapay Logo"
          className="w-[200px] -m-2"
        />
      </Link>

      <Link href="/" className="md:hidden">
        <CurrapaySimpleIcon className="w-[40px] " />
      </Link>

      {/* Desktop */}
      <div id="navbar-tabs" className="sm:flex ml-auto gap-2 hidden">
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
        <Link
          href="/rates"
          className="py-2 px-4 hover:underline hover:underline-offset-8 hover:text-accent"
        >
          Rates
        </Link>
        <Link
          href="/news"
          className="py-2 px-4 hover:underline hover:underline-offset-8 hover:text-accent"
        >
          News
        </Link>

        <LanguagePopover />

        <Link
          href="/profile"
          className="pl-2 translate-y-1 text-secondary hover:text-accent"
        >
          <MaterialSymbol
            icon="account_circle"
            fill
            size={36}
            weight={100}
            color="inherit"
          />
        </Link>
      </div>

      {/* Medium screens and mobile View */}
      <div className="ml-auto absolute right-6 sm:hidden items-center inline-flex gap-3">
        <LanguagePopover />
        <Link
          href="/profile"
          className="text-secondary hover:text-accent translate-y-1"
        >
          <MaterialSymbol
            icon="account_circle"
            fill
            size={36}
            weight={100}
            color="inherit"
          />
        </Link>
        <NavPopover />
      </div>
    </header>
  );
};

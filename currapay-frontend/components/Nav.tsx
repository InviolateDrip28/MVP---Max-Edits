"use client";
import CurrapayLogo from "../public/Currapay.png";
import Image from "next/image";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useRef, useEffect } from "react";

export const Nav = () => {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const close = (e: any) => {
    if (
      dropdownRef.current &&
      open &&
      !(dropdownRef.current as HTMLElement).contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", close);
  }, [])

  return (
    <header className="relative w-full bg-muted px-6 py-2.5 md:px-10 md:py-2 box-border flex items-center">
      <Image
        src={CurrapayLogo}
        alt="Currapay Logo"
        className="h-1/4 w-1/4 md:h-1/6 md:w-1/6"
      ></Image>

      {/* Desktop */}
      <div
        id="navbar-tabs"
        className="md:flex ml-auto gap-2 font-semibold hidden"
      >
        <Link
          href="/"
          className="py-2 px-4 hover:bg-secondary/25 hover:rounded"
        >
          HOME
        </Link>
        <Link
          href="/about"
          className="py-2 px-4 hover:bg-secondary/25 hover:rounded"
        >
          ABOUT
        </Link>
        <Link
          href="/rates"
          className="py-2 px-4  hover:bg-secondary/25 hover:rounded"
        >
          RATES
        </Link>
        <Link
          href="/news"
          className="py-2 px-4 hover:bg-secondary/25 hover:rounded"
        >
          NEWS
        </Link>
        <Link
          href="/"
          className="px-2 translate-y-0.5 text-secondary"
        >
          <AccountCircleIcon fontSize="large" color="inherit" />
        </Link>
      </div>

      {/* Medium screens and mobile View */}
      <div className="ml-auto absolute right-6 md:hidden items-center inline-flex gap-4">
        <Link href="/" className="text-secondary">
          <AccountCircleIcon fontSize="large" color="inherit" />
        </Link>
        <div
          className="font-semibold inline-block text-left text-base"
          id="dropdownMenu"
          ref={dropdownRef}
        >
          <button
            className={`${open ? "text-accent" : "text-primary"}`}
            onClick={() => setOpen((open) => !open)}
          >
            <MenuIcon />
          </button>

          <div
            className={`${
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            } absolute w-48 right-0 z-10 mt-2 rounded-lg bg-white/80 backdrop-blur-xl drop-shadow-2xl shadow-2xl transition-all duration-300 `}
            id="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-2 px-2 divide-y-[0.5px] divide-secondary/30">
              <Link href="/" className="block p-2">
                HOME
              </Link>
              <Link href="/about" className="block p-2">
                ABOUT
              </Link>
              <Link href="/rates" className="block p-2">
                RATES
              </Link>
              <Link href="/news" className="block p-2">
                NEWS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

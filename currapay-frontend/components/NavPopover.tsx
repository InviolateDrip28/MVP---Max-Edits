import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function NavPopover() {
  return (
    <div className="flex w-full">
      <div className="flex gap-8">
        <Popover>
          <PopoverButton className="block focus:outline-none data-[active]:text-accent data-[hover]:text-accent ">
            <MenuIcon />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="fixed w-56 z-[99] divide-y divide-secondary/10 rounded-xl bg-white glass transition duration-200 ease-in-out data-[closed]:-translate-y-2 translate-y-6 -translate-x-4 data-[closed]:opacity-0 drop-shadow-2xl font-semibold"
          >
            {({ close }) => (
              <div>
                <div className="p-3 ">
                  <Link
                    className="block rounded-lg py-2 px-3 transition hover:text-accent"
                    href="/"
                    onClick={() => close()}
                  >
                    Home
                  </Link>
                </div>
                <div className="p-3 ">
                  <Link
                    className="block rounded-lg py-2 px-3 transition hover:text-accent"
                    href="about"
                    onClick={() => close()}
                  >
                    About
                  </Link>
                </div>
                <div className="p-3 ">
                  <Link
                    className="block rounded-lg py-2 px-3 transition hover:text-accent"
                    href="/rates"
                    onClick={() => close()}
                  >
                    Rates
                  </Link>
                </div>
                <div className="p-3 ">
                  <Link
                    className="block rounded-lg py-2 px-3 transition hover:text-accent"
                    href="/news"
                    onClick={() => close()}
                  >
                    News
                  </Link>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}

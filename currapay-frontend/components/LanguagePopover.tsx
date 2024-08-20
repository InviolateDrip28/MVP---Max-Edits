import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { MaterialSymbol } from "react-material-symbols";
import Link from "next/link";
import { useState } from "react";
import { LANGUAGES } from "@/app/constants";

/**
 * Popover to switch the language in the nav bar
 * Adapated from https://headlessui.com/v1/react/popover
 */


export default function LanguagePopover() {
  const [language, setLanguage] = useState("EN");
  return (
    <div className="flex w-full">
      <div className="flex gap-8">
        <Popover>
          <PopoverButton className="block focus:outline-none data-[active]:text-accent data-[hover]:text-accent translate-y-1 -mr-1 sm:mr-0">
            <MaterialSymbol
              icon="language"
              size={36}
              weight={100}
              color="inherit"
            />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="absolute z-[99] divide-y divide-secondary/10 rounded-xl bg-white glass transition duration-200 ease-in-out data-[closed]:-translate-y-2 translate-y-6 data-[closed]:opacity-0 drop-shadow-2xl font-semibold"
          >
            {({ close }) => (
              <div>
                {LANGUAGES.map((language) => (
                  <div className="p-3 " key="language">
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:text-accent"
                      href=""
                      onClick={() => close()}
                    >
                      {language}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}

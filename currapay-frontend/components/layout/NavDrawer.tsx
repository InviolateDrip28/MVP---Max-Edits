import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

/** Drawer to navigate between site pages in the nav bar (mobile only)
 * Adapated from https://flowbite-react.com/docs/components/drawer
 */
export default function NavPopover() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <button
          className="block focus:outline-none data-[active]:text-accent data-[hover]:text-accent "
          onClick={() => setIsOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>
      <Drawer
        position="right"
        open={isOpen}
        onClose={close}
        backdrop={false}
        className={`p-6 bg-background w-3/4 ${isOpen && "drop-shadow-nav"}`}
      >
        <Drawer.Header
          style={{ fontSize: "30px" }}
          className="pl-3 pb-8 -mt-3"
          theme={{
            inner: {
              titleText: "text-2xl",
              closeButton:
                "text-secondary hover:bg-secondary/10 absolute end-2.5 top-3 flex h-8 w-8 items-center justify-center hover:text-accent rounded-lg bg-transparent",
            },
          }}
          title="Menu"
          titleIcon={() => <></>}
        />
        <Drawer.Items>
          <Link
            className="block rounded-lg p-3 transition hover:text-accent hover:bg-secondary/10"
            href="/"
            onClick={() => close()}
          >
            <h3>Home</h3>
          </Link>

          <Link
            className="block rounded-lg p-3 transition hover:text-accent hover:bg-secondary/10"
            href="/about"
            onClick={() => close()}
          >
            <h3>About</h3>
          </Link>

          {/* <Link
            className="block rounded-lg p-3 transition hover:text-accent hover:bg-secondary/10"
            href="/rates"
            onClick={() => close()}
          >
            <h3>Rates</h3>
          </Link> */}

          <Link
            className="block rounded-lg p-3 transition hover:text-accent hover:bg-secondary/10"
            href="/news"
            onClick={() => close()}
          >
            <h3>News</h3>
          </Link>
        </Drawer.Items>
      </Drawer>
    </>
    // <div className="flex w-full">
    //   <div className="flex gap-8">
    //     <Popover>
    //       <PopoverButton className="block focus:outline-none data-[active]:text-accent data-[hover]:text-accent ">
    //         <MenuIcon />
    //       </PopoverButton>
    //       <PopoverPanel
    //         transition
    //         anchor="bottom"
    //         className="fixed w-56 z-[99] divide-y divide-secondary/10 rounded-xl bg-white glass transition duration-200 ease-in-out data-[closed]:-translate-y-2 translate-y-6 -translate-x-4 data-[closed]:opacity-0 drop-shadow-2xl font-semibold"
    //       >
    //         {({ close }) => (
    //           <div>
    //             <div className="p-3 ">
    //               <Link
    //                 className="block rounded-lg py-2 px-3 transition hover:text-accent"
    //                 href="/"
    //                 onClick={() => close()}
    //               >
    //                 Home
    //               </Link>
    //             </div>
    //             <div className="p-3 ">
    //               <Link
    //                 className="block rounded-lg py-2 px-3 transition hover:text-accent"
    //                 href="about"
    //                 onClick={() => close()}
    //               >
    //                 About
    //               </Link>
    //             </div>
    //             <div className="p-3 ">
    //               <Link
    //                 className="block rounded-lg py-2 px-3 transition hover:text-accent"
    //                 href="/rates"
    //                 onClick={() => close()}
    //               >
    //                 Rates
    //               </Link>
    //             </div>
    //             <div className="p-3 ">
    //               <Link
    //                 className="block rounded-lg py-2 px-3 transition hover:text-accent"
    //                 href="/news"
    //                 onClick={() => close()}
    //               >
    //                 News
    //               </Link>
    //             </div>
    //           </div>
    //         )}
    //       </PopoverPanel>
    //     </Popover>
    //   </div>
    // </div>
  );
}

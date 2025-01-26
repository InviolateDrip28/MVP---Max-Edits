import { Drawer } from "flowbite-react";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useUserStore } from "@/stores/provider";
import { observer } from "mobx-react";
import { MaterialSymbol } from "react-material-symbols";

/** Drawer to navigate between site pages in the nav bar (mobile only)
 * Adapated from https://flowbite-react.com/docs/components/drawer
 */
const NavPopover = observer(() => {
  const userStore = useUserStore();
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
        className={`p-6 bg-white w-3/4 ${
          isOpen && "drop-shadow-nav"
        }`}
      >
        <Drawer.Header
          style={{ fontSize: "30px" }}
          className="pl-3 pb-8 -mt-1.5"
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
            className="flex items-center rounded-lg p-1.5 transition hover:text-accent bg-secondary/5 hover:bg-secondary/10 border border-secondary/30 mb-4 font-semibold"
            href="/profile"
            onClick={() => close()}
          >
            {userStore.loggedIn ? (
              <MaterialSymbol
                icon="account_circle"
                fill
                size={24}
                weight={300}
                color="inherit"
                className="mr-1"
              />
            ) : (
              <MaterialSymbol
                icon="login"
                fill
                size={24}
                weight={300}
                color="inherit"
                className="mr-1"
              />
            )}

            <h3> {userStore.loggedIn ? "Profile" : "Sign in"}</h3>
          </Link>
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
  );
});

export default NavPopover;

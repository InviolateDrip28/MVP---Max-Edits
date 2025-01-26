"use client";
import { observer } from "mobx-react";
import { MaterialSymbol } from "react-material-symbols";
import { useUserStore } from "@/stores/provider";
import { TransactionsTable } from "./TransactionsTable";

const UserDashboard = observer(() => {
  const userStore = useUserStore();

  function handleLogOut() {
    userStore.setLoggedIn(false);
  }

  return (
    <div id="userDashboard">
      <div className="space-y-4">
        <div className="w-full md:flex md:flex-row items-center md:justify-between md:pr-4 space-y-2 md:space-y-0">
        <h1>Welcome back, {userStore.firstName}</h1>
        <button
            onClick={handleLogOut}
            className="inline-flex hover:text-accent"
          >
            <MaterialSymbol
              icon="logout"
              fill
              size={24}
              weight={400}
              color="inherit"
              className="mr-1 translate-y-0.5"
            />
            <span className="underline underline-offset-2">
            Sign out
            </span>

          </button>

        </div>
      </div>

      <div className="mt-8 md:mt-16">
        <div className="mb-4 flex items-center">
          <h3 className="font-semibold ">Transaction history</h3>
          <MaterialSymbol
            icon="history"
            fill
            size={36}
            weight={400}
            color="inherit"
            className="ml-1"
          />
        </div>

        <TransactionsTable />
      </div>
    </div>
  );
});

export default UserDashboard;

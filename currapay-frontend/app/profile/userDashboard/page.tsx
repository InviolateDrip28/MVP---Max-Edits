'use client'
import { observer } from "mobx-react";
import { useStores } from "@/stores/provider";

const UserDashboard = observer(() => {
  const { UserStore } = useStores();

  function handleLogOut() {
    UserStore.setLoggedIn(false);
  }
  return (
    <div>
      <h1>Welcome back, {UserStore.firstName}!</h1>
      <p>Here is your profile page.</p>
      <button
        onClick={handleLogOut}
        className="p-2 bg-accent text-white rounded-lg"
      >
        Log out
      </button>
    </div>
  );
});

export default UserDashboard;

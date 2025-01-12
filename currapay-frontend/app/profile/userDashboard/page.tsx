'use client'
import { observer } from "mobx-react";
import { useUserStore } from "@/stores/provider";

const UserDashboard = observer(() => {
  const userStore = useUserStore();

  function handleLogOut() {
    userStore.setLoggedIn(false);
  }
  return (
    <div>
      <h1>Welcome back, {userStore.firstName}!</h1>
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

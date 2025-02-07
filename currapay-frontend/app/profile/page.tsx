"use client";
import SignIn from "./signin/SignIn";
import UserDashboard from "./dashboard/Dashboard";
import { useUserStore } from "@/stores/provider";
import { observer } from "mobx-react";

const Profile = observer(() => {
  const userStore = useUserStore();

  return (
    <section className="w-full">
      {userStore.loggedIn ? <UserDashboard /> : <SignIn />}
    </section>
  );
});

export default Profile;

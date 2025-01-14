"use client";
import SignIn from "./signin/page";
import UserDashboard from "./userDashboard/page";
import { useUserStore } from "@/stores/provider";
import { observer } from "mobx-react";

const ProfilePage = observer(() => {
  const userStore = useUserStore();

  return (
    <section className="w-full">
      {userStore.loggedIn ? <UserDashboard /> : <SignIn />}
    </section>
  );
});

export default ProfilePage;

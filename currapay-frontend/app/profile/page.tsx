"use client";
import SignIn from "./signin/page";
import UserDashboard from "./userDashboard/page";
import { useStores } from "@/stores/provider";
import { observer } from "mobx-react";

const ProfilePage = observer(() => {
  const { UserStore } = useStores();

  return (
    <section className="h-screen w-full">
      {UserStore.loggedIn ? <UserDashboard /> : <SignIn />}
    </section>
  );
});

export default ProfilePage;

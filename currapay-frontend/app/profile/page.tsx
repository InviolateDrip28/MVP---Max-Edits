"use client";
import SignIn from "./signin/SignIn";
import UserDashboard from "./dashboard/Dashboard";
import { useUserStore } from "@/stores/provider";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

const Profile = observer(() => {
  const userStore = useUserStore();
  // const [loggedIn, setLoggedIn] = useState<boolean>();

  // useEffect(() => {
  //   const loggedIn = userStore.loggedIn;
  //   setLoggedIn(loggedIn)
  // }, [])


  // if (loggedIn === null) {
  //   return <div>Loading...</div>; // or some other placeholder
  // }

  return (
    <section className="w-full">

      {userStore.loggedIn ? <UserDashboard /> : <SignIn />}
    </section>
  );
});

export default Profile;

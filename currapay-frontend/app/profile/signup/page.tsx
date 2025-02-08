"use client";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/provider";
import { observer } from "mobx-react";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { userData } from "../types";

const SignupPage = observer(() => {
  const userStore = useUserStore();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(true);
  const [loading, setLoading] = useState(false);

  const mutation = trpc.user.createUser.useMutation<userData>();

  const handleSignup = async () => {
    setLoading(true);
    await mutation.mutateAsync({
      emailAddress: email,
      password: password,
      country: "",
      city: "",
      age: 100,
      gender: "",
      occupation: "",
      nationality: "",
      deviceUsed: "",
      browserUsed: "",
    }).then((data) => {
      const userData = data as userData;
      userStore.setId(userData.id);
      userStore.setUser(firstName, lastName, email);
      userStore.setLoggedIn(true);
      setLoading(false);
      console.log("User created successfully")
      router.push("/profile");
    }).catch((error) => {
      setShowError(true);
      setLoading(false);
      console.error(error);
    })
  };

  return (
    <section className="min-h-screen w-full">
      <div className="mb-12 flex items-center justify-center">
        <form className="w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-center">Sign Up</h1>
          <div className="relative flex flex-row items-center mt-16 space-x-4">
            <input
              type="first-name"
              className="block w-full pl-3 pr-10 py-3 text-secondary border border-secondary  rounded-lg  focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="family-name"
              className="block w-full pl-3 pr-10 py-3 text-secondary border border-secondary rounded-lg px-11 focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="relative flex items-center mt-4">
            <input
              type="email"
              className="block w-full pl-3 pr-10 py-3 text-secondary border border-secondary  rounded-lg px-11 focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-40"
              autoComplete="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative flex items-center mt-4">
            <input
              type="password"
              className="block w-full pl-3 pr-10 py-3 text-secondary border border-secondary  rounded-lg  focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button
              type="button"
              disabled={loading}
              className="w-full px-6 py-3 font-semibold text-white transition-colors duration-300 transform bg-accent rounded-lg hover:bg-accent/75 focus:outline-none"
              onClick={handleSignup}
            >
              <h4>Sign up</h4>
            </button>

            <p className="mt-4 text-center ">or</p>

            <button
              type="button"
              className="flex items-center justify-center w-full px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg  hover:bg-secondary/5 bg-white"
              disabled={loading}
            >
              <svg className="w-8 h-8 mx-1" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
              <p className="mx-2">Sign up with Google</p>
            </button>

            <div className="mt-12 text-center">
              <div className="items-center">
                <input
                  id="terms-and-conditions"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-0"
                />
                <label htmlFor="default-checkbox" className="ms-2">
                  I agree to the terms and conditions.
                </label>
              </div>

              <div className="inline-flex items-center">
                <input
                  id="email-updates"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-0"
                />
                <label htmlFor="default-checkbox" className="ms-2">
                  I want to recieve really awesome email updates.
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
});

export default trpc.withTRPC(SignupPage);

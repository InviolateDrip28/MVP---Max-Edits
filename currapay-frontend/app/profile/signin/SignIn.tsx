"use client";
import { useUserStore } from "@/stores/provider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { trpc } from "@/utils/trpc";

const SignIn = () => {
  const userStore = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

  const { status, data, error, refetch } =
    trpc.user.getUserByEmail.useQuery(email, { enabled: false });

  function handleSignIn() {
    const result = refetch();
    // TODO: Implement sign in logic
    if (true) {
      userStore.setLoggedIn(true);
    } else {
      setShowWarning(true);
      return;
    }
  }

  useEffect(() => {
    setIsValidForm(email.length > 0 && password.length > 0);
  }, [email, password]);

  return (
    <div className="mb-12 flex items-center justify-center">
      <form className="w-full md:w-3/4 lg:w-1/2">
        <h1 className="text-center">Sign in</h1>
        <div className="relative flex items-center mt-16">
          {showWarning && (
            <p className="absolute w-full text-center text-red-500 -top-12 font-semibold">
              Invalid email or password, please try again.
            </p>
          )}
          <input
            type="email"
            className={`block w-full pl-3 pr-10 py-3 text-secondary border rounded-lg px-11 focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-40 ${
              showWarning ? "border-red-500" : "border-secondary"
            }`}
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative flex items-center mt-4">
          <input
            type="password"
            className={`block w-full pl-3 pr-10 py-3 text-secondary border rounded-lg  focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-40 ${
              showWarning ? "border-red-500" : "border-secondary"
            }`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <button
            type="button"
            disabled={!isValidForm}
            className={`w-full px-20 py-3 font-semibold text-white transition-colors duration-300 transform rounded-lg focus:outline-none ${
              isValidForm
                ? "bg-accent hover:bg-accent/80"
                : "bg-accent/50 cursor-not-allowed"
            }`}
            onClick={handleSignIn}
          >
            <h4>Sign in</h4>
          </button>

          <p className="mt-4 text-center ">or</p>

          <Link
            href="#"
            className="flex items-center justify-center px-20 py-3 mt-4 transition-colors duration-300 border rounded-lg  hover:bg-secondary/5 bg-white whitespace-nowrap"
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
            <p className="mx-2">Sign in with Google</p>
          </Link>

          <div className="mt-12 text-center">
            <Link href="/profile/signup" className="link">
              <p>Don&apos;t have an account yet? Sign up</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default trpc.withTRPC(SignIn);

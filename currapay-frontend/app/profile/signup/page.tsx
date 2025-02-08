"use client";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/provider";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { userData } from "../types";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarState, Alert } from "./Alert";
import PasswordChecklist from "react-password-checklist";
import {
  XMarkIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";

const SignupPage = observer(() => {
  const userStore = useUserStore();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorText, setErrorText] = useState("");
  const [showSnackbar, setShowSnackbar] = useState<SnackbarState>({
    vertical: "top",
    horizontal: "center",
    open: false,
  });
  const { vertical, horizontal, open } = showSnackbar;

  const handleClose = () => {
    setShowSnackbar({ ...showSnackbar, open: false });
  };

  const mutation = trpc.user.createUser.useMutation<userData>();

  const handleSignup = async () => {
    setLoading(true);
    await mutation
      .mutateAsync({
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
      })
      .then((data) => {
        const userData = data as userData;
        userStore.setId(userData.id);
        userStore.setUser(firstName, lastName, email);
        userStore.setLoggedIn(true);
        setLoading(false);
        router.push("/profile");
      })
      .catch((error) => {
        setLoading(false);
        setErrorText(error.message);
        setShowSnackbar({ ...showSnackbar, open: true });
        console.error(error.message);
      });
  };

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  useEffect(() => {
    setIsValidForm(
      firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        checked
    );
  }, [firstName, lastName, email, checked]);

  return (
    <section className="min-h-screen w-full">
      <div className="mb-12 flex items-center justify-center">
        <form className="w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-center">Sign Up</h1>

          <p className="text-center mt-12 underline underline-offset-2">*All fields required</p>
          <div className="relative flex flex-row items-center mt-8 space-x-4">
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
              type={showPassword ? "text" : "password"}
              className="block w-full pl-3 pr-10 py-3 text-secondary border border-secondary  rounded-lg  focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <EyeSlashIcon
                className="h-6 w-6 text-secondary/75 absolute right-3 cursor-pointer"
                onClick={handleClickShowPassword}
              />
            ) : (
              <EyeIcon
                className="h-6 w-6 text-secondary/75 absolute right-3 cursor-pointer"
                onClick={handleClickShowPassword}
              />
            )}
          </div>

          <div className="relative flex items-center mt-4">
            <input
              type={showPassword ? "text" : "password"}
              className="block w-full pl-3 pr-10 py-3 text-secondary border border-secondary  rounded-lg  focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm password"
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />
          </div>

          <div className="pt-4">
            <PasswordChecklist
              rules={[
                "minLength",
                "lowercase",
                "capital",
                "number",
                "specialChar",
                "match",
              ]}
              messages={{
                specialChar: "Password has a special character.",
              }}
              minLength={12}
              value={password}
              valueAgain={confirmPassword}
              onChange={(isValid) => setIsValidPassword(isValid)}
              iconComponents={{
                ValidIcon: (
                  <CheckIcon className="h-5 w-5 text-green-500 pt-0.5 pr-0.5" />
                ),
                InvalidIcon: (
                  <XMarkIcon className="h-5 w-5 opacity-70 pt-0.5 pr-0.5" />
                ),
              }}
            />
          </div>

          <div className="mt-12 text-center">
            <div className="items-center">
              <input
                id="terms-and-conditions"
                type="checkbox"
                className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-0 cursor-pointer"
                onChange={(e) => setChecked(e.target.checked)}
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
                className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-0 cursor-pointer"
              />
              <label htmlFor="default-checkbox" className="ms-2">
                I want to recieve really awesome email updates.
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              disabled={loading || !isValidPassword || !isValidForm}
              className={`w-full px-6 py-3 font-semibold text-white transition-colors duration-300 transform rounded-lg focus:outline-none ${
                isValidForm && isValidPassword
                  ? "bg-accent hover:bg-accent/80"
                  : "bg-accent/50 cursor-not-allowed"
              }`}
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
          </div>
        </form>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert
            severity="error"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            {errorText}
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
});

export default trpc.withTRPC(SignupPage);

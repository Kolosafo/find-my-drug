"use client";
import { auth, userCollectionRef } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SignupPNG from "../../../../public/loginIcon.png";
import { authValidator } from "@/utils/helpers";
import { addDoc } from "firebase/firestore";

export type SignUpFornType = {
  userType: "pharmacy" | "individual";
  name: string;
  location: string;
  phoneNumber: string | number;
  email: string;
  password: string;
  confirmPassword: string;
};
const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signUpData, setSignUpData] = useState<SignUpFornType>({
    userType: "pharmacy",
    name: "",
    location: "",
    phoneNumber: "" as string | number,
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const handleErrorMsg = (msg: string) => {
    setErrorMsg(msg);
  };

  const handleSubmit = async () => {
    if (!authValidator(signUpData, handleErrorMsg)) {
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    await createUserWithEmailAndPassword(
      auth,
      signUpData.email,
      signUpData.password,
    )
      .then(async (res) => {
        setIsLoading(true);
        await addDoc(userCollectionRef, {
          userType: signUpData.userType,
          name: signUpData.name,
          location: signUpData.location,
          phoneNumber: signUpData.phoneNumber,
          email: signUpData.email,
        }).then(() => {
          router.push("/auth/login");
        });
      })
      .catch((e) => {
        if (e.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("User with this email already exists");
          return;
        }
        setErrorMsg(
          "Somthing went wrong creating your account, please try again",
        );
      });
    setIsLoading(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[70%] items-center justify-center">
        <div className="flex flex-col max-lg:hidden">
          <h1 className="mb-6 text-center text-4xl font-semibold text-blue-400">
            Signup
          </h1>
          <Image src={SignupPNG} alt="Login Png" width={900} />
        </div>
        <div className="mx-auto my-4 w-full max-w-lg rounded bg-blue-100 px-8 pb-8 pt-6 shadow-md">
          <span className="text-xs text-red-500">{errorMsg}</span>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Are you an individual or a Pharmacy?
            </label>
            <select
              name="accountType"
              id="accountType"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  userType: e.target.value as "pharmacy" | "individual",
                })
              }
            >
              <option value="pharmacy">Pharmacy</option>
              <option value="individual">Individual</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="text"
              placeholder={
                signUpData.userType === "pharmacy"
                  ? "Name of Pharmacy"
                  : "John Michael"
              }
              value={signUpData.name}
              onChange={(e) =>
                setSignUpData({ ...signUpData, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="text"
              placeholder="johnmichael@gmail.com"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Contact Number
            </label>
            <span className="text-xs text-red-600">{phoneError}</span>
            <input
              className="focus:shadow-outline no-spinners w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="number"
              maxLength={11}
              placeholder="0801234567"
              value={signUpData.phoneNumber.toString()}
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  phoneNumber: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Location
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="location"
              type="text"
              placeholder="Abuja"
              value={signUpData.location}
              onChange={(e) =>
                setSignUpData({ ...signUpData, location: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="******"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="confirmPassword"
              type="password"
              placeholder="******"
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="mb-2 text-sm text-red-500">{errorMsg}</span>
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={`rounded bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-700 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Create Account"}
            </button>
            <a href="/auth/login" className="mt-3 inline-block align-baseline">
              Already have an account?{" "}
              <span className="cursor-pointer text-sm font-bold text-blue-500 underline hover:text-blue-800">
                Log in
              </span>
            </a>
          </div>
          <div className="mt-6 text-center">
            <div className="w-full border-t border-gray-400 pb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

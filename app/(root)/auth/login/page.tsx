"use client";
import { auth, userCollectionRef } from "@/firebase";
import { login } from "@/redux/auth/authSlice";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginPNG from "../../../../public/loginIcon.png";
import Image from "next/image";
import { getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { UserType } from "@/types";
import { IRootState } from "@/redux/store";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckFields = () => {
    setErrorMsg("");
    if (loginData.email && loginData.password) {
      return true;
    }
    setErrorMsg("Both fields are required");
    return false;
  };

  const handleSubmit = async () => {
    if (!handleCheckFields()) {
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(async (res) => {
        const usersList = await getDocs(userCollectionRef).catch(() => {
          setIsLoading(false);
          toast("Something went wrong", {
            type: "error",
          });
        });
        const allUsers = usersList?.docs.map((user) => ({
          ...user.data(),
          id: user.id,
        })) as UserType[];
        const findUser = allUsers.find(
          (search) => search.email === res.user.email,
        ) as UserType;
        dispatch(
          login({
            id: findUser.id,
            userType: findUser.userType,
            name: findUser.name,
            location: findUser.location,
            phoneNumber:
              typeof findUser.phoneNumber === "string"
                ? parseInt(findUser.phoneNumber)
                : findUser.phoneNumber,
            email: findUser.email,
          }),
        );
        router.push("/search");
      })
      .catch(() => {
        setErrorMsg("Invalid credentials");
      });
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[70%] items-center justify-center">
        <div className="flex flex-col max-lg:hidden">
          <h1 className="mb-6 text-center text-4xl font-semibold text-blue-400">
            Login
          </h1>
          <Image src={loginPNG} alt="Login Png" width={700} />
        </div>
        <div className="mx-auto mb-4 w-full max-w-lg rounded bg-blue-100 px-8 pb-8 pt-6 shadow-md">
          <span>{errorMsg}</span>
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
              placeholder="johndoe@mail.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
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
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            {" "}
            {/* change to between when forgot password func is available */}
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={`mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
            <Link
              href="/auth/reset-password"
              className="inline-block align-baseline text-sm font-bold text-emerald-500 hover:text-emerald-800"
            >
              Forgot Password?
            </Link>
          </div>
          <p className="mt-4 flex items-center justify-center max-lg:flex max-lg:flex-col">
            Click here to{" "}
            <Link
              href="/auth/signup"
              className="ml-2 cursor-pointer text-blue-800 underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

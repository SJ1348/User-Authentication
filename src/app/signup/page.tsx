"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { isPasswordValid } from "@/helpers/isValidPassword";
import Image from "next/image";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [button, setButton] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      isPasswordValid(user.password)
    ) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [user]);

  const [passwordOK, setPasswordOK] = useState(true);
  useEffect(() => {
    if (isPasswordValid(user.password) || user.password == "") {
      setPasswordOK(true);
    } else {
      setPasswordOK(false);
    }
  }, [user.password]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Successful" + response.data);
      router.push("/login");
    } catch (error: any) {
      const status = error.response.status;
      if (status == 400) {
        setUserExists(true);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">SIGNUP</h1>
      <form className="bg-white shadow-md rounded px-4 py-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(event) => {
              setUser({ ...user, email: event.target.value });
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(event) => {
              setUser({ ...user, username: event.target.value });
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
              value={user.password}
              onChange={(event) => {
                setUser({ ...user, password: event.target.value });
              }}
            />
            <div
              className="cursor-pointer p-1 ml-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <Image
                  src="/eye.svg"
                  alt=""
                  className="dark:invert"
                  width={30}
                  height={24}
                  priority
                />
              ) : (
                <Image
                  src="/eye-closed-light.svg"
                  alt=""
                  className="dark:invert"
                  width={30}
                  height={24}
                  priority
                />
              )}
            </div>
          </div>

          <div className={passwordOK ? "hidden" : "text-sm text-red-400"}>
            Password does not meet below constraints!
          </div>
          <div className={!userExists ? "hidden" : "text-sm text-red-400"}>
            Email already exists! Please go to login.
          </div>
          <div className="text-gray text-default mt-2 flex items-center text-sm">
            <ul className="ml-4 list-disc">
              <li className="">Mix of uppercase &amp; lowercase letters</li>
              <li className="">Minimum 8 characters long</li>
              <li className="">Contain at least 1 number</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <div className="mt-3 ml-3">
              <div className=" w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
            </div>
          ) : (
            <button
              className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                button ? "bg-blue-500 hover:bg-blue-700" : "bg-blue-300"
              }`}
              type="button"
              onClick={button ? onSignup : () => {}}
            >
              Signup
            </button>
          )}

          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-700 font-semibold text-sm"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

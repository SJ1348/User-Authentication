"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [user]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loading, setLoading] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful" + response.data);
      router.push("/profile");
    } catch (error: any) {
      const status = error.response.status;
      if (status == 400) {
        setInvalidUser(true);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">LOGIN</h1>
      <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
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
        <div className="mb-2">
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
        </div>
        <div className={!invalidUser ? "hidden" : "text-sm text-red-400 mb-3"}>
          Invalid login credentials! Please try again.
        </div>
        <div className="mb-3 text-sm">Forgot password?</div>
        <div className="flex items-center justify-between mt-2">
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
              onClick={button ? onLogin : () => {}}
            >
              Login
            </button>
          )}
          <Link className="text-sm" href="/signup">
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

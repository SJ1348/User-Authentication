"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const router = useRouter();
  const onLogout = async () => {
    await axios.get("/api/users/logout");
    router.push("/login");
  };

  const [data, setData] = useState({
    username: "",
    _id: null,
  });

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Profile</h1>
      <p>Hi,{data.username} </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={onLogout}
      >
        Logout
      </button>
      <Link href={`/profile/${data._id}`}>UserDetails</Link>
    </div>
  );
}

export default ProfilePage;

"use client";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  function logoutUser() {
    signOut(auth);
    sessionStorage.removeItem("user");
  }

  if (!user && !userSession) {
    return router.push("/login");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default DashboardPage;

"use client";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebaseConfig";
import "../../styles/form.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      sessionStorage.setItem("user", "true");
      setPassword("");
      setEmail("");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="form-section-box">
      <form onSubmit={onSubmit} className="form-section">
        <p className="form-text">Sign In</p>
        <p className="form-desc">to check your goals</p>
        <div className="form-inputs">
          <div className="email-box label-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email:</label>
          </div>
          <div className="password-box label-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password:</label>
          </div>
          <div className="submit-box">
            <button type="submit">SIGN IN</button>
          </div>
          <div className="not-account">
            <p>
              Dont have an account? <a href="/register">Sign up</a>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;

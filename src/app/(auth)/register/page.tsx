"use client";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/services/firebaseConfig";
import "../../styles/form.css";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="form-section-box">
      <form onSubmit={onSubmit} className="form-section">
        <p className="form-text">Sign up</p>
        <p className="form-desc">to start tracking your goals</p>
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
            <button type="submit">CREATE ACCOUNT</button>
          </div>
          <div className="not-account">
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;

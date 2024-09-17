"use client";
import { signIn } from "@/utils/authService";
import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");

  const handleSignUp = () => {
    if (!name) {
      return;
    }
    const { userId, name: savedName } = signIn(name);
    setName(savedName);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSignUp}>sign up</button>
      </div>
    </div>
  );
};

export default SignUp;

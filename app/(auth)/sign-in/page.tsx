import React, { useState } from "react";
import { getSessionName, signIn } from "@/utils/authService";

interface SignInProps {
  onSignIn: (userId: string, name: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [name, setName] = useState("");

  const handleSignIn = () => {
    if (!name) return;

    const { userId, name: savedName } = signIn(name);
    onSignIn(userId, savedName);
  };

  const sessionName = Object.values(getSessionName())[0];

  return (
    <div className="font-mono">
      <h1 className="text-xl">Sign In for {sessionName}</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-orange-500" onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
};

export default SignIn;

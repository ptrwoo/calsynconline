import React, { useState } from "react";
import { signIn } from "@/utils/authService";

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

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;

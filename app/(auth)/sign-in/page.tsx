import React, { useState } from "react";
import { getSessionName, signIn } from "@/utils/authService";
import SignUp from "../sign-up/page";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/sign-up");
  };

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

      <p>dont have an account?</p>
      <button onClick={handleNavigate}>Sign Up</button>
    </div>
  );
};

export default SignIn;

// const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
//   const [name, setName] = useState("");

//   const handleSignIn = () => {
//     if (!name) return;

//     const { userId, name: savedName } = signIn(name);
//     onSignIn(userId, savedName);
//   };

//   const sessionName = Object.values(getSessionName())[0];

//   return (
//     <div className="font-mono">
//       <h1 className="text-xl">Sign In for {sessionName}</h1>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button className="bg-orange-500" onClick={handleSignIn}>
//         Sign In
//       </button>
//     </div>
//   );
// };

// export default SignIn;

/* 

Sign in must accomodate:
1) api call to database of storing name/uuid and password (perhaps email instead of uuid)
2) allow a new user to create an account, or for an existing one to log in




*/

"use client";
import React, { useState } from "react";
import { sessionIn } from "@/utils/authService";
import { saveSessionDates } from "@/utils/datehelper";

interface SignUpProps {
  onSignUp: (
    sessionId: string | null,
    sessionName: string,
    startDate: string,
    endDate: string
  ) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  const [sessionName, setSessionName] = useState("");
  const [startDate, setStartDate] = useState<string>(formattedToday);
  const [endDate, setEndDate] = useState<string>(formattedToday);

  const handleSignIn = () => {
    if (!sessionName) return;

    const { sessionId, sessionName: savedName } = sessionIn(sessionName);
    saveSessionDates(startDate, endDate);
    onSignUp(sessionId, savedName, startDate, endDate);
  };
  return (
    <div>
      <h1 className="text-4xl font-extrabold border-l-orange-200 bg-orange-900 text-white flex justify-center">
        New Session?
      </h1>
      <input
        className="flex-auto justify-center size-max"
        type="text"
        placeholder="Enter name of Session"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
      />
      <br />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <br /> <br />
      <button
        onClick={handleSignIn}
        className="px-4 py-2 m-1 bg-orange-400 text-white rounded"
      >
        Create Session
      </button>
      <br />
      <br />
    </div>
  );
};

export default SignUp;

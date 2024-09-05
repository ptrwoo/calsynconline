"use client";
import Card from "@/components/card/page";
import React, { useEffect, useState } from "react";
import SignIn from "@/app/(auth)/sign-in/page";
import Results from "@/components/results/page";
import {
  signOut,
  getCurrentUser,
  getSessionId,
  sessionOut,
  getSessionName,
} from "@/utils/authService";
import { aggregateResponses } from "@/utils/aggregateResponses";
import { getSessionDates } from "@/utils/datehelper";
import SignUp from "@/app/(auth)/sign-up/page";
import SessionPicker from "@/app/(auth)/sessionPick/page";

const Home = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState<string | null>(null);

  const [availabilityData, setAvailabilityData] = useState<{
    [date: string]: { count: number; names: string[] };
  }>({});
  const [filteredDates, setFilteredDates] = useState<string[]>([]);

  const [pressed, setPressed] = useState<boolean>(false);

  useEffect(() => {
    const { userId, name } = getCurrentUser();
    const { sessionId } = getSessionId();
    const { sessionName } = getSessionName();
    if (userId) setUserId(userId);
    if (name) setName(name);
    if (sessionId) setSessionId(sessionId);
    if (sessionName) setSessionName(sessionName);

    // if (sessionId) {
    //   const dates = getSessionDates();
    //   console.log(dates + "these are dates");
    //   setFilteredDates(dates);
    // }
  }, []);

  useEffect(() => {
    if (sessionId) {
      const dates = getSessionDates();
      setFilteredDates(dates);
    }
  }, [sessionId]);

  // useEffect(() => {
  //   if (sessionId) {
  //     const aggregateData = aggregateResponses(sessionId);
  //     setAvailabilityData(aggregateData);
  //   }
  // }, [sessionId]);

  const handleSignIn = (userId: string, name: string) => {
    setUserId(userId);
    setName(name);
  };

  const handleSessionIn = (sessionId: string | null, sessionName: string) => {
    setSessionId(sessionId);
    setSessionName(sessionName);
  };

  const handleSignout = () => {
    signOut();
    setUserId(null);
    setName(null);
  };

  const handleSessionOut = () => {
    sessionOut();
    setSessionId(null);
    setSessionName(null);
    handleSignout();
  };

  const handleResponseChange = () => {
    if (sessionId) {
      const aggregateData = aggregateResponses(sessionId);
      setAvailabilityData(aggregateData);
    }
  };

  const cardCollection = filteredDates.map((x) => {
    return (
      <Card key={x} cardDate={x} onResponseChange={handleResponseChange} />
    );
  });

  const handleResultButton = () => {
    setPressed(!pressed);
  };

  // const handleSessionChoose = () => {
  //   <SessionPicker onSelectSession={sessionId} />;
  // };

  return (
    <>
      {!sessionId ? (
        <SignUp onSignUp={handleSessionIn} />
      ) : userId && sessionId ? (
        <div className="font-mono">
          <h1 className="font-extrabold text-3xl font-mono">
            {" "}
            {name}, free for "{sessionName}"?
          </h1>
          {cardCollection}

          <br />
          <button
            onClick={handleSignout}
            className="border-solid text-xl border-4 bg-slate-800 font-semibold text-white rounded-2xl gap-3"
          >
            Sign Out
          </button>
          <button
            onClick={handleSessionOut}
            className="border-solid text-xl border-4 bg-slate-500 font-semibold text-white rounded-2xl gap-3"
          >
            Exit Session
          </button>
          <br />
          {/* <button
            onClick={handleSessionChoose}
            className="border-solid text-md border-4 bg-orange-200 font-bold text-white rounded-2xl gap-3"
          >
            Choose Session
          </button> */}
          <br />
          <br />

          <div>
            <button
              onClick={handleResultButton}
              className="border-solid text-md border-4 bg-yellow-200 font-semibold text-black rounded-2xl gap-3"
            >
              refresh results
            </button>
            <Results sessionId={sessionId} trigger={pressed} />
          </div>
        </div>
      ) : (
        <SignIn onSignIn={handleSignIn} />
      )}
    </>
  );
};

export default Home;

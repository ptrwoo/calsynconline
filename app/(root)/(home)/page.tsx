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

const Home = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState<string | null>(null);

  const [availabilityData, setAvailabilityData] = useState<{
    [date: string]: { count: number; names: string[] };
  }>({});
  const [filteredDates, setFilteredDates] = useState<string[]>([]);

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

  return (
    <>
      {!sessionId ? (
        <SignUp onSignUp={handleSessionIn} />
      ) : userId && sessionId ? (
        <div>
          <h1 className="font-extrabold text-3xl"> r u free? </h1>
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

          <div>
            <Results sessionId={sessionId} />
          </div>
        </div>
      ) : (
        <SignIn onSignIn={handleSignIn} />
      )}
    </>
  );
};

export default Home;

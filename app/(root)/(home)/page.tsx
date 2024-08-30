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

  const sessionDates = getSessionDates();
  const startDate = sessionDates[0];
  const endDate = sessionDates[1];

  useEffect(() => {
    const { userId, name } = getCurrentUser();
    const { sessionId, sessionName } = getSessionId();
    if (userId && name) {
      setUserId(userId);
      setName(name);
    }
    if (sessionId && sessionName) {
      setSessionId(sessionId);
      setSessionName(sessionName);
    }
  }, []);

  useEffect(() => {
    const dates = getSessionDates();
    setFilteredDates(dates);
  }, [startDate, endDate]);

  const handleSignIn = (userId: string, name: string) => {
    setUserId(userId);
    setName(name);
  };

  const handleSessionIn = (sessionId: string, sessionName: string) => {
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
    const aggregateData = aggregateResponses();
    setAvailabilityData(aggregateData);
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
          <h1> r u free? </h1>
          {cardCollection}

          <br />
          <button onClick={handleSignout}>Sign Out</button>
          <button onClick={handleSessionOut}>Exit Session</button>

          <div>
            <Results availabilityData={availabilityData} />
          </div>
        </div>
      ) : (
        <SignIn onSignIn={handleSignIn} />
      )}
    </>
  );
};

export default Home;

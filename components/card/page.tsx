"use client";
import { getResponses, saveResponses } from "@/utils/api";
import { getCurrentUser, getSessionId } from "@/utils/authService";
import React, { useEffect, useState } from "react";

interface CardProps {
  cardDate: string;
  onResponseChange: () => void;
}

const Card: React.FC<CardProps> = ({ cardDate, onResponseChange }) => {
  const [responses, setResponses] = useState<{ [key: string]: string[] }>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  // const userId = localStorage.getItem("userId");
  // const sessionId = localStorage.getItem("sessionId");

  const handleClick = (timeSlot: string, status: string) => {
    const existingSlots = responses[timeSlot] || [];

    const updatedSlots = existingSlots.includes(status)
      ? existingSlots.filter((slot) => slot !== status)
      : [...existingSlots, status];

    const updatedResponses = { ...responses, [timeSlot]: updatedSlots };
    setResponses(updatedResponses);
    saveResponses(updatedResponses);

    onResponseChange();
  };

  useEffect(() => {
    const userId = getCurrentUser().userId;
    const sessionId = getSessionId().sessionId;

    setUserId(userId);
    setSessionId(sessionId);
  }, []);

  useEffect(() => {
    if (userId && sessionId) {
      const savedResponses = getResponses();
      if (savedResponses) {
        setResponses(savedResponses);
      }
    }
  }, [userId, sessionId]);

  const renderButton = (timeSlot: string) => (
    <>
      <button
        className={`${
          responses[timeSlot]?.includes("morning")
            ? "bg-green-500"
            : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "morning")}
      >
        Morning
      </button>
      <button
        className={`${
          responses[timeSlot]?.includes("afternoon")
            ? "bg-green-500"
            : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "afternoon")}
      >
        Afternoon
      </button>
      <button
        className={`${
          responses[timeSlot]?.includes("evening")
            ? "bg-green-500"
            : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "evening")}
      >
        Evening
      </button>
    </>
  );

  return (
    <div className="font-mono">
      <h2 className="text-xl font-extrabold text-white bg-slate-600 border-solid">
        {" "}
        {cardDate}{" "}
      </h2>
      {renderButton(cardDate)}
    </div>
  );
};

export default Card;

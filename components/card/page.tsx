"use client";
import { getResponses, saveResponses } from "@/utils/api";
import React, { useEffect, useState } from "react";

interface CardProps {
  cardDate: string;
  onResponseChange: () => void;
}

const Card: React.FC<CardProps> = ({ cardDate, onResponseChange }) => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const userId = localStorage.getItem("userId");
  const sessionId = localStorage.getItem("sessionId");

  const handleClick = (timeSlot: string, status: string) => {
    const updatedResponses = { ...responses, [timeSlot]: status };
    setResponses(updatedResponses);
    saveResponses(updatedResponses);

    onResponseChange();
  };

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
          responses[timeSlot] === "morning" ? "bg-green-500" : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "available")}
      >
        Morning
      </button>
      <button
        className={`${
          responses[timeSlot] === "afternoon" ? "bg-green-500" : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "available")}
      >
        Afternoon
      </button>
      <button
        className={`${
          responses[timeSlot] === "evening" ? "bg-green-500" : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "available")}
      >
        Evening
      </button>

      {/* <button
        className={`${
          responses[timeSlot] === "available" ? "bg-green-500" : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "available")}
      >
        Available
      </button> */}
      {/* <button
        className={`${
          responses[timeSlot] === "unavailable" ? "bg-red-500" : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "unavailable")}
      >
        rather not
      </button> */}
    </>
  );

  return (
    <div className="font-mono">
      <h2 className="text-xl font-extrabold text-white bg-slate-600 border-solid">
        {" "}
        {cardDate}{" "}
      </h2>
      {/* <p className="text-xl font-extrabold text-gray-400">Morning</p> */}
      {renderButton(cardDate)}

      {/* <p className="text-xl font-extrabold text-gray-400">Morning</p>
      {renderButton(cardDate + " morning")}

      <p className="text-xl font-extrabold  text-gray-400">Afternoon</p>
      {renderButton(cardDate + " Afternoon")}

      <p className="text-xl font-extrabold  text-gray-400">Evening</p>
      {renderButton(cardDate + " evening")} */}
    </div>
  );
};

export default Card;

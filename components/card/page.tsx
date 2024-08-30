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

  const handleClick = (timeSlot: string, status: string) => {
    const updatedResponses = { ...responses, [timeSlot]: status };
    setResponses(updatedResponses);
    saveResponses(updatedResponses);

    onResponseChange();
  };

  useEffect(() => {
    if (userId) {
      const savedResponses = getResponses(userId);
      if (savedResponses) {
        setResponses(savedResponses);
      }
    }
  }, [userId]);

  const renderButton = (timeSlot: string) => (
    <>
      <button
        className={`${
          responses[timeSlot] === "available" ? "bg-green-500" : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "available")}
      >
        Available
      </button>
      <button
        className={`${
          responses[timeSlot] === "unavailable" ? "bg-red-500" : "bg-gray-300"
        } px-4 py-2 m-1 text-white rounded`}
        onClick={() => handleClick(timeSlot, "unavailable")}
      >
        Unavailable
      </button>
    </>
  );

  return (
    <div>
      <h2 className="font-extrabold text-white bg-slate-600"> {cardDate} </h2>

      <p className="font-extrabold text-gray-400">Morning</p>
      {renderButton(cardDate + " morning")}

      <p className="font-extrabold  text-gray-400">Afternoon</p>
      {renderButton(cardDate + " Afternoon")}

      <p className="font-extrabold  text-gray-400">Evening</p>
      {renderButton(cardDate + " evening")}
    </div>
  );
};

export default Card;

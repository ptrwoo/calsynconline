"use client";
import { aggregateResponses } from "@/utils/aggregateResponses";
import { getSessionName } from "@/utils/authService";
import React, { useEffect, useState } from "react";

interface availabilityData {
  count: number;
  names: string[];
}

interface ResultsProps {
  sessionId: string;
  trigger: boolean;
}

const Results: React.FC<ResultsProps> = ({ sessionId, trigger }) => {
  const [availabilityData, setAvailabilityData] = useState<{
    [date: string]: availabilityData;
  }>({});
  const sessionName = Object.values(getSessionName())[0];
  // console.log(sessionName + "this is sessionName");

  useEffect(() => {
    try {
      const aggregateData = aggregateResponses(sessionId);
      setAvailabilityData(aggregateData);
      console.log(availabilityData + "data pre-result");
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  }, [trigger]);

  return (
    <div>
      <h3 className="text-xl font-extrabold bg-slate-50 text-black font-mono">
        Results for "{sessionName}"
      </h3>
      {Object.keys(availabilityData).length > 0 ? (
        <ul className="font-bold">
          {Object.entries(availabilityData).map(([date, { count, names }]) => (
            <li className="font-mono text-gray-600" key={date}>
              {date}: {count} available
              <ul className="font-thin">
                {names.map((name, index) => (
                  <li key={index}>- {name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p> No availability data found </p>
      )}
    </div>
  );
};

export default Results;

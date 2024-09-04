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
  const sessionNameGet = getSessionName();
  const sessionName = Object.values(sessionNameGet)[0];
  console.log(sessionName + "this is sessionName");

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
      <h3 className="text-lg font-semibold">Results for "{sessionName}"</h3>
      {Object.keys(availabilityData).length > 0 ? (
        <ul>
          {Object.entries(availabilityData).map(([date, { count, names }]) => (
            <li key={date}>
              {date}: {count} available
              <ul>
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

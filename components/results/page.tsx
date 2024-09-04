"use client";
import { aggregateResponses } from "@/utils/aggregateResponses";
import React, { useEffect, useState } from "react";

interface availabilityData {
  count: number;
  names: string[];
}

interface ResultsProps {
  sessionId: string;
}

const Results: React.FC<ResultsProps> = ({ sessionId }) => {
  const [availabilityData, setAvailabilityData] = useState<{
    [date: string]: availabilityData;
  }>({});

  useEffect(() => {
    try {
      const aggregateData = aggregateResponses(sessionId);
      setAvailabilityData(aggregateData);
      console.log(availabilityData + "its here");
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold">Availability Results</h3>
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

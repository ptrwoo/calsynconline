// "use client";
// import { aggregateResponses } from "@/utils/aggregateResponses";
// import { getSessionName } from "@/utils/authService";
// import React, { useEffect, useState } from "react";
// import React from "react";

interface ResultsProps {
  availabilityData: {
    [date: string]: {
      count: number;
      timeslots: {
        morning: string[];
        afternoon: string[];
        evening: string[];
      };
    };
  };
}

const Results: React.FC<ResultsProps> = ({ availabilityData }) => {
  return (
    <div>
      <h3>Availability Results</h3>
      {Object.keys(availabilityData).length > 0 ? (
        <ul>
          {Object.entries(availabilityData).map(
            ([date, { count, timeslots }]) => (
              <li key={date}>
                <strong>
                  {date} - {count} available:
                </strong>
                {timeslots.morning.length > 0 && (
                  <div>
                    <strong>Morning:</strong>
                    <ul>
                      {timeslots.morning.map((name, index) => (
                        <li key={index}>- {name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {timeslots.afternoon.length > 0 && (
                  <div>
                    <strong>Afternoon:</strong>
                    <ul>
                      {timeslots.afternoon.map((name, index) => (
                        <li key={index}>- {name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {timeslots.evening.length > 0 && (
                  <div>
                    <strong>Evening:</strong>
                    <ul>
                      {timeslots.evening.map((name, index) => (
                        <li key={index}>- {name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      ) : (
        <p>No availability data found</p>
      )}
    </div>
  );
};

export default Results;

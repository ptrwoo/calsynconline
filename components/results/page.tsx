// "use client";
// import { aggregateResponses } from "@/utils/aggregateResponses";
// import { getSessionName } from "@/utils/authService";
// import React, { useEffect, useState } from "react";
// import React from "react";

import { aggregateResponses } from "@/utils/aggregateResponses";
import { getSessionName } from "@/utils/authService";
import { useEffect, useState } from "react";

interface ResultsProps {
  sessionId: string;
  trigger: boolean;
}

interface AvailabilityData {
  [date: string]: {
    count: number;
    timeslots: {
      morning: [count: number, string[]];
      afternoon: [count: number, string[]];
      evening: [count: number, string[]];
    };
  };
}

const Results: React.FC<ResultsProps> = ({ sessionId, trigger }) => {
  const [sessionName, setSessionName] = useState<string | null>(null);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData>(
    {}
  );

  useEffect(() => {
    const session = getSessionName().sessionName;
    if (session) {
      setSessionName(session);
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      const aggregateData = aggregateResponses(sessionId);
      setAvailabilityData(aggregateData);
    }
  }, [sessionId, trigger]);

  return (
    <div>
      <h3>Availability Results for {sessionName}</h3>
      {Object?.keys(availabilityData).length > 0 ? (
        <ul>
          {Object.entries(availabilityData).map(
            ([date, { count, timeslots }]) => (
              <li key={date}>
                <strong className="text-xl">
                  {date} - {count} users:
                </strong>
                {timeslots?.morning.length > 0 && (
                  <div className="text-gray-500">
                    <strong>Morning({timeslots.morning[0]})</strong>
                    <ul>
                      {timeslots.morning[1].map((name, index) => (
                        <li key={index}>- {name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {timeslots?.afternoon.length > 0 && (
                  <div className="text-gray-500">
                    <strong>Afternoon({timeslots.afternoon[0]}) </strong>
                    <ul>
                      {timeslots.afternoon[1].map((name, index) => (
                        <li key={index}>- {name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {timeslots?.evening.length > 0 && (
                  <div className="text-gray-500">
                    <strong>Evening({timeslots.evening[0]}) </strong>
                    <ul>
                      {timeslots.evening[1].map((name, index) => (
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

"use client";
import React, { useState, useEffect } from "react";
import { sessionRetrieve } from "@/utils/authService";

const SessionPicker: React.FC<{
  onSelectSession: (sessionId: string) => void;
}> = ({ onSelectSession }) => {
  const [availableSessions, setAvailableSessions] = useState<
    { sessionId: string; sessionName: string }[]
  >([]);

  useEffect(() => {
    const sessions = sessionRetrieve(); // Retrieve sessions from localStorage
    setAvailableSessions(sessions);
  }, []);

  const handleSessionSelect = (sessionId: string) => {
    onSelectSession(sessionId); // Call the provided onSelectSession function with the selected sessionId
  };

  return (
    <div>
      <h2>Select a Session</h2>
      <select onChange={(e) => handleSessionSelect(e.target.value)}>
        <option value="">Choose a session...</option>
        {availableSessions.map(({ sessionId, sessionName }) => (
          <option key={sessionId} value={sessionId}>
            {sessionName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SessionPicker;

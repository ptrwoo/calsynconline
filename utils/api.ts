import { getSessionId } from "./authService";

export const saveResponses = (newResponses: { [key: string]: string }) => {
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");
  const sessionId = getSessionId();

  const savedData = localStorage.getItem(`responses_${userId}`);
  const existingData = savedData ? JSON.parse(savedData) : { responses: {} };

  const updatedResponses = { ...existingData.responses, ...newResponses };

  const userData = {
    userId,
    name,
    sessionId,
    responses: updatedResponses,
  };

  localStorage.setItem(`responses_${userId}`, JSON.stringify(userData));
};

export const getResponses = (userId: string): { [key: string]: string } => {
  const savedData = localStorage.getItem("responses");
  return savedData ? JSON.parse(savedData) : {};
};

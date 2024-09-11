import { getSessionId, getSessionName } from "./authService";

export const saveResponses = (newResponses: { [key: string]: string[] }) => {
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");
  const sessionId = localStorage.getItem("sessionId");
  const sessionName = localStorage.getItem("sessionName");

  const savedData = localStorage.getItem(`responses_${sessionId}_${userId}`);
  const existingData = savedData ? JSON.parse(savedData) : { responses: {} };
  const updatedResponses = { ...existingData.responses };

  //creating a checker condition for same userName = update modify response rather than push new one again

  Object.keys(newResponses).forEach((date) => {
    if (newResponses[date].length === 0) {
      delete updatedResponses[date];
    } else {
      updatedResponses[date] = newResponses[date];
    }
  });

  const userData = {
    userId,
    name,
    sessionId,
    sessionName,
    responses: updatedResponses,
  };

  localStorage.setItem(
    `responses_${sessionId}_${userId}`,
    JSON.stringify(userData)
  );
};

// export const getResponses = (userId: string): { [key: string]: string } => {
//   const savedData = localStorage.getItem("responses");
//   return savedData ? JSON.parse(savedData) : {};
// };

export const getResponses = (): { [key: string]: string[] } => {
  const userId = localStorage.getItem("userId");
  const sessionId = localStorage.getItem("sessionId"); // Retrieve sessionId from local storage
  const savedResponses = localStorage.getItem(
    `responses_${sessionId}_${userId}`
  );
  return savedResponses ? JSON.parse(savedResponses).responses : {};
};

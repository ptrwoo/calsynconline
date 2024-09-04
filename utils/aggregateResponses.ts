export const aggregateResponses = (currentSessionId: string) => {
  const allResponses: {
    [date: string]: { count: number; names: string[] };
  } = {};

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(`responses_${currentSessionId}`)) {
      const userData = JSON.parse(localStorage.getItem(key) || "{}");

      const userResponses = userData.responses || {};
      const userName = userData.name || "Unknown User";
      const sessionId = userData.sessionId || "No Session";

      if (sessionId === currentSessionId) {
        Object.keys(userResponses).forEach((date) => {
          if (userResponses[date] === "available") {
            if (!allResponses[date]) {
              allResponses[date] = { count: 0, names: [] };
            }

            allResponses[date].count += 1;
            allResponses[date].names.push(userName);
          }
        });
      }
    }
  });

  return allResponses;
};

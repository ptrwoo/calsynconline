export const aggregateResponses = () => {
  const allResponses: { [date: string]: { count: number; names: string[] } } =
    {};

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("responses_")) {
      const userData = JSON.parse(localStorage.getItem(key) || "{}");

      const userResponses = userData.responses || {};
      const userName = userData.name || "Unknown User";

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
  });

  return allResponses;
};

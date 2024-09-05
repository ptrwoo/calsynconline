import { time } from "console";

export const aggregateResponses = (currentSessionId: string) => {
  const allResponses: {
    [date: string]: {
      count: number;
      timeslots: {
        morning: string[];
        afternoon: string[];
        evening: string[];
      };
    };
  } = {};

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(`responses_${currentSessionId}`)) {
      const userData = JSON.parse(localStorage.getItem(key) || "{}");

      const userResponses = userData.responses || {};
      const userName = userData.name || "Unknown User";
      const sessionId = userData.sessionId || "No Session";

      if (sessionId === currentSessionId) {
        Object.keys(userResponses).forEach((date) => {
          const timeSlots = userResponses[date]; // Array of time slots for this date
          if (!allResponses[date]) {
            allResponses[date] = {
              count: 0,
              timeslots: {
                morning: [],
                afternoon: [],
                evening: [],
              },
            };
          }

          timeSlots.forEach((slot: string) => {
            if (slot === "morning") {
              allResponses[date].timeslots.morning.push(userName);
            } else if (slot === "afternoon") {
              allResponses[date].timeslots.afternoon.push(userName);
            } else if (slot === "evening") {
              allResponses[date].timeslots.evening.push(userName);
            }
          });

          allResponses[date].count += 1;
        });
      }
    }
  });

  return allResponses;
};

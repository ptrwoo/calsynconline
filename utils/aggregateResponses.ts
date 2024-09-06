import { time } from "console";

export const aggregateResponses = (currentSessionId: string) => {
  const allResponses: {
    [date: string]: {
      count: number;
      timeslots: {
        morning: [count: number, string[]];
        afternoon: [count: number, string[]];
        evening: [count: number, string[]];
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
                morning: [0, []],
                afternoon: [0, []],
                evening: [0, []],
              },
            };
          }

          timeSlots.forEach((slot: string) => {
            if (slot === "morning") {
              allResponses[date].timeslots.morning[1].push(userName);
              allResponses[date].timeslots.morning[0] += 1;
            } else if (slot === "afternoon") {
              allResponses[date].timeslots.afternoon[1].push(userName);
              allResponses[date].timeslots.afternoon[0] += 1;
            } else if (slot === "evening") {
              allResponses[date].timeslots.evening[1].push(userName);
              allResponses[date].timeslots.evening[0] += 1;
            }
          });
          allResponses[date].count += 1;
        });
      }
    }
  });

  return allResponses;
};

export const generateDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];

  while (start <= end) {
    const currentDate = new Date(start);
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    dateArray.push(`${year}-${month}-${day}`);
    start.setDate(start.getDate() + 1);
  }

  return dateArray;
};

export const saveSessionDates = (startDate: string, endDate: string) => {
  const sessionDates = generateDateRange(startDate, endDate);
  localStorage.setItem("sessionDates", JSON.stringify(sessionDates));
};

export const getSessionDates = (): string[] => {
  const savedDates = localStorage.getItem("sessionDates");
  return savedDates ? JSON.parse(savedDates) : [];
};

// export const filteredDatesInRange = (startDate: string, endDate: string) => {
//   const selectedDates = generateDateRange(startDate, endDate);
//   const months = dateCollection();

//   const filteredMonths = Object.keys(months).reduce(
//     (acc, monthKey) => {
//       const monthIndex = parseInt(monthKey);
//       const monthObj = months[monthIndex];
//       const monthName = Object.keys(monthObj)[0];
//       const daysArray = monthObj[monthName];

//       const filteredDays = daysArray.filter((day) => {
//         const year = new Date().getFullYear();
//         const dateStr = `${year}-${monthIndex}-${String(day).padStart(2, "0")}`;
//         return selectedDates.includes(dateStr);
//       });

//       if (filteredDays.length > 0) {
//         acc[monthKey] = { [monthName]: filteredDays };
//       }

//       return acc;
//     },
//     {} as { [key: string]: { [month: string]: number[] } }
//   );

//   return filteredMonths;
// };

// export const dateCollection = () => {
//   const days = Array.from({ length: 31 }, (_, i) => i + 1);
//   const leapYears = (() => {
//     const startYear = 2024;
//     const endYear = startYear + 100;

//     const leapYearArray = [];

//     for (let year = startYear; year <= endYear; year++) {
//       if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
//         leapYearArray.push(year);
//       }
//     }

//     return leapYearArray;
//   })();

//   const months: { [key: number]: { [monthName: string]: number[] } } = {
//     1: { jan: days },
//     2: {
//       feb: leapYears.includes(new Date().getFullYear())
//         ? days.slice(0, 29)
//         : days.slice(0, 28),
//     },
//     3: { mar: days },
//     4: { apr: days.slice(0, 30) },
//     5: { may: days },
//     6: { jun: days.slice(0, 30) },
//     7: { jul: days },
//     8: { aug: days },
//     9: { sep: days.slice(0, 30) },
//     10: { oct: days },
//     11: { nov: days.slice(0, 30) },
//     12: { dec: days },
//   };

//   return months;
// };

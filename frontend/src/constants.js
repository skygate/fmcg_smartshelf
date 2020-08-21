export const defaultCategories = [
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

export const legend = {
  full: { labelText: "Full", color: "green" },
  not_full_not_empty: { labelText: "Not Full", color: "orange" },
  empty: { labelText: "Empty", color: "red" },
  other: { labelText: "Not Recognized", color: "violet" },
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const defaultCriticalData = {
  January: 50,
  February: 50,
  March: 50,
  April: 50,
  May: 50,
  June: 50,
  July: 50,
  August: 50,
  September: 50,
  October: 50,
  November: 50,
  December: 50,
};
export const defaultNoCriticalData = {
  January: 225,
  February: 145,
  March: 170,
  April: 145,
  May: 190,
  June: 110,
  July: 145,
  August: 100,
  September: 80,
  October: 70,
  November: 120,
  December: 100,
};
export const scratchCriticalData = {
  January: 20,
  February: 20,
  March: 20,
  April: 20,
  May: 20,
  June: 20,
  July: 20,
  August: 20,
  September: 20,
  October: 20,
  November: 20,
  December: 20,
};
export const scratchNoCritialData = {
  January: 110,
  February: 120,
  March: 100,
  April: 90,
  May: 80,
  June: 70,
  July: 50,
  August: 90,
  September: 80,
  October: 80,
  November: 110,
  December: 120,
};
export const recessCriticalData = {
  January: 30,
  February: 30,
  March: 30,
  April: 30,
  May: 30,
  June: 30,
  July: 30,
  August: 30,
  September: 30,
  October: 30,
  November: 30,
  December: 30,
};
export const recessNoCritialData = {
  January: 120,
  February: 90,
  March: 70,
  April: 50,
  May: 100,
  June: 100,
  July: 140,
  August: 80,
  September: 60,
  October: 45,
  November: 75,
  December: 50,
};

export const dataByCategory = [
  [defaultCriticalData, defaultNoCriticalData],
  [scratchCriticalData, scratchNoCritialData],
  [recessCriticalData, recessNoCritialData],
];

export const highchartsDefaultOptions = {
  title: {
    text: "",
  },
  yAxis: { title: { text: "Count" } },
  xAxis: {
    categories: [
      // date(2020, 8, 19, 9),
      // date(2020, 8, 19, 11),
      // date(2020, 8, 19, 13),
      // date(2020, 8, 19, 15),
      // date(2020, 8, 19, 17),
      // date(2020, 8, 19, 19),
    ],
  },
  series: [
    // {
    //   type: "column",
    //   // name: "Pełne",
    //   // data: [],
    //   // data: [8, 7, 5, 3, 2, 0],
    // },
    // {
    //   type: "column",
    //   // name: "Półpełne",
    //   // data: [],
    //   // data: [0, 1, 2, 2, 3, 4],
    // },
    // {
    //   type: "column",
    //   // name: "Puste",
    //   // data: [],
    //   // data: [0, 0, 1, 3, 3, 4],
    // },
  ],
  legend: {
    align: "right",
    backgroundColor: "#FFFFFF",
    floating: true,
    borderWidth: 0,
    verticalAlign: "top",
    x: 0,
    y: 0,
    reversed: true,
  },
};

const mediaQ = (size) => `@media only screen and (min-width: ${size}px)`;

export const mediaQueries = {
  xs: mediaQ(320),
  sm: mediaQ(576),
  md: mediaQ(850),
  lg: mediaQ(992),
  xl: mediaQ(1200),
  xxl: mediaQ(1440),
  xxxl: mediaQ(1600),
};

export const fontWeight = {
  light: 300,
  medium: 400,
  extraMedium: 500,
  semiBold: 600,
  heavy: 700,
  extraBold: 800,
};

export const colors = {
  black: "#000000",
  white: "#FFFFFF",
  brown: "#AA6E10",
  red: "#E90107",
  grey: "#00000029",
  yellow: "#FDB201",
  green: "#12D00B",
  silver: "#C7C7C7",
  turquoiseBlue: "#61D7ED",
  spray: "#78ECED",
  silverSand: "#B9C0C0",
  scratches: "#eba919",
  recess: "#e061cd",
};

export const fontSize = {
  xxSmall: "0.7rem",
  xSmall: "0.8rem",
  small: "0.85rem",
  base: "16px",
  normal: "1rem",
  normalExtended: "1.1rem",
  medium: "1.2rem",
  mediumExtended: "1.3rem",
  large: "1.5rem",
  largeExtended: "1.8rem",
  extraLarge: "2rem",
  extraLargeExtended: "2.5rem",
  biggest: "3rem",
  biggestExtended: "4rem",
  offTheScale: "5rem",
};

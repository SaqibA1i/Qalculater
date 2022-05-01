export const colors = [
  "#EA5C2B",
  "#7900FF",
  "rgb(102 145 29)",
  "#DB6B97",
  "#064635",
];

export const getColor = (value: number) => {
  if (value < 0.5) {
    value = 1;
  } else {
    value = -2 * value + 2;
  }
  //value from 0 to 1
  var hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",100%, 37%)"].join("");
};

export const getGradient = (courseAverage: number) => {
  return (
    "linear-gradient(" +
    getColor((courseAverage + 3) / 100) +
    ", " +
    getColor((courseAverage - 10) / 100) +
    ")"
  );
};

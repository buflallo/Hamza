import React from "react";
import useScrollFrame from "./useScrollFrame";

const TARGET = [255, 255, 255];
const INITIAL = [29, 27, 27];

const scrolledFraction = () => {
  const scrollable = document.body.clientHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / scrollable));
};

const changeColor = (fraction) => {
  let p = fraction * 10;
  if (p > 1 && p < 9) return "rgba(255, 255, 255, 1)";
  if (p >= 9) p = 1 - (p - 9);
  const mixed = INITIAL.map((c, i) => c * (1 - p) + TARGET[i] * p);
  return `rgba(${mixed.join(",")}, 1)`;
};

const useColorTransition = () => {
  const [color, setColor] = React.useState(() => changeColor(0));
  const update = React.useCallback(
    () => setColor(changeColor(scrolledFraction())),
    [],
  );
  useScrollFrame(update);
  return color;
};

export default useColorTransition;

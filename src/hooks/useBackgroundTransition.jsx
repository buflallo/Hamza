import { useCallback, useRef } from "react";
import useScrollFrame from "./useScrollFrame";

const clamp = (v) => Math.min(1, Math.max(0, v));
// 0 before `from`, 1 after `to`, eased between.
const ramp = (v, from, to) => {
  const t = clamp((v - from) / (to - from));
  return t * t * (3 - 2 * t);
};

// Opacity of each backdrop layer. `s` is the scroll depth and `b` the distance
// to the page end, both in viewport heights.
export const layerOpacities = (s, b) => {
  const ghostIn = ramp(s, 1.5, 2.5);
  const footIn = ramp(1.6 - b, 0, 1.3);
  const toFooter = 1 - ramp(1.9 - b, 0, 0.9);
  return {
    full: 1 - ramp(s, 0.6, 1.4),
    print: 1 - ramp(s, 1.2, 2.2),
    veil: 0.55 * ramp(s, 0, 1) * toFooter,
    ghost: 0.55 * ghostIn * toFooter,
    foot: footIn,
  };
};

const useBackgroundTransition = () => {
  const layers = useRef({});
  const setBackground = useCallback(() => {
    const scrollPosition = window.scrollY;
    const scrollBottom = document.body.scrollHeight - window.innerHeight;
    const transitionBottom =
      (scrollBottom - scrollPosition) / window.innerHeight;

    let progress = Math.min(
      Math.max(0, scrollPosition / window.innerHeight),
      1,
    );
    let direction = "to right bottom";
    if (transitionBottom <= 1) {
      direction = "to top";
      progress = transitionBottom;
    }

    let colorStop = 0;
    let color2Stop = 0;
    if (scrollPosition && transitionBottom <= 1) {
      colorStop = `${(1 - transitionBottom) * 50}%`;
      color2Stop = `${(1 - transitionBottom) * 30}%`;
    }

    const gradient = `linear-gradient(${direction}, rgb(255, 255, 0) ${color2Stop}, rgba(29, 27, 27, ${progress}) ${colorStop})`;
    const isNarrow = window.innerWidth < 600;
    const style = document.body.style;
    style.background = gradient;

    if (isNarrow) return;
    const opacities = layerOpacities(
      scrollPosition / window.innerHeight,
      transitionBottom,
    );
    Object.entries(opacities).forEach(([name, value]) => {
      const node = layers.current[name];
      if (!node) return;
      // display:none keeps unseen layers from loading or painting at all
      node.style.display = value > 0.01 ? "block" : "none";
      node.style.opacity = value;
    });
  }, []);

  useScrollFrame(setBackground);
  return layers;
};

export default useBackgroundTransition;

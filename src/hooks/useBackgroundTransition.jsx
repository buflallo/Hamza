import { useCallback, useRef } from "react";
import useScrollFrame from "./useScrollFrame";

const clamp = (v) => Math.min(1, Math.max(0, v));
// 0 before `from`, 1 after `to`, eased between.
const ramp = (v, from, to) => {
  const t = clamp((v - from) / (to - from));
  return t * t * (3 - 2 * t);
};

// Opacity of each backdrop layer. `s` is the scroll depth and `b` the distance
// to the page end, both in viewport heights. Down from the ceiling: painting,
// print, dark; at the very end the painting comes back.
export const layerOpacities = (s, b) => {
  const foot = ramp(1.6 - b, 0, 1.2);
  return {
    full: 1 - ramp(s, 0.5, 1.3),
    print: 1 - ramp(s, 1.0, 1.8),
    veil: ramp(s, 0.3, 1.2) * (1 - foot),
    foot,
  };
};

const useBackgroundTransition = () => {
  const layers = useRef({});
  const setBackground = useCallback(() => {
    if (window.innerWidth < 600) return;
    const scrollPosition = window.scrollY;
    const scrollBottom = document.body.scrollHeight - window.innerHeight;
    const opacities = layerOpacities(
      scrollPosition / window.innerHeight,
      (scrollBottom - scrollPosition) / window.innerHeight,
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

import { useCallback } from "react";
import useScrollFrame from "./useScrollFrame";

const useBackgroundTransition = () => {
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
    style.background = isNarrow
      ? gradient
      : `${gradient}, url("background2.webp")`;
    style.backgroundSize = "cover";
    style.backgroundPositionX = "center";
    style.backgroundAttachment = "fixed";
  }, []);

  useScrollFrame(setBackground);
};

export default useBackgroundTransition;

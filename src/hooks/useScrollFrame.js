import { useEffect } from "react";

// Calls `callback` at most once per animation frame while the page scrolls
// (and once on mount / resize). The listener is passive.
export default function useScrollFrame(callback) {
  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      callback();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [callback]);
}

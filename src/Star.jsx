import React, { useEffect, useRef } from "react";

// The site's star; it turns as the page scrolls (still for reduced motion).
export default function Star({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      if (ref.current) {
        ref.current.style.transform = `rotate(${window.scrollY / 10}deg)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <img ref={ref} className={className} src="star.png" alt="" />;
}

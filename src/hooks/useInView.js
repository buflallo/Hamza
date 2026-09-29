import { useEffect, useRef, useState } from "react";

// One-shot "has this scrolled into view" flag. Falls back to true when there is
// no IntersectionObserver or the visitor prefers reduced motion, so content is
// never left hidden.
export default function useInView(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(
    () =>
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const node = ref.current;
    if (inView || !node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView];
}

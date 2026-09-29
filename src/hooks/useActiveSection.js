import { useEffect, useState } from "react";

// Returns the id of the section currently crossing the middle of the viewport.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const seen = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const current = ids.find((id) => seen.get(id));
        setActive(current ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const attach = () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };
    attach();
    // Sections are lazy-loaded; re-check until they exist.
    const retry = setInterval(() => {
      if (ids.every((id) => document.getElementById(id))) {
        attach();
        clearInterval(retry);
      }
    }, 500);
    return () => {
      clearInterval(retry);
      observer.disconnect();
    };
  }, [ids]);

  return active;
}

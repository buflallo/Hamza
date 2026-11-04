import React, { useCallback, useEffect, useState } from "react";
import useActiveSection from "./hooks/useActiveSection";
import useScrollFrame from "./hooks/useScrollFrame";
import { NAV, NAV_IDS, sectionNumber } from "./data/content";

// Your name and the numbered index. Clear over the painting, frosted dark once
// you scroll past it. Below 900px the index folds behind an "Index" button.
export default function Masthead() {
  const active = useActiveSection(NAV_IDS);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  const onScroll = useCallback(
    () => setSolid(window.scrollY > window.innerHeight * 0.5),
    [],
  );
  useScrollFrame(onScroll);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      className={`masthead${solid || open ? " is-solid" : ""}`}
      aria-label="Sections"
    >
      <a className="masthead-name misreg" href="#top">
        Hamza Lachkar
      </a>
      <button
        type="button"
        className="masthead-toggle"
        aria-expanded={open}
        aria-controls="section-index"
        onClick={() => setOpen((value) => !value)}
      >
        Index <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <ol
        id="section-index"
        className={`masthead-index${open ? " is-open" : ""}`}
      >
        {NAV.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="num" aria-hidden="true">
                {sectionNumber(id)}
              </span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

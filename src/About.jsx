import React, { Suspense, useRef, useState } from "react";
import useInView from "./hooks/useInView";
import { ABOUT, sectionNumber } from "./data/content";

// Only this chunk pulls in three.js, and only on wide screens with WebGL.
const BustScene = React.lazy(() => import("./BustScene"));

const wantsScene = () =>
  typeof window !== "undefined" &&
  typeof window.WebGLRenderingContext !== "undefined" &&
  window.matchMedia("(min-width: 900px)").matches;

export default function About() {
  const [ref, inView] = useInView();
  const stageRef = useRef(null);
  const [scene] = useState(wantsScene);
  const rise = `rise${inView ? " is-in" : ""}`;

  return (
    <section
      id="About"
      className="about"
      aria-labelledby="about-title"
      ref={ref}
    >
      <div className="about-copy">
        <p className={`label ${rise}`}>{sectionNumber("About")} · About</p>
        <h2 id="about-title" className={`about-title misreg ${rise}`}>
          {ABOUT.title}
        </h2>
        <p className={`voice ${rise}`} style={{ "--rise-delay": "0.12s" }}>
          {ABOUT.line}
        </p>
        <p className={`body-text ${rise}`} style={{ "--rise-delay": "0.2s" }}>
          {ABOUT.text}
        </p>
        <dl className={`facts ${rise}`} style={{ "--rise-delay": "0.3s" }}>
          {ABOUT.facts.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* --seam (0 marble … 1 blueprint) is driven by scroll in BustScene. */}
      <div className="bust-stage" ref={stageRef} style={{ "--seam": 0.5 }}>
        <p className="stage-note stage-note-surface">
          <span aria-hidden="true">← </span>Surface
          <span className="stage-note-stack">{ABOUT.surface}</span>
        </p>
        <p className="stage-note stage-note-under">
          Underneath<span aria-hidden="true"> →</span>
          <span className="stage-note-stack">{ABOUT.underneath}</span>
        </p>
        <img
          className="bust-still"
          src="bust/split.webp"
          alt="Bust of Hamza, half marble and half blueprint"
          width="686"
          height="760"
          loading="lazy"
        />
        {scene && (
          <Suspense fallback={null}>
            <BustScene stageRef={stageRef} />
          </Suspense>
        )}
      </div>
    </section>
  );
}

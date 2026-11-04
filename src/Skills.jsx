import React from "react";
import useInView from "./hooks/useInView";
import { SKILLS, SKILLS_HEAD, sectionNumber } from "./data/content";

// One layer of the stack: its word in its ink, then what it holds.
const Band = ({ id, title, layer, color, description, stack, index }) => {
  const [ref, inView] = useInView();
  return (
    <li
      ref={ref}
      className={`band band-${id} carve rise${inView ? " is-in" : ""}`}
      style={{ "--rise-delay": `${index * 0.1}s`, "--ink": color }}
    >
      <div className="band-word">
        <p className="band-layer">
          {String(index + 1).padStart(2, "0")} · {layer}
        </p>
        <h3>
          <span className="ink">{title}</span>
        </h3>
      </div>
      <div className="band-detail">
        <p className="body-text">{description}</p>
        <p className="band-stack">{stack.join(" · ")}</p>
      </div>
    </li>
  );
};

// Skills as a cross-section: what people see on top, what holds it up below.
export default function Skills() {
  const [ref, inView] = useInView();
  const rise = `rise${inView ? " is-in" : ""}`;
  return (
    <section
      id="Skills"
      className="skills"
      aria-labelledby="skills-title"
      ref={ref}
    >
      <div className="skills-head">
        <div>
          <p className={`label ${rise}`}>{sectionNumber("Skills")} · Skills</p>
          <h2 id="skills-title" className={`section-title misreg ${rise}`}>
            {SKILLS_HEAD.title}
          </h2>
        </div>
        <p className={`skills-axis ${rise}`} aria-hidden="true">
          {SKILLS_HEAD.top} ↑<br />
          <span>{SKILLS_HEAD.bottom} ↓</span>
        </p>
      </div>
      <ol className="bands">
        {SKILLS.map((skill, index) => (
          <Band key={skill.id} index={index} {...skill} />
        ))}
      </ol>
    </section>
  );
}

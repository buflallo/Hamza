import React from "react";
import Constellation from "./Constellation";
import useInView from "./hooks/useInView";
import { EXPERIENCE, sectionNumber } from "./data/content";

// Underneath: the cobalt blueprint. The bust is all structure now, the control
// plane at the centre of its services; the story opens one numbered row at a time.
export default function Experience() {
  const [ref, inView] = useInView();
  const rise = `rise${inView ? " is-in" : ""}`;
  const { name, period, label, role, org, summary, nodes, numbers, details } =
    EXPERIENCE;

  return (
    <section
      id="Experience"
      className={`experience blueprint${inView ? " is-in" : ""}`}
      aria-labelledby="experience-title"
      ref={ref}
    >
      <div className="experience-story">
        <p className={`label ${rise}`}>
          {sectionNumber("Experience")} · {label} · {period}
        </p>
        <h2
          id="experience-title"
          className={`experience-title plate-yellow ${rise}`}
        >
          {name}
        </h2>
        <p
          className={`experience-role ${rise}`}
          style={{ "--rise-delay": "0.1s" }}
        >
          {role} · {org}
        </p>
        <p className={`body-text ${rise}`} style={{ "--rise-delay": "0.18s" }}>
          {summary}
        </p>
        <ol className={`ledger ${rise}`} style={{ "--rise-delay": "0.26s" }}>
          {details.map(({ title, text }, i) => (
            <li key={title}>
              <details name="azul-story" open={i === 0}>
                <summary>
                  <span className="num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ledger-title">{title}</span>
                  <span className="ledger-sign" aria-hidden="true" />
                </summary>
                <p>{text}</p>
              </details>
            </li>
          ))}
        </ol>
      </div>

      <div className="experience-plane">
        <div
          className={`experience-diagram ${rise}`}
          style={{ "--rise-delay": "0.2s" }}
        >
          {/* the head loads when the section comes near, not with the page */}
          <Constellation
            nodes={nodes}
            hub={inView ? "bust/blueprint.webp" : undefined}
          />
          <p className="visually-hidden">
            Platform services: {nodes.join(", ")}.
          </p>
        </div>
        <dl className="numbers">
          {numbers.map(({ value, label: text }, i) => (
            <div
              key={text}
              className={rise}
              style={{ "--rise-delay": `${0.3 + i * 0.12}s` }}
            >
              <dt>{text}</dt>
              <dd className="plate-yellow">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

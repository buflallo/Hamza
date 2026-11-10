import * as React from "react";
import {
  CONTACT,
  CONTACT_EMAIL,
  CV_URL,
  NAV_IDS,
  OPEN_TO,
  SOCIAL_LINKS,
  TAGS,
  sectionNumber,
} from "./data/content";
import useInView from "./hooks/useInView";

const Letters = ({ text, start }) =>
  [...text].map((char, i) => (
    <span key={i} className="letter" style={{ "--i": start + i }}>
      {char === " " ? "\u00a0" : char}
    </span>
  ));

const CONTACT_LINKS = [
  CONTACT_EMAIL && { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
  CV_URL && { label: "CV", href: CV_URL },
  ...SOCIAL_LINKS,
].filter(Boolean);

// The links carry on the index numbers after the five sections.
const linkNumber = (i) => String(NAV_IDS.length + i + 1).padStart(2, "0");

// The end looks up again: the painting returns, the bust faces it with you.
export default function Footer() {
  const [ref, inView] = useInView();
  const [first, second] = CONTACT.title;
  return (
    <footer
      ref={ref}
      id="Contact"
      className={`contact${inView ? " is-in" : ""}`}
    >
      <img
        className="contact-bust"
        src="bust/up.webp"
        alt="Marble bust of Hamza looking up at the painting"
        width="784"
        height="849"
        loading="lazy"
      />
      <div className="contact-copy">
        <p className="label">{sectionNumber("Contact")} · Contact</p>
        <h2 className={`contact-title letters${inView ? " is-in" : ""}`}>
          <span className="visually-hidden">
            {first} {second}
          </span>
          <span aria-hidden="true" className="misreg-hover">
            <Letters text={first} start={0} />
          </span>
          <span aria-hidden="true" className="misreg-hover">
            <Letters text={second} start={first.length} />
          </span>
        </h2>
        <p className="voice">{CONTACT.line}</p>
        <ul className="tags" aria-label="Areas of expertise">
          <li
            className={`pill pill-open${inView ? " is-in" : ""}`}
            style={{ "--i": 0, "--tilt": "-2deg" }}
          >
            {OPEN_TO}
          </li>
          {TAGS.map((tag, i) => (
            <li
              key={tag}
              className={`pill${inView ? " is-in" : ""}`}
              style={{ "--i": i + 1, "--tilt": `${[-3, 2, -2, 3][i % 4]}deg` }}
            >
              {tag}
            </li>
          ))}
        </ul>
        <ul className="contact-links">
          {CONTACT_LINKS.map(({ label, href }, i) => {
            const external = href.startsWith("http");
            return (
              <li key={label}>
                <span className="num" aria-hidden="true">
                  {linkNumber(i)}
                </span>
                <a
                  href={href}
                  className="link"
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {label}
                  {external && (
                    <span className="arrow" aria-hidden="true">
                      {" ↗"}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        <a className="contact-back" href="#top">
          <span aria-hidden="true">↑ </span>
          {CONTACT.back}
        </a>
      </div>
    </footer>
  );
}

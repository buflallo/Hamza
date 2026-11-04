import * as React from "react";
import Star from "./Star";
import { HERO } from "./data/content";

// The cover: PLATFORM behind the bust, & BACKEND ENGINEER in front of it, and
// the one line the rest of the page proves.
const Headers = () => (
  <header className="hero" id="top">
    <Star className="hero-star" />
    <h1 className="hero-title">
      <span className="hero-lead misreg">{HERO.lead}</span>{" "}
      <span className="hero-rest misreg">{HERO.rest}</span>
    </h1>
    <picture className="hero-bust">
      <source media="(max-width: 599px)" srcSet="bust/profile-print.webp" />
      <img
        src="bust/profile.webp"
        alt="Marble bust of Hamza in profile"
        width="822"
        height="1073"
      />
    </picture>
    <div className="hero-copy">
      <p className="voice">{HERO.voice}</p>
      <p className="hero-text">{HERO.text}</p>
      <p className="open-pill">{HERO.open}</p>
    </div>
    <a className="hero-scroll" href="#About">
      <span className="hero-scroll-line" aria-hidden="true" />
      {HERO.scroll} <span aria-hidden="true">↓</span>
    </a>
  </header>
);

export default Headers;

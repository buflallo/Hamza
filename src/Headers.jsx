import React, { Suspense, useEffect, useRef, useState } from "react";
import Star from "./Star";
import { HERO } from "./data/content";
import { prefersReducedMotion, wantsScene } from "./sceneSupport";

const BustScene = React.lazy(() => import("./BustScene"));

// The live head arrives only after the page has loaded, on wide screens, and
// not at all when motion is reduced (the still is the same pose).
const useLateScene = () => {
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!wantsScene() || prefersReducedMotion()) return undefined;
    const go = () => setLive(true);
    if (document.readyState === "complete") {
      go();
      return undefined;
    }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);
  return live;
};

// The cover: PLATFORM behind the bust, & BACKEND ENGINEER in front of it, and
// the one line the rest of the page proves.
const Headers = () => {
  const bustRef = useRef(null);
  const live = useLateScene();
  return (
    <header className="hero" id="top">
      <Star className="hero-star" />
      <h1 className="hero-title">
        <span className="hero-lead misreg">{HERO.lead}</span>{" "}
        <span className="hero-rest misreg">{HERO.rest}</span>
      </h1>
      <div className="hero-bust" ref={bustRef}>
        <picture>
          <source media="(max-width: 599px)" srcSet="bust/profile-print.webp" />
          <img
            src="bust/profile.webp"
            alt="Marble bust of Hamza in profile"
            width="822"
            height="1073"
          />
        </picture>
        {live && (
          <Suspense fallback={null}>
            <BustScene stageRef={bustRef} mode="hero" />
          </Suspense>
        )}
      </div>
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
};

export default Headers;

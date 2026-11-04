import React, { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Constellation from "./Constellation";
import useInView from "./hooks/useInView";
import {
  EXPERIENCE,
  PROJECTS,
  PROJECTS_HEAD,
  sectionNumber,
} from "./data/content";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A project's preview. On wide screens it floats beside its row while you hover
// or focus the row; on phones it sits under the row. Videos play only on demand.
const ProjectMedia = React.forwardRef(function ProjectMedia(
  { media, alt, title, ratio },
  videoRef,
) {
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };
  return (
    <div className="preview">
      <div className="preview-frame" style={{ aspectRatio: ratio }}>
        <video
          ref={videoRef}
          src={`${media}.mp4`}
          poster={`${media}.webp`}
          aria-label={alt}
          loop
          muted
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <IconButton
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} ${title} preview`}
          size="small"
          sx={{
            position: "absolute",
            right: 8,
            bottom: 8,
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.6)",
            "&:hover, &:focus-visible": { backgroundColor: "rgba(0,0,0,0.85)" },
          }}
        >
          {playing ? (
            <PauseIcon fontSize="small" />
          ) : (
            <PlayArrowIcon fontSize="small" />
          )}
        </IconButton>
      </div>
    </div>
  );
});

// A project without public media is shown as its platform diagram.
const ProjectDiagram = ({ title }) => (
  <div className="preview">
    <div className="preview-frame blueprint" style={{ aspectRatio: "1 / 1" }}>
      <div className="preview-diagram">
        <Constellation nodes={EXPERIENCE.nodes.slice(0, 6)} size={440} />
      </div>
      <p className="visually-hidden">
        Diagram of {title}: {EXPERIENCE.nodes.join(", ")}.
      </p>
    </div>
  </div>
);

const Stratum = ({ project, index }) => {
  const { title, category, layer, note, repo, demo, diagram } = project;
  const [ref, inView] = useInView();
  const videoRef = useRef(null);
  // Hovering or focusing a row plays its preview, unless motion is reduced.
  const wake = () => {
    const video = videoRef.current;
    if (video && video.paused && !prefersReducedMotion()) {
      const started = video.play();
      if (started && started.catch) started.catch(() => {});
    }
  };
  const rest = (event) => {
    if (
      event.type === "blur" &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }
    const video = videoRef.current;
    if (video && !video.paused) video.pause();
  };
  const structure = layer === "Structure";

  return (
    <li
      ref={ref}
      className={`stratum rise${inView ? " is-in" : ""}`}
      style={{ "--rise-delay": `${index * 0.08}s` }}
      onMouseEnter={wake}
      onMouseLeave={rest}
      onFocus={wake}
      onBlur={rest}
    >
      <span className="num" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="stratum-title">
        <span className="stratum-name">{title}</span>
      </h3>
      <div className="stratum-meta">
        <p>{category}</p>
        <p className={`stratum-layer${structure ? " is-structure" : ""}`}>
          {layer}
          {structure && (
            <>
              {" · "}
              <a href="#Experience">
                see {sectionNumber("Experience")}
                <span aria-hidden="true"> ↑</span>
              </a>
            </>
          )}
        </p>
        {note && <p className="stratum-note">{note}</p>}
        {(repo || demo) && (
          <p className="stratum-links">
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer">
                Code<span className="visually-hidden"> for {title}</span>
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer">
                Live<span className="visually-hidden"> demo of {title}</span>
              </a>
            )}
          </p>
        )}
      </div>
      {diagram ? (
        <ProjectDiagram title={title} />
      ) : (
        <ProjectMedia ref={videoRef} {...project} />
      )}
    </li>
  );
};

// What it stands on: AZUL is the structure, the school projects its foundation.
export default function Projects() {
  const [ref, inView] = useInView();
  const rise = `rise${inView ? " is-in" : ""}`;
  return (
    <section
      id="Works"
      className="projects"
      aria-labelledby="works-title"
      ref={ref}
    >
      <p className={`label ${rise}`}>{sectionNumber("Works")} · Projects</p>
      <h2 id="works-title" className={`section-title misreg ${rise}`}>
        {PROJECTS_HEAD.title}
      </h2>
      <p className={`voice ${rise}`} style={{ "--rise-delay": "0.12s" }}>
        {PROJECTS_HEAD.line}
      </p>
      <div className="strata-wrap">
        <div className="ruler" aria-hidden="true">
          <span className="ruler-structure">Structure</span>
          <span className="ruler-foundation">Foundation ↓</span>
        </div>
        <ol className="strata">
          {PROJECTS.map((project, index) => (
            <Stratum key={project.title} project={project} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}

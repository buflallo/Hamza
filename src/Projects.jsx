import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Title from "./Title";
import useInView from "./hooks/useInView";
import { PROJECTS } from "./data/content";

const ProjectText = ({ title, category, repo, demo }) => {
  const [ref, inView] = useInView();
  const rise = `rise${inView ? " is-in" : ""}`;
  return (
    <Grid
      item
      ref={ref}
      xs={12}
      sm={6}
      md={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        color="white"
        variant="h3"
        component="h3"
        className={rise}
        fontSize={{ xs: "48px", md: "5vw" }}
      >
        {title}
      </Typography>
      <Typography
        textAlign="center"
        fontSize={{ xs: "22px", md: "2vw" }}
        color="white"
        variant="h6"
        component="p"
        className={rise}
        style={{ "--rise-delay": "0.25s" }}
      >
        {category}
      </Typography>
      {(repo || demo) && (
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          {repo && (
            <Link
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ color: "#E1FF00" }}
            >
              Code<span className="visually-hidden"> for {title}</span>
            </Link>
          )}
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ color: "#E1FF00" }}
            >
              Live<span className="visually-hidden"> demo of {title}</span>
            </Link>
          )}
        </Box>
      )}
    </Grid>
  );
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProjectMedia = ({ media, alt, title, ratio }) => {
  const [ref, inView] = useInView();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ position: "relative" }}>
      <div
        ref={ref}
        className={`develop${inView ? " is-in" : ""}`}
        style={{ aspectRatio: ratio }}
      >
        <video
          className="develop-media"
          ref={videoRef}
          src={`${media}.mp4`}
          poster={`${media}.webp`}
          aria-label={alt}
          autoPlay={playing}
          loop
          muted
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
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
    </Grid>
  );
};

const Spacer = () => (
  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    sx={{ display: { xs: "none", md: "block" } }}
  />
);

// Layout pattern per row: text | media | spacer, media | text | spacer,
// spacer | media | text, spacer | text | media (repeats every 4 projects).
const LAYOUTS = [
  ["text", "media", "spacer"],
  ["media", "text", "spacer"],
  ["spacer", "media", "text"],
  ["spacer", "text", "media"],
];

export default function Projects() {
  return (
    <Box
      component="section"
      id="Works"
      aria-labelledby="works-title"
      sx={{
        pt: "12vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "50px",
        pr: { xs: "3vw", md: "0" },
        pl: { xs: "3vw", md: "40px" },
      }}
    >
      <Title title="Projects" id="works-title" />
      <Box sx={{ mt: "20px" }}>
        <Grid container spacing={2}>
          {PROJECTS.map((project, index) => (
            <React.Fragment key={project.title}>
              {LAYOUTS[index % LAYOUTS.length].map((cell) => {
                if (cell === "text") {
                  return <ProjectText key={cell} {...project} />;
                }
                if (cell === "media") {
                  return <ProjectMedia key={cell} {...project} />;
                }
                return <Spacer key={cell} />;
              })}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

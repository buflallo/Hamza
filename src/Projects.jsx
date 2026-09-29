import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Title from "./Title";
import { PROJECTS } from "./data/content";

const ProjectText = ({ title, category }) => (
  <Grid
    item
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
    >
      {category}
    </Typography>
  </Grid>
);

const ProjectMedia = ({ media, alt }) => (
  <Grid item xs={12} sm={6} md={4}>
    <video
      src={`${media}.mp4`}
      poster={`${media}.webp`}
      aria-label={alt}
      width="100%"
      height="auto"
      style={{ display: "block" }}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
    />
  </Grid>
);

const Spacer = () => (
  <Grid item xs={12} sm={6} md={4} sx={{ display: { xs: "none", md: "block" } }} />
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

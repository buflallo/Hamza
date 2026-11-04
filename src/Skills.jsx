import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import useInView from "./hooks/useInView";
import { SKILLS } from "./data/content";

// One skill as a line of carved lettering: the word, its ink, then the detail.
const Skill = ({ title, color, description, stack, index }) => {
  const [ref, inView] = useInView();
  const delay = { "--rise-delay": `${index * 0.12}s`, "--ink": color };
  return (
    <Box
      component="li"
      ref={ref}
      className={`carve rise${inView ? " is-in" : ""}`}
      style={delay}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: { xs: "8px", md: "4vw" },
        alignItems: "start",
        py: { xs: "16px", md: "1.2vw" },
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        color="#fff"
        sx={{
          textTransform: "uppercase",
          lineHeight: 1,
          fontSize: { xs: "72px", md: "11vw" },
          whiteSpace: "nowrap",
        }}
      >
        <span className="ink">{title}</span>
      </Typography>
      <Box sx={{ pt: { md: "1.4vw" } }}>
        <Typography
          variant="h4"
          component="p"
          color="#fff"
          fontWeight="500"
          sx={{
            textTransform: "uppercase",
            fontSize: { xs: "17px", md: "calc(0.55rem + 0.75vw)" },
            lineHeight: 1.4,
          }}
        >
          {description}
        </Typography>
        <Typography
          component="p"
          sx={{
            mt: 2,
            fontFamily: '"PPFuji", sans-serif',
            fontWeight: "bold",
            fontSize: "13px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#E1FF00",
          }}
        >
          {stack.join(" · ")}
        </Typography>
      </Box>
    </Box>
  );
};

export default function Skills() {
  return (
    <Box
      component="section"
      id="Skills"
      aria-labelledby="skills-title"
      sx={{
        pt: "12vh",
        mt: "50px",
        px: { xs: "5vw", md: "5vw" },
        display: "flex",
        gap: "40px",
        flexDirection: "column",
      }}
    >
      <Title title="Skills" id="skills-title" />
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
        {SKILLS.map((skill, index) => (
          <Skill key={skill.id} index={index} {...skill} />
        ))}
      </Box>
    </Box>
  );
}

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Constellation from "./Constellation";
import useInView from "./hooks/useInView";
import { EXPERIENCE } from "./data/content";

const label = {
  fontFamily: '"PPFuji", sans-serif',
  fontWeight: "bold",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#E1FF00",
};

// The technical moment of the page: a cobalt blueprint where the plate turns yellow.
export default function Experience() {
  const [ref, inView] = useInView();
  const rise = `rise${inView ? " is-in" : ""}`;
  const { name, period, role, org, summary, nodes, numbers, details } =
    EXPERIENCE;

  return (
    <Box
      component="section"
      id="Experience"
      aria-labelledby="experience-title"
      ref={ref}
      className="blueprint"
      sx={{
        mt: "12vh",
        px: { xs: "5vw", md: "5vw" },
        py: { xs: "56px", md: "72px" },
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
          gap: { xs: "24px", md: "4vw" },
          alignItems: "center",
        }}
      >
        <Box>
          <Typography className={rise} sx={{ ...label, fontSize: "14px" }}>
            Experience · {period}
          </Typography>
          <Typography
            id="experience-title"
            variant="h3"
            component="h2"
            className={`${rise} plate-yellow`}
            sx={{
              textTransform: "uppercase",
              lineHeight: 1,
              fontSize: { xs: "72px", md: "9vw" },
              mt: 1,
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h4"
            component="p"
            className={rise}
            style={{ "--rise-delay": "0.15s" }}
            sx={{
              textTransform: "uppercase",
              fontSize: { xs: "18px", md: "calc(0.6rem + 0.9vw)" },
              mt: 3,
            }}
          >
            {role} · {org}
          </Typography>
          <Typography
            variant="h4"
            component="p"
            fontWeight="500"
            className={rise}
            style={{ "--rise-delay": "0.25s" }}
            sx={{
              textTransform: "uppercase",
              fontSize: { xs: "17px", md: "calc(0.55rem + 0.7vw)" },
              lineHeight: 1.4,
              mt: 2,
              maxWidth: "36em",
            }}
          >
            {summary}
          </Typography>

          <details
            className={`story ${rise}`}
            style={{ "--rise-delay": "0.35s" }}
          >
            <summary>
              Read the full story <span aria-hidden="true">+</span>
            </summary>
            <ul>
              {details.map(({ title, text }) => (
                <li key={title}>
                  <strong>{title}.</strong> {text}
                </li>
              ))}
            </ul>
          </details>
        </Box>

        <Box
          className={rise}
          style={{ "--rise-delay": "0.2s" }}
          sx={{
            width: "100%",
            maxWidth: { xs: "420px", md: "560px" },
            mx: "auto",
            aspectRatio: "1 / 1",
          }}
        >
          <Constellation nodes={nodes} hub="bust/front.webp" />
          <p className="visually-hidden">
            Platform services: {nodes.join(", ")}.
          </p>
        </Box>
      </Box>

      <Box
        component="dl"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: { xs: "24px", md: "2vw" },
          m: 0,
          mt: { xs: "40px", md: "56px" },
        }}
      >
        {numbers.map(({ value, label: text }, i) => (
          <Box
            key={text}
            className={rise}
            style={{ "--rise-delay": `${0.3 + i * 0.12}s` }}
            sx={{ display: "flex", flexDirection: "column-reverse" }}
          >
            <Typography component="dt" sx={{ ...label, fontSize: "15px" }}>
              {text}
            </Typography>
            <Typography
              component="dd"
              variant="h3"
              className="plate-yellow"
              sx={{
                m: 0,
                lineHeight: 1,
                fontSize: { xs: "72px", md: "8vw" },
              }}
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useColorTransition from "./hooks/useColorTransition";
import { HERO } from "./data/content";

const ACCENT = "#2E05D1";

const Headers = () => {
  const color = useColorTransition();
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: { xs: "end", md: "space-around" },
        alignItems: "center",
        height: "fit-content",
        maxHeight: "1600px",
        pt: "16vh",
        px: { xs: "4vw", md: 0 },
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          alignSelf: "flex-start",
          width: "min-content",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          color={{ xs: "#1D1B1B", sm: "#FFFFFF" }}
          fontSize={{
            xs: "clamp(56px, 22vw, 100px)",
            md: "calc(1rem + 7vw + 1vh)",
          }}
          className="misreg"
          sx={{
            textTransform: "uppercase",
            textShadow: `-4px -4px 0 ${ACCENT}`,
          }}
        >
          {HERO.lead} {HERO.rest}
        </Typography>
      </Box>

      <Box sx={{ alignSelf: "flex-end", width: "fit-content" }}>
        <Typography
          // The painted background starts at "sm": use white there, the scroll colour on the light mobile gradient.
          color={{ xs: color, sm: "#FFFFFF" }}
          className="misreg soft"
          sx={{
            maxWidth: { xs: "400px", sm: "60vw" },
            textTransform: "uppercase",
            textShadow: `0 -4px 0 ${ACCENT}`,
          }}
          fontSize={{
            xs: "clamp(1.25rem, 6vw, 2rem)",
            md: "calc((1rem + 7vw + 1vh)/(1.618 * 1.5))",
          }}
          variant="h4"
          component="p"
        >
          {HERO.text}
        </Typography>
        <Typography
          component="p"
          sx={{
            display: "inline-block",
            mt: 3,
            px: 2,
            py: "6px",
            border: "2px solid #E1FF00",
            borderRadius: "40px",
            background: "#1D1B1B",
            color: "#E1FF00",
            fontFamily: '"PPFuji", sans-serif',
            fontWeight: "bold",
            fontSize: { xs: "13px", md: "16px" },
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {HERO.open}
        </Typography>
      </Box>
    </Box>
  );
};

export default Headers;

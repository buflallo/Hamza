import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Title({ title, id }) {
  const starRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (starRef.current) {
        starRef.current.style.transform = `rotate(${window.scrollY / 10}deg)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        ref={starRef}
        sx={{
          width: { xs: "56px", md: "6vw" },
          height: { xs: "56px", md: "6vw" },
          ml: "10px",
          mr: { xs: "10px", md: "1vw" },
          alignSelf: "center",
          flexShrink: 0,
          willChange: "transform",
        }}
      >
        <img width="100%" height="100%" src="star.png" alt="" loading="lazy" />
      </Box>
      <Typography
        id={id}
        color="white"
        variant="h3"
        component="h2"
        className="misreg"
        sx={{
          textAlign: "left",
          textTransform: "uppercase",
          lineHeight: 1,
          fontSize: { xs: "64px", md: "8.5vw" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

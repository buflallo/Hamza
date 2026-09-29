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
          width: { xs: "60px", md: "3vw" },
          height: { xs: "60px", md: "3vw" },
          ml: "10px",
          mr: "10px",
          willChange: "transform",
        }}
      >
        <img width="100%" height="100%" src="star.png" alt="" loading="lazy" />
      </Box>
      <Typography
        id={id}
        color="white"
        sx={{ textAlign: "left" }}
        variant="h5"
        component="h2"
        fontSize={{ xs: "2rem", md: "calc(6vw/(1.618*1.5))" }}
        alignContent="center"
      >
        {title}
      </Typography>
    </Box>
  );
}

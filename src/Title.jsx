import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

export default function Projects(props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          transform: `translate3d(0px, 0px, 0px) rotate(${
            scrollPosition / 10
          }deg)`,
          width: { xs: "60px", md: "3vw" },
          height: { xs: "60px", md: "3vw" },
          ml: "10px",
          mr: "10px",
        }}
      >
        <img
          width={"100%"}
          height={"100%"}
          src="star.png"
          alt="Your Description"
        />
      </Box>
      <Typography
        color={"white"}
        sx={{ textAlign: "left" }}
        variant="h5"
        fontSize={{ xs: "2rem", md: "calc(6vw/(1.618*1.5))" }}
        alignContent={"center"}
      >
        {props.title}
      </Typography>
    </Box>
  );
}

import React from "react";
import Typography from "@mui/material/Typography";

// Section title: the hero's Delirium type with the blue plate slipping behind.
export default function Title({ title, id }) {
  return (
    <Typography
      id={id}
      color="white"
      variant="h3"
      component="h2"
      className="misreg"
      sx={{
        textAlign: "left",
        textTransform: "uppercase",
        ml: { xs: "10px", md: "2vw" },
        lineHeight: 1,
        fontSize: { xs: "64px", md: "8.5vw" },
      }}
    >
      {title}
    </Typography>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SOCIAL_LINKS, TAGS } from "./data/content";
import useColorTransition from "./hooks/useColorTransition";

export default function Footer() {
  const color = useColorTransition();
  return (
    <Box
      component="footer"
      id="Contact"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "end",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          alignSelf: { xs: "start", md: "end" },
          color: "#FFFFFF",
        }}
      >
        <Typography
          sx={{ lineHeight: "1" }}
          color={color}
          fontSize={{ xs: "100px", md: "calc(4rem + 12vw)" }}
          variant="h3"
        >
          Let's
        </Typography>
        <Typography
          sx={{ lineHeight: "1" }}
          color={color}
          fontSize={{ xs: "100px", md: "12vw" }}
          variant="h3"
        >
          connect
        </Typography>
      </Box>
      <Box
        component="ul"
        aria-label="Areas of expertise"
        sx={{
          m: 0,
          p: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignSelf: { xs: "start", md: "end" },
          flexWrap: "wrap",
          gap: "1vw",
          width: { xs: "100%", md: "80%" },
        }}
      >
        {TAGS.map((tag, i) => (
          <Box
            key={tag}
            component="li"
            sx={{
              listStyle: "none",
              border: "2px solid black",
              borderRadius: "50px",
              padding: "5px",
              height: "min-content",
              ml: i === 0 ? { xs: "0", md: "-6vw" } : 0,
            }}
          >
            <Typography color={color} variant="h6" component="span">
              {tag}
            </Typography>
          </Box>
        ))}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: { xs: "20px", md: "calc(3rem + 5vh)" },
            // alignSelf: "end",
            // color: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // alignSelf: "end",
              // color: "#FFFFFF",
            }}
          >
            <Typography color={color} variant="h6">
              HAVE A PROJECT IN MIND?
            </Typography>
            {/* <Button></Button> */}
          </Box>
          <Box
            sx={{
              borderTop: "2px solid black",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "40px",
              alignItems: "center",
              // alignSelf: "end",
              // color: "#FFFFFF",
            }}
          >
            {SOCIAL_LINKS.map(({ label, href }) => (
              <Typography key={label} color={color} variant="h6">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {label.toUpperCase()}
                </a>
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

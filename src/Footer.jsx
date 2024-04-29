import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { StyledTab, StyledTabs } from "./Menu";
import useColorTransition from "./hooks/useColorTransition";

export default function Footer() {
  const color = useColorTransition();
  return (
    <Box
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
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignSelf: { xs: "start", md: "end" },
          flexWrap: "wrap",
          gap: "1vw",
          width: { xs: "100%", md: "80%" },
        }}
      >
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "50px",
            padding: "5px",
            height: "min-content",
            ml: { xs: "0", md: "-6vw" },
          }}
        >
          <Typography color={color} variant="h6">
            Web Development
          </Typography>
        </Box>
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "50px",
            padding: "5px",
            height: "min-content",
          }}
        >
          <Typography color={color} variant="h6">
            Software Engineering
          </Typography>
        </Box>
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "50px",
            padding: "5px",
            height: "min-content",
          }}
        >
          <Typography color={color} variant="h6">
            IT Solutions
          </Typography>
        </Box>
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "50px",
            padding: "5px",
            height: "min-content",
          }}
        >
          <Typography color={color} variant="h6">
            UI/UX Design
          </Typography>
        </Box>
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "50px",
            padding: "5px",
            // ml: "-6vw",
            height: "min-content",
          }}
        >
          <Typography color={color} variant="h6">
            Mathematics
          </Typography>
        </Box>
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "50px",
            padding: "5px",
            height: "min-content",
          }}
        >
          <Typography color={color} variant="h6">
            Cyber Security
          </Typography>
        </Box>
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
              ARE YOU MINDING A PROJECT?
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
            <Typography color={color} variant="h6">
              <a href="https://www.instagram.com/hmazi96/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                INSTAGRAM
              </a>
            </Typography>
            <Typography color={color} variant="h6">
              <a href="https://www.linkedin.com/in/hamza-lachqar/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                LINKEDIN
              </a>
            </Typography>
            <Typography color={color} variant="h6">
              <a href="https://github.com/buflallo/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                GITHUB
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

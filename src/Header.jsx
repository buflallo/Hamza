import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Headers from "./Headers";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Footer from "./Footer";

// Only the About section pulls in three.js, so it is the only lazy chunk.
const LazyAbout = React.lazy(() => import("./About"));

// Reserves the section's space while its chunk loads, avoiding a layout shift.
const AboutPlaceholder = () => (
  <Box
    id="About"
    role="status"
    aria-label="Loading"
    sx={{ minHeight: "100vh" }}
  />
);

const Header = () => (
  <React.Fragment>
    <CssBaseline />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: "100%", lg: "90%" },
      }}
    >
      <ResponsiveAppBar />
      <Box component="main">
        <Headers />
        <React.Suspense fallback={<AboutPlaceholder />}>
          <LazyAbout />
        </React.Suspense>
        <Experience />
        <Projects />
        <Skills />
      </Box>
      <Footer />
    </Box>
  </React.Fragment>
);

export default Header;

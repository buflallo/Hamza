import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Headers from "./Headers";

const LazyAbout = React.lazy(() => import("./About"));
const LazyProjects = React.lazy(() => import("./Projects"));
const LazySkills = React.lazy(() => import("./Skills"));
const LazyFooter = React.lazy(() => import("./Footer"));

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
        <React.Suspense fallback={<div role="status">Loading…</div>}>
          <LazyAbout />
          <LazyProjects />
          <LazySkills />
        </React.Suspense>
      </Box>
      <React.Suspense fallback={null}>
        <LazyFooter />
      </React.Suspense>
    </Box>
  </React.Fragment>
);

export default Header;

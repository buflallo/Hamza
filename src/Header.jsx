import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Suspense } from "react";
import Headers from "./Headers";
import useColorTransition from "./hooks/useColorTransition";

const LazyAbout = React.lazy(() => import("./About"));
// Lazy load Projects component
const LazyProjects = React.lazy(() => import("./Projects"));
// Lazy load Skills component
const LazySkills = React.lazy(() => import("./Skills"));
// Lazy load Footer component
const LazyFooter = React.lazy(() => import("./Footer"));

const Header = () => {
  const color = useColorTransition();
  return (
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
        <ResponsiveAppBar> </ResponsiveAppBar>

        <Headers></Headers>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyAbout />
          {/* <Projects></Projects> */}
          <LazyProjects />
          {/* <Skills></Skills> */}
          <LazySkills />
          {/* <Footer></Footer> */}
          <LazyFooter />
        </Suspense>
        {/* <Footer></Footer> */}
      </Box>
    </React.Fragment>
  );
};

export default Header;

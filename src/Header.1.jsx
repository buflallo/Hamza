import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Box from "@mui/material/Box";
import { Suspense } from "react";
import Headers from "./Headers";
import useColorTransition from "./hooks/useColorTransition";

export const Header = () => {
  const color = useColorTransition();
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: "100%", lg: "90%" },
      }}>
        <ResponsiveAppBar> </ResponsiveAppBar>

        <Headers></Headers>
        <Suspense fallback={<div>Loading...</div>}>
          <About></About>
          {/* <LazyAbout /> */}
          {/* <Projects></Projects> */}
          {/* <LazyProjects /> */}
          {/* <Skills></Skills> */}
          {/* <LazySkills /> */}
          {/* <Footer></Footer> */}
          {/* <LazyFooter /> */}

        </Suspense>
        {/* <Footer></Footer> */}
      </Box>
    </React.Fragment>
  );
};

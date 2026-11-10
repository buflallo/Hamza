import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Masthead from "./Masthead";
import Headers from "./Headers";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Footer from "./Footer";

// One descent: the painted ceiling, the surface (About), what is underneath
// (AZUL), what it stands on (Projects), the stack, then back up to the ceiling.
const Header = () => (
  <React.Fragment>
    <CssBaseline />
    <div className="page">
      <Masthead />
      <main>
        <Headers />
        <About />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  </React.Fragment>
);

export default Header;

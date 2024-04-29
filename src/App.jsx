import "./App.css";
import Header from "./Header";
import { useEffect } from "react";
import useBackgroundTransition from "./hooks/useBackgroundTransition";

import { createTheme, ThemeProvider } from "@mui/material/styles";



// Step 2: Use the base theme to create the final theme
let theme = createTheme({
  typography: {
    fontFamily: '"Space Mono", Arial, sans-serif',
    h1: {
      fontFamily: '"HelveticaNeue", Arial, sans-serif',
    },
    h2: {
      fontFamily: '"HelveticaNeue", Arial, sans-serif',
    },
    h3: {
      fontFamily: '"DeliriumNcv", Arial, sans-serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"PPFuji", Arial, sans-serif',
      fontWeight: "bold",
    },
    h5: {
      fontFamily: '"HelveticaNeue", Arial, sans-serif',
      fontSize: "1.8rem",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: '"PPFuji", Arial, sans-serif',
      fontWeight: 500,
      fontSize: "calc(1rem + 1vw)",
      textTransform: "uppercase",
      color: "#1D1B1B",
    },
    p: {
      fontFamily: '"PPFuji", Arial, sans-serif',
      fontWeight: 500,
      fontSize: "20px",
    }
  },
});

function App() {
    useBackgroundTransition();
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useColorTransition from "./hooks/useColorTransition";

const Headers = () => {
  const color = useColorTransition();
  // const [height, setHeight] = React.useState("90vh");

  // React.useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     if (768 - window.innerHeight > 0) {
  //       setHeight("fit-content");
  //     }
  //     else {
  //       setHeight("90vh");
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("resize", () => {
  //       setHeight(window.innerHeight);
  //     });
  //   };
  // }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: { xs: "end", md: "space-around" },
        alignItems: "center", // center vertically
        height: "fit-content", // "90vh
        maxHeight: "1600px",
        pt: "16vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignSelf: "flex-start",
          width: "min-content",
          height: "min-content",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          color="#2E05D1"
          fontSize={{ xs: "100px", md: "calc(1rem + 7vw + 1vh)" }}
          sx={{ textTransform: "uppercase", 
        }}
        >
          Software & Web Developer
        </Typography>
        <Typography
          color={{ xs: "#1D1B1B", md: "#FFFFFF"}}
          variant="h3"
          fontSize={{ xs: "100px", md: "calc(1rem + 7vw + 1vh)" }}
          sx={{ textTransform: "uppercase",
            position: "absolute",
          top: "4px",
          left: "4px" }}
        >
          Software & Web Developer
        </Typography>
      </Box>

      <Box
        sx={{
          alignSelf: "flex-end",
          width: `fit-content`,
          display: "flex",
          justifyContent: "center",
          height: "min-content",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          color="#2E05D1"
          sx={{
            maxWidth: { xs: "400px", sm: "60vw" },
            textTransform: "uppercase",
          }}
          fontSize={{ xs: "2rem", md: "calc((1rem + 7vw + 1vh)/(1.618 * 1.5))" }}
          variant="h4"
        >
          I am a seasoned developer based in Morocco, passionate about crafting
          digital solutions that merge simplicity with functionality. I LOVE
          PIZZA AND ART.
        </Typography>
        <Typography
          color={color}
          sx={{
            maxWidth: { xs: "400px", sm: "60vw" },
            textTransform: "uppercase",
            position: "absolute",
            top: "4px",
          }}
          fontSize={{ xs: "2rem", md: "calc((1rem + 7vw + 1vh)/(1.618 * 1.5))" }}
          variant="h4"
        >
          I am a seasoned developer based in Morocco, passionate about crafting
          digital solutions that merge simplicity with functionality. I LOVE
          PIZZA AND ART.
        </Typography>
      </Box>
    </Box>
  );
};

export default Headers;

import React from "react";
import { Typography } from "@mui/material";
import developper from "./assets/images/developer.svg";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";


export default function Descreptif() {
  return (
    <Container maxWidth="lg" sx={{mt: "50px"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: { xs: "flex", sm: "inline-flex" },
            flexDirection: "column",
            width: { xs: "100%", sm: "50$" },
            mt: "auto",
            mb: "auto",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Bonjour 👋.{" "}
          </Typography>
          <Typography variant="button" gutterBottom>
            Je m'appelle Hamza.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Développeur C/C++ je suis principalement intéressé par la
            programmation Système, Backend et Réseau. J'ai effectué ma formation
            à 42 Paris et je travaille chez D.R.A Technologies. .
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            height: "auto",
            width: "50%" ,
          }}
        >
          <img src={developper} alt="developper" style={{ width: "100%" }} />
        </Box>
      </Box>
    </Container>
  );
};

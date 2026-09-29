import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { StyledTab, StyledTabs } from "./Menu";
import useActiveSection from "./hooks/useActiveSection";
import { NAV_SECTIONS } from "./data/content";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveAppBar() {
  const active = useActiveSection(NAV_SECTIONS);
  const value = active ? NAV_SECTIONS.indexOf(active) : false;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      sx={{
        boxShadow: "inset 0px -5px 3px rgba(0,0,0,0.1)",
        backgroundColor: "rgba(20, 18, 18, 0.72)",
        color: "#FFFFFF",
        backdropFilter: "blur(10px)",
      }}
      component="nav"
      position="fixed"
      color="inherit"
    >
      <Container maxWidth="none">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {sm ? (
              <>
                HL<span className="visually-hidden"> Hamza Lachkar</span>
              </>
            ) : (
              "HAMZA LACHKAR"
            )}
          </Typography>
          <Box
            sx={{
              justifyContent: "end",
              flexGrow: 1,
              display: "flex",
            }}
          >
            <StyledTabs value={value} aria-label="Page sections" centered>
              {NAV_SECTIONS.map((page) => (
                <StyledTab key={page} label={page} />
              ))}
            </StyledTabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

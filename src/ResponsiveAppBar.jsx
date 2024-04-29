import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { StyledTab, StyledTabs } from "./Menu";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const pages = ["Works", "About", "Contact"];

export default function ResponsiveAppBar() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <AppBar
      sx={{
        boxShadow: "inset 0px -5px 3px rgba(0,0,0,0.1)",
        backgroundColor: "#ffffff42",
        backdropFilter: "blur(10px)",
      }}
      position="fixed"
      width="inherit"
      alignSelf="center"
      color="transparent"
    >
      <Container maxWidth="none">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            value={"scascas"}
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
            {sm ?"HL" : "HAMZA LACHKAR"}
          </Typography>
          <Box
            sx={{
              justifyContent: "end",
              flexGrow: 1,
              display: "flex",
            }}
          >
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="styled tabs example"
              centered
            >
              {pages.map((page) => (
                <StyledTab label={page} />
              ))}
            </StyledTabs>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

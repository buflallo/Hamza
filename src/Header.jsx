import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Menu from './Menu';
import ResponsiveAppBar from './ResponsiveAppBar';

export default function Header() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveAppBar>  </ResponsiveAppBar>
    </React.Fragment>
  );
}
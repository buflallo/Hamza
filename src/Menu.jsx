import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#E1FF00',
  },
});

export const StyledTab = styled((props) => <Tab href={'#' + props.label} disableRipple {...props} />)(
  ({ theme }) => ({
    fontFamily: 'PPFuji',
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "calc(1em + 0.5vw)",
    marginRight: theme.spacing(1),
    '&.Mui-selected': {
      color: '#1D1B1B',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

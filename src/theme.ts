'use client'

import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#1f9ce6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fbc02d',
    },
    background: {
      default: '#202125',
      paper: '#19191c',
    },
    error: {
      main: '#ff3e31',
    },
    info: {
      main: '#bbdefb',
    },
    warning: {
      main: '#ffb300',
    },
  },
  typography: {
    fontFamily: 'pt sans',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#1E5076',
          ":hover": {
            backgroundColor: '#164569'
          }
        }
      }
    }
    // MuiToolbar: {
    //   styleOverrides: {
    //     dense: {
    //       height: '2rem',
    //       minHeight: '2rem'
    //     }
    //   }
    // }
  }
});
import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: '"PT Sans"',
    h6: {
      fontWeight: 'bold'
    }
  },
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
      paper: '#202125',
      default: '#19191c',
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
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense'
      }
    }
  }
});

export default themeOptions;
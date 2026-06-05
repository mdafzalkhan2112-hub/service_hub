import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#0F172A',
    },
    info: {
      main: '#06B6D4',
    },
    background: {
      default: '#F8FAFC',
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h1: { fontWeight: 900 },
    h2: { fontWeight: 900 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    button: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
  },
});

export default theme;

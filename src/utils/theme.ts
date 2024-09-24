import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Extend PaletteOptions and Palette types to include `primary_blue`
declare module '@mui/material/styles' {
  interface Palette {
    primary_blue: Palette['primary'];
    secondary_blue: Palette['secondary']
    secondary_teal: Palette['secondary']
  }

  interface PaletteOptions {
    primary_blue?: PaletteOptions['primary'];
    secondary_blue?: PaletteOptions['secondary'];
    secondary_teal?: PaletteOptions['secondary'];
  }
}


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#6f42c1",
    },
    primary_blue: {
      main: "#007BFF",
    },
    secondary: {
      main: "#00CCCC",
    },
    secondary_blue: {
      main: "#0DCAF0",
    },
    secondary_teal: {
      main: "#17A2B8",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

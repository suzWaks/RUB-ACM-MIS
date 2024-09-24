import { createTheme } from "@mui/material/styles";
import { Plus_Jakarta_Sans } from "next/font/google";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

declare module '@mui/material/styles' {
  interface Palette {
    secondary_turquoise: Palette['secondary'];
    secondary_blue: Palette['secondary']
    secondary_teal: Palette['secondary']
  }

  interface PaletteOptions {
    secondary_turquoise?: PaletteOptions['secondary'];
    secondary_blue?: PaletteOptions['secondary'];
    secondary_teal?: PaletteOptions['secondary'];
  }
}

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#007BFF",
      light: "#C5E0FDFF",
      dark: "#007BFF",
    },
    secondary: {
      main: "#6f42c1",
      light: "#8E5FE4FF",
      dark: "#5024A1FF",
    },
    secondary_turquoise: {
      main: "#00CCCC",
    },
    secondary_blue: {
      main: "#0DCAF0",
    },
    secondary_teal: {
      main: "#17A2B8",
    },
    success: {
      main: "#00CC66 ",
      light: "#AEF8D3FF ",
      dark: "#02994DFF ",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0DCAF0",
      light: "#A8E2EEFF",
      dark: "#0792ADFF",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FF4D4F",
      light: "#F89C9DFF",
      dark: "#C73B3EFF",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFC107",
      light: "#F7DF97FF",
      dark: "#DBA607FF",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
  },
});

export { baselightTheme };

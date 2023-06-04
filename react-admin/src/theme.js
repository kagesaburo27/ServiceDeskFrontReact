import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import "primereact/resources/themes/lara-light-indigo/theme.css"

// color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      textPrimary: {
        100: "#FFFFFC",
        200: "#e9e9eb",
        300: "#7f8b8f",
        400: "#55646a",
        500: "#2a3d45",
        600: "#223137",
        700: "#192529",
        800: "#11181c",
        900: "#080c0e",
      },
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#181d27",
      },
      primary: {
        1: "#667eea",
        2: "#764ba2",
        100: "#d3d4d7",
        200: "#a7a9af",
        300: "#7b7f86",
        400: "#2A3140",
        500: "#232936",
        600: "#1c212b",
        700: "#151920",
        800: "#0e1016",
        900: "#07080b",
      },
      greenAccent: {
        100: "#dceae3",
        200: "#b9d6c7",
        300: "#97c1aa",
        400: "#74ad8e",
        500: "#519872",
        600: "#417a5b",
        700: "#315b44",
        800: "#203d2e",
        900: "#101e17",
      },
      redAccent: {
        100: "#f8dcdb",
        200: "#f1b9b7",
        300: "#e99592",
        400: "#e2726e",
        500: "#db4f4a",
        600: "#af3f3b",
        700: "#832f2c",
        800: "#58201e",
        900: "#2c100f",
      },
      blueAccent: {
        100: "#d8dfeb",
        200: "#b1c0d7",
        300: "#8ba0c3",
        400: "#6481af",
        500: "#3d619b",
        600: "#314e7c",
        700: "#253a5d",
        800: "#18273e",
        900: "#0c131f",
      },
      low: { 1: "#15AE52" },
      medium: { 1: "#F9AB3E" },
      high: { 1: "#F37373" },
      critical: { 1: "#E04F5F" },
    }
    : {
      textPrimary: {
        900: "#FFFFFC",
        800: "#e9e9eb",
        700: "#7f8b8f",
        600: "#55646a",
        500: "#2a3d45",
        400: "#223137",
        300: "#192529",
        200: "#11181c",
        100: "#080c0e",
      },
      grey: {
        100: "#181d27",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        1: "#667eea",
        2: "#764ba2",
        100: "#fcfcfc",
        200: "#faf9f9",
        300: "#f7f6f6",
        400: "#f5f3f3",
        500: "#f2f0f0",
        600: "#c2c0c0",
        700: "#919090",
        800: "#616060",
        900: "#303030",
      },
      greenAccent: {
        900: "#dceae3",
        800: "#b9d6c7",
        700: "#97c1aa",
        600: "#74ad8e",
        500: "#519872",
        400: "#417a5b",
        300: "#315b44",
        200: "#203d2e",
        100: "#101e17",
      },
      redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
      },
      blueAccent: {
        900: "#F8F7FE",
        800: "#b1c0d7",
        700: "#8ba0c3",
        600: "#6481af",
        500: "#3d619b",
        400: "#314e7c",
        300: "#253a5d",
        200: "#18273e",
        100: "#0c131f",
      },
      low: { 1: "#15AE52" },
      medium: { 1: "#F9AB3E" },
      high: { 1: "#F37373" },
      critical: { 1: "#E04F5F" },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[900],
          },
          text: {
            primary: colors.textPrimary[100],
            secondary: colors.textPrimary[700],
            fontFamily:  ["Mada", "sans-serif"].join(","),
          },
          background: {
            default: colors.grey[900],
          },
          
        }
        : {
          primary: {
            main: colors.primary[1],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          text: {
            primary: colors.textPrimary[100],
            secondary: colors.textPrimary[300],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 300,
      h1: {
        fontFamily: ["Overpass", "sans-serif"].join(","),
        fontSize: 50,
        fontWeight: 600,
        color: colors.blueAccent[400],
      },
      h2: {
        fontFamily: ["Overpass", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 600,
        color: colors.blueAccent[400],
      },
      h3: {
        fontFamily: ["Prompt", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Mada", "sans-serif"].join(","),
        fontSize: 20,
        color: colors.textPrimary[100],
      },
      h5: {
        fontFamily: ["Mada", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 600,
        color: colors.textPrimary[100],
      },
      h6: {
        fontFamily: ["Mada", "sans-serif"].join(","),
        fontSize: 14,
        color: colors.textPrimary[100],
      },
      body1: {
        fontFamily: ["Prompt", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
        color: colors.textPrimary[200],
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none",
            fontFamily: "Mada, sans-serif",
          },
          cell: {
            borderBottom: "none",
          },
          columnHeaderTitle: {
            fontWeight: 700,
            overflow: "visible",
          },
          columnHeaders: {
            backgroundColor: colors.primary[400],
            borderColor: colors.textPrimary[800],
          },
          virtualScroller: {
            backgroundColor: colors.primary[400],
          },
          footerContainer: {
            borderColor: colors.textPrimary[800],
            backgroundColor: colors.primary[400],
          },
          checkbox: {
            color: `${colors.greenAccent[200]} !important`,
          },
          toolbarContainer: {
            '& button': {
              color: colors.textPrimary[200],
              fontFamily: "Mada, sans-serif",
            },
          },
        },
      },
    },
  };
};

//context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const storedMode = localStorage.getItem("mode");
  const [mode, setMode] = useState(storedMode || "light");

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    // Update the mode in localStorage whenever it changes
    localStorage.setItem("mode", mode);
  }, [mode]);

  return [theme, colorMode];
};

// ==========================================
//  Author: Khushalkumar Gondaliya, Bansari Shah
// ==========================================

import { createTheme } from "@mui/material/styles";

export const tokens = () => ({
  primary: {
    100: "#fefefe",
    200: "#fcfdfd",
    300: "#fbfbfc",
    400: "#f9fafb",
    500: "#f8f9fa",
    600: "#c6c7c8",
    700: "#959596",
    800: "#636464",
    900: "#323232",
  },
  black: {
    100: "#504e4e",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
});

export const themeSettings = () => {
  const colors = tokens();
  return {
    palette: {
      primary: {
        main: colors.primary[500],
      },
      secondary: {
        light: colors.primary[100],
        dark: colors.primary[600],
        main: colors.primary[200],
      },
      neutral: {
        main: colors.black[500],
      },
      background: {
        default: colors.primary[500],
      },
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const useMode = () => {
  const theme = () => createTheme(themeSettings());
  return theme;
};

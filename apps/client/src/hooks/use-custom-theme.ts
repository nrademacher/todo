import {
  createTheme,
  type Palette,
  type Theme,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";

declare module "@mui/material/styles" {
  export interface Theme {
    palette: Palette & {
      background: TypeBackground & {
        secondary: string;
        navbar?: string;
        input: string;
      };
      border: {
        tertiary: string;
      };
    };
  }
  export interface TypeBackground {
    secondary?: string;
    navbar?: string;
    input?: string;
  }
  export interface PaletteOptions {
    border?: {
      tertiary?: string;
    };
  }
}

export function useCustomTheme(): Theme {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          background: {
            secondary: prefersDarkMode
              ? "hsl(0, 0%, 9%)"
              : "hsl(205, 87%, 99%)",
            navbar: prefersDarkMode ? "hsl(0, 0%, 9%)" : "#fff",
            input: prefersDarkMode ? "hsl(0, 0%, 14%)" : "#fff",
          },
          border: {
            tertiary: prefersDarkMode
              ? "hsl(0, 0%, 21%)"
              : "hsl(207, 90%, 90%)",
          },
        },
      }),
    [prefersDarkMode]
  );

  return theme;
}

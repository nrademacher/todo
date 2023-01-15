import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lazy, Suspense, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { ProtectedRoute } from "./components";

const Home = lazy(async () => await import("./pages/Home"));
const SignIn = lazy(async () => await import("./pages/SignIn"));
const SignUp = lazy(async () => await import("./pages/SignUp"));

const queryClient = new QueryClient();

export function App(): JSX.Element {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "grid",
                  placeContent: "center",
                  minHeight: "100vh",
                  minWidth: "100vw",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

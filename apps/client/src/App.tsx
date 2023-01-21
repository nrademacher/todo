import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCustomTheme } from "./hooks";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar, PageLoadingSpinner, ProtectedRoute } from "./components";

const Home = lazy(async () => await import("./pages/Home"));
const SignIn = lazy(async () => await import("./pages/SignIn"));
const SignUp = lazy(async () => await import("./pages/SignUp"));

const queryClient = new QueryClient();

export function App(): JSX.Element {
  const customTheme = useCustomTheme();

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<PageLoadingSpinner />}>
          <BrowserRouter>
            <NavBar />
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
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

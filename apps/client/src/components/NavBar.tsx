import { useAuth, useCurrentUser } from "../hooks";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { PageRoutes } from "../constants";
import { Home, Logout } from "@mui/icons-material";

export const NavBar: React.FC = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useCurrentUser();

  const theme = useTheme();

  if (!isSignedIn || !user) {
    return null;
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        px: 2,
        bgcolor: "background.navbar",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
        <Stack direction="row" spacing={4}>
          <Box sx={{ fontSize: "2em" }}>☑️</Box>
          <Stack direction="row" spacing={4} alignItems="center">
            <RouterLink to={PageRoutes.Home} style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center">
                <Button
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                  startIcon={
                    <Home sx={{ color: theme.palette.text.secondary }} />
                  }
                >
                  Home
                </Button>
              </Stack>
            </RouterLink>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={4} alignItems="baseline">
          <Box>
            Welcome, <span style={{ fontWeight: "bold" }}>{user.username}</span>
          </Box>
          <Button
            size="small"
            onClick={() => signOut()}
            sx={{
              color: theme.palette.text.secondary,
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Sign out
          </Button>
        </Stack>
        <IconButton
          onClick={() => signOut()}
          sx={{
            color: theme.palette.text.secondary,
            display: { xs: "inline-block", md: "none" },
          }}
        >
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

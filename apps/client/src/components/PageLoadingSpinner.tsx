import { Box, CircularProgress } from "@mui/material";

export const PageLoadingSpinner: React.FC = () => (
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
);

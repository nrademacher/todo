import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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

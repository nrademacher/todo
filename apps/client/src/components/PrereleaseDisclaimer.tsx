import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const PrereleaseDisclaimer: React.FC = () => (
  <Alert severity="warning">
    <AlertTitle>Disclaimer</AlertTitle>
    This is an early pre-release version of Todo. Fundamental changes and loss
    of user data may occur at any time without notice.
  </Alert>
);

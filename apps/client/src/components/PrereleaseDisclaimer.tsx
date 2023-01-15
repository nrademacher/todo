import { Alert, AlertTitle } from "@mui/material";
import { APP_NAME } from "../constants";

export const PrereleaseDisclaimer: React.FC = () => (
  <Alert severity="warning" variant="outlined">
    <AlertTitle>Disclaimer</AlertTitle>
    This is an early pre-release version of {APP_NAME}. Fundamental changes and
    loss of user data may occur at any time without notice.
  </Alert>
);

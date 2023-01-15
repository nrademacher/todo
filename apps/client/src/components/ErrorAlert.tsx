import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface IErrorAlert {
  message: {
    title: string;
    description: string;
  };
}

export const ErrorAlert: React.FC<IErrorAlert> = ({ message }) => (
  <Alert severity="error" variant="outlined" sx={{ width: "100%" }}>
    <AlertTitle>{message.title}</AlertTitle>
    {message.description}
  </Alert>
);

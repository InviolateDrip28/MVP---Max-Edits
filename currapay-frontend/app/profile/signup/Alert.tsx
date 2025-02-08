import { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { forwardRef } from "react";

export interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return (
      <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    );
  }
);

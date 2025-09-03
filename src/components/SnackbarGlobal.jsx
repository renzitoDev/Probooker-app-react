import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Props:
// open (bool) - si se muestra el snackbar
// message (string) - texto a mostrar
// severity ('success' | 'error' | 'warning' | 'info')
// onClose (func) - función para cerrar
export default function SnackbarGlobal({ open, message, severity = "success", onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }} elevation={6} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

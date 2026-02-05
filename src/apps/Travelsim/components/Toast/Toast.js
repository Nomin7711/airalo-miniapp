import { colors } from "@constants/colors";
import { Alert, Snackbar } from "@mui/material";
import { travelsimSelectors } from "@travelsim/redux/slices/mainSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Toast = ({ alert }) => {
  const { toast } = useSelector(travelsimSelectors.getMain);

  const { type = "success", message = "" } = toast || {};

  const dispatch = useDispatch();

  return (
    <Snackbar
      open={!!toast}
      autoHideDuration={2000}
      // onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        top: "max(env(safe-area-inset-top), 20px)",
      }}
    >
      <Alert
        severity={type}
        sx={{
          width: "100%",
          "&.MuiAlert-standard": {
            borderRadius: "16px",
            boxShadow:
              "0px 4px 20px 3px rgba(0, 0, 0, 0.15), 0px 1px 20px rgba(0, 0, 0, 0.3)",
          },
          "&.MuiAlert-standardWarning": { backgroundColor: colors.yellow },
          "&.MuiAlert-standardSuccess": { backgroundColor: "#6BBE00" },
          "&.MuiAlert-standardError": { backgroundColor: "#F7003A" },
          ".MuiAlert-message": { color: colors.black0, fontSize: 14 },
          ".MuiAlert-icon": { color: colors.black0 },
          ".MuiAlert-action": { color: colors.black0 },
        }}
        // onClose={handleClose}
      >
        {alert}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

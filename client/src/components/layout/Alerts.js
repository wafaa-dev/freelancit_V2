import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Alerts = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Box key={alert.id} mt="10px" width="300px" mx="auto">
        <Alert variant="filled" severity={alert.alertType}>
          {alert.msg}
        </Alert>
      </Box>
    ))
  );
};

export default Alerts;

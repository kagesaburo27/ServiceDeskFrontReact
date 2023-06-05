import { Box, Typography } from "@mui/material";
import ReadmeComponent from "./ReadmeComponent ";

const API = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box m="100px" width="60%" flexDirection="column">
        <Typography variant="h2">API Reference</Typography>
        <Typography variant="body1">
          Welcome to the API Reference documentation for our API. Here you will
          find all the information you need to integrate and utilize our API in
          your applications.
        </Typography>
        <ReadmeComponent />
      </Box>
    </Box>
  );
};

export default API;

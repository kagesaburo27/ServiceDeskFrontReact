import { Box, Typography } from "@mui/material";
import ReadmeComponent from "./ReadmeComponent ";

const API = () => {
  return (
    <Box
      display="flex"
      width="100%"
      alignItems="center"
      justifyContent="center"
      
    >
      <Box m="100px"maxWidth="70vw">
        <Typography variant="h2">API Reference</Typography>
        <Typography variant="body1">
          Welcome to the API Reference documentation for our API. Here you will
          find all the information you need to integrate and utilize our API in
          your applications.
        </Typography>
        <Box >
          <ReadmeComponent />
        </Box>
      </Box>
    </Box>
  );
};

export default API;

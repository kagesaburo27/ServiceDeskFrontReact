import { Box,Typography } from "@mui/material";


const API = () => {
    return (
        <Box m="20px" display="flex" alignItems="center" flexDirection="column">
          <Typography variant="h2">API Reference</Typography>
          <Typography variant="body1">
            Welcome to the API Reference documentation for our API. Here you will
            find all the information you need to integrate and utilize our API in
            your applications.
          </Typography>
          <iframe src="https://docs.google.com/document/d/11AHn2CGNhOfXNzusDRSetK9ep02Mog8Vmmt_zH2FxY8/preview"
        width="40%"
        height="800px"
        title="API Documentation"></iframe>
          {/* Add more API documentation content here */}
        </Box>
      );
}

export default API;
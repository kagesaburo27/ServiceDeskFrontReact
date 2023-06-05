import { Box, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import gfm from "remark-gfm";

const ReadmeComponent = () => {
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/saylord/service-desk/master/README.md"
        );
        setReadmeContent(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching README:", error);
      }
    };

    fetchReadme();
  }, []);

  return (
    <Box >
      <ReactMarkdown remarkPlugins={[gfm]}>{readmeContent}</ReactMarkdown>
    </Box>
  );
};
export default ReadmeComponent;

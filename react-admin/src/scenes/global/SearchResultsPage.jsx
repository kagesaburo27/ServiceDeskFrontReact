import { useTheme } from "@emotion/react";
import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { tokens } from "../../theme";

const SearchResultsPage = () => {
  const location = useLocation();
  const { query } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (location.state?.searchResults) {
      setSearchResults(location.state.searchResults);
    }
  }, [location.state]);

  const renderResultsByType = () => {
    const resultsByType = {};

    // Group results by type
    searchResults.forEach((result) => {
      if (!resultsByType[result.type]) {
        resultsByType[result.type] = [];
      }
      resultsByType[result.type].push(result);
    });

    // Render results by type
    return Object.entries(resultsByType).map(([type, results]) => (
      <div key={type}>
        <Typography variant="h5">{type}</Typography>
        {results.map((result) => (
          <Link
            key={`${type}-${result.id}`}
            to={getTypeLink(type, result.id)}
            style={{ textDecoration: "none" }}
          >
            <Card
              key={`${type}-${result.id}`}
              sx={{
                borderRadius:"20px",
                padding: "20px",
                marginBottom: "20px",
                ":hover": {
                  backgroundColor: colors.primary[200],
                },
              }}
            >
              <Typography variant="h4">{result.name}</Typography>
            </Card>
          </Link>
        ))}
      </div>
    ));
  };
  const getTypeLink = (type, id) => {
    if (type === "task" || type === "tag") {
      return `/issue/${id}`;
    } else if (type === "user") {
      return `/user/${id}`;
    }
    else if (type === "project") {
      return `/project/${id}`;
    }
    return "/";
  };
  return <Box m="40px"><Typography variant="h2">Search results: {query}</Typography>{renderResultsByType()}</Box>;
};

export default SearchResultsPage;

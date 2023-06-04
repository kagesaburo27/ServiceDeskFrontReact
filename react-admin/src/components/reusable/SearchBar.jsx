import React from "react";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const SearchBar = ({ placeholder, value, onChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      backgroundColor={colors.primary[400]}
      borderRadius="3px"
      mr="10px"
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;

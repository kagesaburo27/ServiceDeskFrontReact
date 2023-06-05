import { Box, IconButton, MenuItem, Select, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcons from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcons from "@mui/icons-material/DarkModeOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { axiosPrivate } from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    i18n
      .changeLanguage(newLanguage)
      .then(() => {})
      .catch((error) => {
        console.error("Failed to change language:", error);
      });
  };
  useEffect(() => {
    if (location.state?.searchResults) {
      // Search results are available
      const { searchResults } = location.state;
      // Do something with the searchResults
      console.log(searchResults);
    }
  }, [location.state]);
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // Empty search query, do nothing
      return;
    }
    try {
      const response = await axiosPrivate.get(`/statistics/search?query=${searchQuery}`);
      const searchResults = response.data;

      navigate(`/search-results/${searchQuery}`, { state: { searchResults } });
    } catch (error) {
      console.error("Failed to perform search:", error);
    }
  };

  const handleSubmit = async () => {
    const response = await axiosPrivate.post("/auth/signout", {});
    console.log(response?.data);
    navigate("/login", { state: { from: location }, replace: true });
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        backgroundImage: [
          "linear-gradient(135deg,",
          colors.primary[1],
          " 0%,",
          colors.primary[2],
          " 100%)",
        ].join(" "),
      }}
    >
      {/* {SearchBar} */}
      <Box
        display="flex"
        backgroundColor={colors.primary[500]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={t("navbar.search")}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <IconButton onClick={handleSearch} type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* {Icons} */}
      <Box display="flex">
      
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          sx={{ ml: 2, mr: 2 }}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="ru">RU</MenuItem>
          <MenuItem value="kz">KZ</MenuItem>
        </Select>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcons />
          ) : (
            <LightModeOutlinedIcons />
          )}
        </IconButton>
        <IconButton onClick={handleSubmit}>
          <ExitToAppOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Navbar;

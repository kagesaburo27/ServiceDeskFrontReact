import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box mb="30px">
      <Typography
        variant="h4"
        color={colors.textPrimary[200]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
       variant="h5"
       color={colors.textPrimary[100]}
       fontWeight="normal"
       sx={{ mb: "5px" }}>
        {subtitle}
       </Typography>

    </Box>
  );
};
export default Header;

import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from '@mui/material/AccordionSummary';
import {AccordionDetails} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m='20px'>
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Typography color={colors.greenAccent[500]} variant="h5">
          An Important Question 1
        </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione,
            dolor eveniet quisquam ab nobis nulla repudiandae architecto tenetur
            qui beatae consequuntur, accusamus necessitatibus magni vero ea sed,
            labore consequatur tempora.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Typography color={colors.greenAccent[500]} variant="h5">
          An Important Question 2
        </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione,
            dolor eveniet quisquam ab nobis nulla repudiandae architecto tenetur
            qui beatae consequuntur, accusamus necessitatibus magni vero ea sed,
            labore consequatur tempora.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Typography color={colors.greenAccent[500]} variant="h5">
          An Important Question 3
        </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione,
            dolor eveniet quisquam ab nobis nulla repudiandae architecto tenetur
            qui beatae consequuntur, accusamus necessitatibus magni vero ea sed,
            labore consequatur tempora.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default FAQ;

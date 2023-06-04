import { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { axiosPrivate } from "../../api/axios";
import useDataFetching from "../../hooks/useDataFetching";
import { CURRENT_USER_URL, TASKS_URL } from "../../api/apiUrls";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/reusable/loading/Loading";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: currentUser, isLoading: isUserLoading } =
  useDataFetching(CURRENT_USER_URL); // Assuming the currently logged-in user is available

  const [currentEvents, setCurrentEvents] = useState([]);
  const { data: deadlines, isLoading: isLoading } = useDataFetching(`assignee/assignedtasks/${currentUser.id}`);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (deadlines.length > 0) {
      const formattedEvents = deadlines.map((task) => ({
        id: task.taskId,
        title: task.title,
        start: moment(task.deadline).format("YYYY-MM-DD"),
      }));
      setFormattedEvents(formattedEvents);
    }
  }, [deadlines]);
  useEffect(() => {
    if (deadlines.length > 0) {
      const formattedEvents = deadlines.map((task) => ({
        id: task.taskId,
        title: task.title,
        start: moment(task.deadline).format("YYYY-MM-DD"),
      }));
      setCurrentEvents(formattedEvents);
    }
    console.log(currentEvents);
  }, [deadlines]);

  const handleEventClick = (selected) => {
    navigate(`/issue/${selected.event.id}`);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.blueAccent[800],
                  margin: "10px 0",
                  borderRadius: "10px",
                }}
              >
                <ListItemText
                  color={colors.primary[100]}
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(
                        new Date(moment(event.start).format("YYYY-MM-DD")),
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "today prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            events={formattedEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;

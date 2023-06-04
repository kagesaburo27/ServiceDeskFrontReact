import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Paper,
  Grid,
  Select,
} from "@mui/material";

import { useForm } from "react-hook-form";
import useDataFetching from "../../hooks/useDataFetching";
import axiosPrivate from "../../api/axios";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import { CURRENT_USER_URL } from "../../api/apiUrls";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Link, Outlet } from "react-router-dom";
import Statistics from "../statistics";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: currentUser, isLoading: isCurrentUser } =
    useDataFetching(CURRENT_USER_URL);

  const [recentTasks, setRecentTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    const fetchRecentTasks = async () => {
      if (currentUser?.id) {
        try {
          const response = await axiosPrivate.get(
            `/assignee/assignedtasks/${currentUser.id}`
          );
          const sortedTasks = response.data.sort((a, b) =>
            a.deadline.localeCompare(b.deadline)
          );
          setRecentTasks(sortedTasks);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchRecentTasks();
  }, [currentUser]);

  const handleFilterChange = (event) => {
    setFilterPriority(event.target.value);
  };

  const getTaskTypeIcon = (type, priority) => {
    let icon = null;
    let color = "";

    if (priority === "LOW") {
      color = "success";
    } else if (priority === "MEDIUM") {
      color = "warning";
    } else if (priority === "HIGH") {
      color = "error";
    } else if (priority === "BLOCKER") {
      color = "default";
    }

    if (type === "QUESTION") {
      icon = <QuestionMarkRoundedIcon color={color} />;
    } else if (type === "TASK") {
      icon = <TaskAltRoundedIcon color={color} />;
    } else if (type === "BUG") {
      icon = <BugReportRoundedIcon color={color} />;
    }

    return <Box padding={2}>{icon}</Box>;
  };

  const filteredTasks = filterPriority
    ? recentTasks.filter((task) => task.taskPriority.name === filterPriority)
    : recentTasks;

  return (
    <Box backgroundColor={colors.blueAccent[900]} padding="30px" m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
        width="50vw"
      >
        <Typography variant="h4">Recent Incidents</Typography>
      </Box>
      <Stack width="50vw" sx={{ backgroundColor: colors }} spacing={2}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Link to={`/issue/${task.taskId}`}>
              <Box
                key={task.taskId}
                borderRadius="10px"
                backgroundColor={colors.primary[500]}
                display="flex"
                marginBottom="10px"
                padding="10px"
              >
                <Grid container spacing={2}>
                  <Grid item alignItems="center" display="flex">
                    {getTaskTypeIcon(
                      task.taskType.name,
                      task.taskPriority.name
                    )}
                  </Grid>
                  <Grid item>
                    <Box>
                      <Typography variant="body1">{task.title}</Typography>
                      <Box display="flex" flexWrap="wrap" marginTop="10px">
                        <Chip label={task.project.title} />
                        {task.taskTags &&
                          task.taskTags.map((tag) => {
                            <Chip label={tag} />;
                          })}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Typography>Due: {task.deadline}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Link>
          ))
        ) : (
          <Typography variant="body1">No recent incidents found.</Typography>
        )}
      </Stack>
      <Statistics />
    </Box>
  );
};

export default Dashboard;

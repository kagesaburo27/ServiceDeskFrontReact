import React from "react";
import { Box, Typography, Paper, Grid, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const SprintTimeline = ({ sprint }) => {
  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit sprint:", sprint.title);
  };

  const handleDelete = () => {
    // Handle delete functionality
    console.log("Delete sprint:", sprint.title);
  };

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{sprint.title}</Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleEdit} size="small">
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} size="small">
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">
            Start Date: {sprint.startDate}
          </Typography>
          <Typography variant="body1">End Date: {sprint.endDate}</Typography>
        </Box>
        <Box mt={3}>
          <Typography variant="h6">Tasks:</Typography>
          {sprint.tasks.map((task) => (
            <Grid container key={task.id} alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2">{task.title}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" align="right">
                  {task.status}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default SprintTimeline;

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TaskCard = ({ task }) => {
  const { title, assignedTo, estimatedEffort, status } = task;

  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit task:", task);
  };

  const handleDelete = () => {
    // Handle delete functionality
    console.log("Delete task:", task);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <Box display="flex" alignItems="center">
            <Chip label={status} />
            <IconButton onClick={handleEdit} size="small">
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} size="small">
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="body2">Assigned To: {assignedTo}</Typography>
          <Typography variant="body2">Estimated Effort: {estimatedEffort}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

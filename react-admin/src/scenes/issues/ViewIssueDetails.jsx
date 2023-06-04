import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import useDataFetching from "../../hooks/useDataFetching";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Skeleton } from "@mui/material";
import {
  Box,
  Typography,
  Grid,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import { CURRENT_USER_URL } from "../../api/apiUrls";
import CustomChip from "../../components/reusable/CustomChip";
import axiosPrivate from "../../api/axios";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const ViewIssueDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  // State for the alert
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setShowAlert(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  // State for storing the selected assignee ID
  const [selectedAssigneeId, setSelectedAssigneeId] = useState(null);
  const whiteBoxStyle = {
    padding: "20px 30px",
    display: "flex",
    marginBottom: "40px",
    borderRadius: "20px",
    backgroundColor: colors.primary[100],
    border: `1px solid ${colors.primary[600]}`,
    justifyContent: "space-between",
  };
  const listStyle = {
    padding: "20px 30px",
    margin: "0 0 30px 0",
    borderRadius: "20px",
    backgroundColor: colors.primary[100],
    border: `1px solid ${colors.primary[600]}`,
    justifyContent: "space-between",
    maxWidth: "30vw",
    minWidth: "15vw",
  };
  const handleTaskDelete = () => {
    setOpenDialog(true);
  };
  const handleTaskDeleteConfirm = async () => {
    // Call the API to delete the assignee

    try {
      const response = await axiosPrivate.delete(`/task/${id}`);
      // Close the dialog and show the success alert
      navigate("/issues");
    } catch (err) {
      console.log(err);
    }
    setOpenDialog(false);
    setShowAlert(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleAssigneeClick = useCallback((assigneeId) => {
    navigate(`/user/${assigneeId}`);
  }, navigate);

  const { data: issue, isLoading: isTaskLoading } = useDataFetching(
    `/task/${id}`
  );
  const { data: assignedUsers, isLoading: areUsersLoading } = useDataFetching(
    `/assignee/assignedusers/${id}`
  );

  const { data: currentUser, isLoading: isUserLoading } =
    useDataFetching(CURRENT_USER_URL); // Assuming the currently logged-in user is available

  const isAuthor = currentUser.id && currentUser.id === issue.author?.id;
  const isAssignee =
    currentUser?.id &&
    assignedUsers.some((assignee) => assignee.id === currentUser?.id);
  console.log(isAuthor, isAssignee);
  return isTaskLoading ? (
    <Skeleton />
  ) : (
    <Box m="50px" p="20px" borderRadius="20px" bgcolor={colors.blueAccent[900]}>
      <Box style={whiteBoxStyle}>
        <Box>
          <Box display="flex">
            <Typography variant="h2">{issue?.title}</Typography>
            {issue?.taskTags?.map((tag) => (
              <Chip label={tag} />
            ))}
          </Box>
          <Box width="300px" display="flex" justifyContent="space-between">
            <CustomChip label={issue?.taskType?.name} borderRadius="4px" />

            <CustomChip label={issue?.taskStatus?.name} type="status" />

            <CustomChip
              label={issue?.taskPriority?.name}
              borderRadius="4px"
              type="priority"
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Box>
              <Typography variant="subtitle1">Created on:</Typography>
              <Typography variant="h5">{issue?.createdDate}</Typography>
            </Box>
            {issue?.updatedDate ? (
              <Box>
                <Typography variant="subtitle1">Last updated on:</Typography>
                <Typography variant="h5">{issue?.updatedDate}</Typography>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Box>
        {(isAuthor || isAssignee) && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="outlined"
              component={Link}
              sx={{
                width: "150px",
                borderRadius: "10px",
                borderColor: colors.blueAccent[400],
              }}
              to={`/issue/${id}/edit`}
            >
              Edit
            </Button>
            {isAuthor && (
              <IconButton onClick={() => handleTaskDelete(id)} type="button">
                <DeleteRoundedIcon />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
      <Box width="100%" display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5">Task Details</Typography>
          <Box>
            {!issue?.description ? (
              <Typography variant="body1">There is description</Typography>
            ) : (
              <ReactQuill
                theme="snow"
                name="description"
                value={issue?.description}
                readOnly
                className="quill-editor"
                modules={{ toolbar: false }}
              />
            )}
          </Box>
        </Box>
        <Box direction="column" justifyContent="flex-start" alignItems="center">
          <Box style={listStyle}>
            <Typography variant="body2">Author: </Typography>
            <Typography variant="h5">
              {`${issue?.author?.firstName} ${issue?.author?.lastName}`}
            </Typography>

            <Typography variant="body2">Email: </Typography>
            <Typography variant="h5">{issue?.author?.email}</Typography>

            <Typography variant="body2">Assignee: </Typography>

            {assignedUsers.map((assignee) =>
              isAuthor ? (
                <Chip
                  label={assignee?.username}
                  // onClick={handleAssigneeClick(assignee.id)}
                  // onDelete={handleAssigneeDelete(assignee.id)}
                />
              ) : (
                <Chip
                  label={assignee?.username}
                  // onClick={handleAssigneeClick(assignee.id)}
                />
              )
            )}

            <Typography variant="body2">Email: </Typography>
            <Typography variant="h5">{issue?.author?.email}</Typography>
          </Box>

          <Grid
            style={listStyle}
            borderRadius="5%"
            bgcolor={colors.grey[900]}
            item
            p={3}
          >
            <ListItem disableGutters>
              <Typography variant="body2">Project: </Typography>
              <Typography variant="h5">{issue?.project?.title}</Typography>
            </ListItem>

            <ListItem disableGutters>
              <Typography variant="body2">Sprint: </Typography>
              <Typography variant="h5">{issue?.sprint?.name}</Typography>
            </ListItem>
          </Grid>
        </Box>
      </Box>

      <Link to="/issues">Back to Issues</Link>
      {/* Delete Assignee Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <p>Delete this task?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleTaskDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Success Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        action={action}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully deleted task.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ViewIssueDetails;

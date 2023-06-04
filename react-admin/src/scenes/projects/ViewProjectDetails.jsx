import React, { useEffect, useCallback, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import useDataFetching from "../../hooks/useDataFetching";
import ReactQuill from "react-quill";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosPrivate } from "../../api/axios";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "react-quill/dist/quill.snow.css";
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
import SelectForm from "../../components/reusable/SelectForm";
import CloseIcon from "@mui/icons-material/Close";
import {
  fetchProjects,
  setLoading,

} from "../../redux/actions/projectsActions";

const ViewProjectDetails = () => {
  const [openDialog, setOpenDialog] = useState(false);
  // State for the alert
  const [showAlert, setShowAlert] = useState(false);
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setShowAlert(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  const sprints = [
    {
      id: 1,
      title: "Sprint 1",
      startDate: "2023-05-01",
      endDate: "2023-05-15",
      goal: "Complete user authentication",
      tasks: [
        {
          id: 1,
          title: "Implement login functionality",
          status: "In Progress",
        },
        { id: 2, title: "Create registration form", status: "To Do" },
        { id: 3, title: "Design user profile page", status: "Completed" },
      ],
    },
    // Add more sprints as needed
  ];
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const isLoading = useSelector((state) => state.projects.isLoading);


  const handleUserChange = (event) => {
    const selectedUserIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedUsers(selectedUserIds);
  };
  
  const { data: notTeamMembers, isLoading: areNotUsersLoading } =
    useDataFetching(`/userproject/projectnot/${id}`);
  const { data: project, isLoading: isTaskLoading } = useDataFetching(
    `/project/${id}`
  );
  const { data: teamMembers, isLoading: areUsersLoading } = useDataFetching(
    `/userproject/project/${id}`
  );
  const handleProjectDelete = () => {
    setOpenDialog(true);
  };
  const handleProjectDeleteConfirm = async () => {
    // Call the API to delete the assignee
    const projectId = { id };
    try {
      const response = await axiosPrivate.delete(`/project/${id}`);
      // Close the dialog and show the success alert
      navigate("/projects")
    } catch (err) {
      console.log(err);
    }
    setOpenDialog(false);
    setShowAlert(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({});

  const { data: currentUser, isLoading: isUserLoading } =
    useDataFetching(CURRENT_USER_URL); // Assuming the currently logged-in user is available

  const isAuthor =
  (currentUser?.id && currentUser.id === project?.admin?.id) ||
  (currentUser?.roles && currentUser.roles.some(role => role.name === "SUPERADMIN"));

  console.log(currentUser?.roles);
  console.log(isAuthor);
  const onSubmit = async (values) => {
    const updatedValues = {
      projectId: id,
      userId: values.userId,
    };

    console.log(values);
    try {
      const response = await axiosPrivate.post(
        "/userproject/create",
        updatedValues
      );

      console.log(values);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);




  return (
    <Box m="50px">
      <Box
        p={4}
        display="flex"
        borderRadius="20px"
        bgcolor={colors.blueAccent[900]}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h2">{project.title}</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Box>
              <Typography variant="subtitle1">Created on:</Typography>
              <Typography variant="h5">{project?.createdDate}</Typography>
            </Box>
          </Box>
        </Box>
        {isAuthor && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              sx={{ width: "150px" }}
              to={`/project/${id}/edit`}
            >
              Edit
            </Button>
            <IconButton onClick={() => handleProjectDelete(id)} type="button">
              <DeleteRoundedIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Typography margin={2} variant="h5">
        Team members:{" "}
      </Typography>
      <Box display="flex">
        {teamMembers.map((assignee) => (
          <Chip label={assignee?.username} sx={{ margin: "0 10px" }} />
        ))}
      </Box>
      <Grid p={4} container spacing={4} marginTop={2}>
        <Typography variant="h5">Project Details</Typography>
        <Grid item xs={9} display="flex" justifyContent="center">
          <Box width="70%">
            <ReactQuill
              theme="snow"
              name="description"
              value={project?.description}
              readOnly
              className="quill-editor"
              modules={{ toolbar: false }}
            />
          </Box>
        </Grid>
        <ListItem>
          {isAuthor && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <SelectForm
                id="userId"
                defaultValue={selectedUsers}
                {...register("userId", { required: true })}
                multiple
                label="Team members"
                itemName="username"
                itemId="id"
                control={control}
                data={notTeamMembers}
                isLoading={areNotUsersLoading}
              />

              <Button
                sx={{
                  width: "100%",
                }}
                size="large"
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </form>
          )}
        </ListItem>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete project</DialogTitle>
        <DialogContent>
          <p>Delete this project?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleProjectDeleteConfirm}>Delete</Button>
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
          Successfully deleted the project.
        </Alert>
      </Snackbar>
      <Link to="/projects">Back to Projects</Link>
    </Box>
  );
};

export default ViewProjectDetails;

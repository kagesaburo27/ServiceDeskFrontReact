import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import React, { useCallback, useState, useTransition } from "react";
import { useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "../../api/axios";
import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from "../../data/dataTypes";
import SelectForm from "../../components/reusable/SelectForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Grid, useTheme } from "@mui/material";
import moment from "moment";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormInput from "../../components/reusable/FormInput";
import Loading from "../../components/reusable/loading/Loading";
import useDataFetching from "../../hooks/useDataFetching";
import { PROJECTS_URL } from "../../api/apiUrls";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import DateInput from "../../components/reusable/DateInput";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssue } from '../../redux/actions/issueActions';

import { tokens } from "../../theme";
import Header from "../../components/Header";
import QuillEditor from "../../components/reusable/QuillEditor";

import { useTranslation } from "react-i18next";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const EditIssue = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState();
  const dispatch = useDispatch();
  const info = useSelector((state) => state.issue.issue);

  useEffect(() => {
    dispatch(fetchIssue(id));
  }, [dispatch, id]);
  const { data: assignedUsers, isLoading: areUsersLoading } = useDataFetching(
    `/assignee/assignedusers/${id}`
  );
  const { data: projects, isLoading: isProjectLoading } =
    useDataFetching(PROJECTS_URL);
  const { data: projectMembers, isLoading: areMembersLoading } =
    useDataFetching(`/userproject/project/${info?.projectId}`);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const taskDetails = {
    taskId: info?.taskId || "",
    taskType: info && info?.taskType ? info.taskType.name : "",
    title: info?.title || "",
    projectId: info?.projectId || "",
    sprintId: info?.sprintId || "",
    description: info?.description || "",
    deadline: info?.deadline
      ? moment(info.deadline, "YYYY/MM/DD HH:mm:ss").toDate()
      : null,
    project: info && info.project ? info.project.title : "",
    taskStatus: info && info.taskStatus ? info.taskStatus.name : "",
    assignee: (assignedUsers && assignedUsers?.map((user) => user.id)) || [],

    taskPriority: info && info.taskPriority ? info.taskPriority.name : "",
  };
  const otherDetails = {
    author: info && info.author ? info.author.username : "",
    authorId: info?.authorId || "",
    createdDate: info && info.createdDate ? info.createdDate : "",
    updatedDate: info?.updatedDate || "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("Title is required")),
    description: Yup.string().required(t("Description is required")),
    deadline: Yup.string().required(t("required")),
    taskStatus: Yup.string(),
    taskPriority: Yup.string(),
    taskType: Yup.string(),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: taskDetails,
  });
  useEffect(() => {
    if (info && projects) {
      setValue("taskId", info.taskId);
      setValue("project", info?.project?.title);
      setValue("title", info?.title);
      setValue("description", info?.description);
      setValue(
        "deadline",
        info?.deadline ? moment(info.deadline, "YYYY/MM/DD HH:mm:ss") : null
      );

      setValue("createdDate", info?.project?.createdDate);
      setValue("taskStatus", info?.taskStatus?.name);
      setValue("taskPriority", info?.taskPriority?.name);
      setValue("taskType", info?.taskType?.name);
      setValue("projectId", info?.projectId);
      setValue("sprintId", info.sprintId);
      setValue("assignees", assignedUsers?.map((user) => user.id) || []);
    }
    // Set default values for other fields
  }, [info, projects, setValue, assignedUsers]);
  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      console.log(values);
      const formattedDeadline = moment(moment(values.deadline)).format(
        "YYYY/MM/DD HH:mm:ss"
      );
      const updatedValues = { ...values, deadline: formattedDeadline };
      // Send the PUT request to the edit API
      const response = await axios.put(`/task/${values.taskId}`, updatedValues);
      const assigneeInfo = {
        taskId: taskDetails.taskId,
        userId: values.assignees,
      };
      const assignees = await axios.post(`/assignee/create/`, assigneeInfo);
      // Handle response data or perform any necessary actions
      console.log(response.data);
      setAlert(t("The task successfully edited"));
      setOpen(true);
    } catch (error) {
      setAlert(error);
    }
  };
  const style = {
    borderRadius: 5,
    boxShadow: 24,
    display: "flex",
    padding: "2%",
    flexDirection: "column",
    backgroundColor: colors.blueAccent[900],
    justifyContent: "center",
    alignItems: "center",
  };
  if ( isProjectLoading || areUsersLoading) {
    return <Loading />;
  }

  if (!info || !projects) {
    return <div>Data not available.</div>;
  }

  return (
    <Box m="20px">
      {info && projects && (
        <Box
          p="20px 30px"
          display="flex"
          backgroundColor={colors.blueAccent[900]}
        >
          <Box display="flex" flexDirection="column">
            <Header
              title={t("Task Editing")}
              subtitle={t("Editing your task")}
            />
            <Link to={-1}>
              <Button
                startIcon={<ArrowBackIosNewRoundedIcon />}
                variant="outlined"
              >
                {t("Go back")}
              </Button>
            </Link>
          </Box>
          <Box style={style}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h5">
                {t("Author")}:{" "}
                <Link to={`/user/${otherDetails?.authorId}`}>
                  {otherDetails.author}
                </Link>
              </Typography>
              <Typography variant="h5">
                {t("Created on")}: {otherDetails.createdDate}
              </Typography>
              {otherDetails.updatedDate ? (
                <Typography variant="h5">
                  {t("Last edited on")}: {otherDetails.updatedDate}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <FormInput
                    label={t("ID")}
                    name="taskId"
                    disabled
                    variant="standard"
                    control={control}
                    {...register("taskId")}
                    defaultValue={taskDetails.taskId}
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormInput
                    name="project"
                    variant="standard"
                    disabled
                    {...register("project")}
                    label={t("Project")}
                    inputRef={register}
                    defaultValue={taskDetails.project.projectId}
                    control={control}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormInput
                    label={t("Title")}
                    error={errors.title?.message}
                    name="title"
                    control={control}
                    {...register("title")}
                    defaultValue={taskDetails.title}
                    inputRef={register}
                  />
                </Grid>

                <Grid item xs={12}>
                  <DateInput
                    label={t("Deadline")}
                    name="deadline"
                    control={control}
                    error={errors.deadline?.message}
                    {...register("deadline")}
                    defaultValue={taskDetails.deadline}
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={4}>
                  <SelectForm
                    id="taskStatus"
                    {...register("taskStatus")}
                    label={t("Task status")}
                    itemName="name"
                    itemId="name"
                    defaultValue={taskDetails.taskStatus}
                    control={control}
                    data={TASK_STATUS}
                  />
                </Grid>
                <Grid item xs={4}>
                  <SelectForm
                    id="taskPriority"
                    {...register("taskPriority")}
                    label={t("Task priority")}
                    itemName="name"
                    itemId="name"
                    control={control}
                    defaultValue={taskDetails.taskPriority}
                    data={TASK_PRIORITY}
                  />
                </Grid>
                <Grid item xs={4}>
                  <SelectForm
                    id="taskType"
                    itemName="name"
                    itemId="name"
                    {...register("taskType")}
                    label={t("Task type")}
                    defaultValue={taskDetails.taskType}
                    control={control}
                    data={TASK_TYPE}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <SelectForm
                  id="assignees"
                  {...register("assignees")}
                  label={t("Assignees")}
                  itemName="username"
                  itemId="id"
                  control={control}
                  defaultValue={taskDetails.assignee}
                  data={projectMembers}
                  multiple
                />
              </Grid>
              <Grid item>
                <ReactQuill
                  theme="snow"
                  name="description"
                  error={errors.description?.message}
                  value={taskDetails?.description}
                  className="quill-editor"
                  onChange={(value) => setValue("description", value)}
                />
                {errors.description && (
                  <Typography variant="body2" color="error">
                    {errors.description.message}
                  </Typography>
                )}
              </Grid>
              <Box display="flex" justifyContent="center" marginTop="20px">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  // disabled={isLoading}
                  // endIcon={isLoading && <Loading size={24} />}
                >
                  {t("Save")}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" action={action}>
          {alert}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditIssue;

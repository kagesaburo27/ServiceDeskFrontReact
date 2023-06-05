import React, { forwardRef } from "react";
import {
  Alert,
  Box,
  Button,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axiosPrivate from "../../api/axios";
import FormInput from "../../components/reusable/FormInput";
import moment from "moment";
import { DateInput } from "../../components/reusable/DateInput";
import SelectForm from "../../components/reusable/SelectForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from "../../data/dataTypes";
import useDataFetching from "../../hooks/useDataFetching";
import { PROJECTS_URL, PROJECT_MEMBERS } from "../../api/apiUrls";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const CREATE_TASK_URL = "/task/create";

const Create = () => {
  const [assignees, setAssignees] = useState([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState();
  const [isAssigneesLoading, setIsAssigneesLoading] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const { data: projects, isLoading: areProjectsLoading } =
    useDataFetching(PROJECTS_URL);
  console.log(projects);
  const taskDetails = {
    title: "",
    projectId: "",
    sprintId: "",
    description: "",
    taskStatus: "",
    taskPriority: "",
    taskType: "",
    tags: "",
    file: null,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    deadline: Yup.string().required("Deadline is required"),
    tags: Yup.string().required("tags are required"),
    taskStatus: Yup.string().required("Task status is required"),
    taskPriority: Yup.string().required("Task priority is required"),
    taskType: Yup.string().required("Task type is required"),
    projectId: Yup.string().required("Project is required"),
    assignee: Yup.array().of(Yup.number().min(1)),
    file: Yup.array().nullable(),
  });
  const { t } = useTranslation();

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: taskDetails,
  });
  const onSubmit = async (values) => {
    const tagsArray = values.tags.split(",").map((tag) => tag.trim());
    console.log(tagsArray);
    const formattedDeadline = moment(moment(values.deadline)).format(
      "YYYY/MM/DD HH:mm:ss"
    );
    const updatedValues = {
      ...values,
      taskTags: tagsArray,
      deadline: formattedDeadline.toString(),
    };
    delete updatedValues.assignees;
    const formData = new FormData();
    for (const key in updatedValues) {
      if (key === "file") {
        const files = Array.from(updatedValues[key]);
        files.forEach((file, index) => {
          formData.append(`file[${index}]`, file);
        });
      } else {
        formData.append(key, updatedValues[key]);
      }
    }
    try {
      const response = await axiosPrivate.post(CREATE_TASK_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const assigneeData = {
        userId: values.assignees,
        taskId: response?.data?.taskId,
      };
      const assigneeResponse = await axiosPrivate.post(
        "/assignee/create",
        assigneeData
      );
      console.log(values);
      setAlert(t("The task successfully created"));
      setOpen(true);
      window.location.reload();
    } catch (error) {
      setAlert(error);
    }
  };
  useEffect(() => {
    // Fetch assignee data when the project ID changes
    const fetchAssignees = async () => {
      if (selectedProjectId) {
        console.log("selected");
        setIsAssigneesLoading(true);
        try {
          const { data } = await axiosPrivate.get(
            `/userproject/project/${selectedProjectId}`
          );
          setAssignees(data);
          setIsAssigneesLoading(false);
        } catch (error) {
          console.error(error);
          setIsAssigneesLoading(false);
        }
      }
    };

    fetchAssignees();
  }, [selectedProjectId]);

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId);
    setValue("projectId", projectId);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "70%",
    minWidth: 600,
    backgroundColor: "white",
    borderRadius: 5,
    boxShadow: 24,
    padding: "2% 5%",
    overflowY: "auto", // Enable scrolling
    maxHeight: "80vh", // Set maximum height for the content
  };

  return (
    <Box style={style}>
      <Typography variant="h2">Create new Issue</Typography>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Title"
            name="title"
            control={control}
            {...register("title")}
            defaultValue={taskDetails.title}
            error={errors.title?.message}
            inputRef={register}
          />
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

          <FormInput
            label="Tags"
            name="tags"
            control={control}
            {...register("tags")}
            defaultValue={taskDetails.tags}
            error={errors.tags?.message}
            inputRef={register}
          />
          <SelectForm
            id="taskStatus"
            {...register("taskStatus")}
            label="Task status"
            itemName="name"
            itemId="name"
            error={errors.taskStatus?.message}
            defaultValue={taskDetails.taskStatus}
            control={control}
            data={TASK_STATUS}
          />

          <SelectForm
            id="taskPriority"
            {...register("taskPriority")}
            label="Task priority"
            itemName="name"
            itemId="name"
            error={errors.taskPriority?.message}
            control={control}
            defaultValue={taskDetails.taskPriority}
            data={TASK_PRIORITY}
          />
          <SelectForm
            id="taskType"
            itemName="name"
            error={errors.taskType?.message}
            itemId="name"
            {...register("taskType")}
            label="Task type"
            defaultValue={taskDetails.taskType}
            control={control}
            data={TASK_TYPE}
          />
          <SelectForm
            id="projectId"
            {...register("projectId")}
            label="Project"
            itemName="title"
            itemId="projectId"
            error={errors.projectId?.message}
            defaultValue={taskDetails.projectId}
            control={control}
            onChange={handleProjectChange}
            data={projects}
          />
          <SelectForm
            id="assignees"
            {...register("assignees")}
            label={t("Assignees")}
            itemName="username"
            itemId="id"
            error={errors.assignees?.message}
            defaultValue={[]}
            control={control}
            data={assignees}
            isLoading={isAssigneesLoading}
            multiple
          />
          <DateInput
            label="Deadline"
            name="deadline"
            control={control}
            error={errors.deadline?.message}
            {...register("deadline")}
            defaultValue={moment(taskDetails.deadline)}
            inputRef={register}
          />
          <input
            type="file"
            name="file"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setValue("file", files);
            }}
            multiple
          />
          <Button type="submit" severity="success">
            Create new task
          </Button>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" action={action}>
          {alert}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Create;

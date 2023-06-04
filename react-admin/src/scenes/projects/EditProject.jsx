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
import { tokens } from "../../theme";
import Header from "../../components/Header";
import QuillEditor from "../../components/reusable/QuillEditor";

import { useTranslation } from "react-i18next";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const EditProject = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState();

  const { data: info, isLoading: isProjectLoading } = useDataFetching(
    `/project/${id}`
  );
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

  const projectDetails = {
    title: info?.title || "",
    description: info?.description || "",
  };
  const otherDetails = {
    author: info && info.admin ? info.admin.username : "",
    authorId: info?.admin?.id || "",
    createdDate: info && info.createdDate ? info.createdDate : "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("Title is required")),
    description: Yup.string().required(t("Description is required")),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: projectDetails,
  });
  useEffect(() => {
    if (info) {
      setValue("title", info?.title);
      setValue("description", info?.description);
    }
    // Set default values for other fields
  }, [info, setValue]);
  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      console.log(values);
      const response = await axios.put(
        `/project/${id}`,
        values
      );
      setAlert(t("The project successfully edited"));
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
  if (isProjectLoading) {
    return <Loading />;
  }

  if (!info) {
    return <div>Data not available.</div>;
  }

  return (
    <Box m="20px">
      {info && (
        <Box
          p="20px 30px"
          display="flex"
          backgroundColor={colors.blueAccent[900]}
        >
          <Box display="flex" flexDirection="column">
            <Header
              title="Project Editing"
              subtitle="Editing your project details"
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
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={5}>
                <FormInput
                  label={t("Title")}
                  error={errors.title?.message}
                  name="title"
                  control={control}
                  {...register("title")}
                  defaultValue={projectDetails.title}
                  inputRef={register}
                />
              </Grid>
              <Grid item>
                <ReactQuill
                  theme="snow"
                  name="description"
                  error={errors.description?.message}
                  value={projectDetails?.description}
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

export default EditProject;

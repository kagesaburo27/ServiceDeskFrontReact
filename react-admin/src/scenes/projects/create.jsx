import React, { forwardRef } from "react";
import {
  Box,
  Button,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import axiosPrivate from "../../api/axios";
import { Select, MenuItem, InputLabel } from "@mui/material";
import FormInput from "../../components/reusable/FormInput";
import SelectForm from "../../components/reusable/SelectForm";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from "../../data/dataTypes";
import { CREATE_PROJECTS_URL } from "../../api/apiUrls";
const CREATE_TASK_URL = "/task/create";

const Create = () => {
  const [info, setInfo] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const projectDetails = {
    title: info?.title || "",
    description: info?.description || "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
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
    if (isDataFetched) {
      setValue("title", info.title);
      setValue("description", info.description);
      // Set default values for other fields
    }
  }, [isDataFetched, info, setValue]);
  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      const response = await axiosPrivate.post(
        CREATE_PROJECTS_URL,
        values,
        {}
      );
      console.log(values);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
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
      <Typography variant="h2">Create new Project</Typography>
      <Box >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: "span 4",
              },
            }}
          >
           <FormInput
            label="Title"
            name="title"
            control={control}
            {...register("title")}
            defaultValue={projectDetails.title}
            inputRef={register}
          />
           <FormInput
            label="Description"
            name="description"
            control={control}
            {...register("description")}
            defaultValue={projectDetails.description}
            inputRef={register}
          />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Project
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default Create;

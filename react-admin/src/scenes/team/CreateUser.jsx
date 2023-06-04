import React, { useState } from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import * as Yup from "yup";
import axiosPrivate from "../../api/axios";
import FormInput from "../../components/reusable/FormInput";
import moment from "moment";
import DateInput from "../../components/reusable/DateInput";
import SelectForm from "../../components/reusable/SelectForm";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useDataFetching from "../../hooks/useDataFetching";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  CREATE_USER_URL,
  GET_ROLES_URL,
  PROJECTS_URL,
} from "../../api/apiUrls";

const CreateUser = () => {
  const { data: projects, isLoading: areProjectsLoading } =
    useDataFetching(PROJECTS_URL);
  const { data: roles, isLoading: areRolesLoading } =
    useDataFetching(GET_ROLES_URL);
  console.log(projects);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState();
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
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    birth: "",
    phone: "",
    role: [],
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Title is required"),
    lastName: Yup.string().required("Description is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    birth: Yup.string().required("Birth is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    error,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: taskDetails,
  });
  const handleNameChange = () => {
    const firstName = taskDetails.firstName;
    const lastName = taskDetails.lastName;

    if (firstName && lastName) {
      const username = `${firstName}${lastName}`;
      const email = `${username}@gmail.com`;
      setValue("username", username);
      setValue("email", email);
    } else {
      setValue("username", "");
      setValue("email", "");
    }
  };

  const onSubmit = async (values) => {
    const formattedDate = moment(moment(values.birth)).format("YYYY/MM/DD");

    const updatedValues = { ...values, birth: formattedDate };
    // Send the PUT request to the edit API
    try {
      const response = await axiosPrivate.post(CREATE_USER_URL, updatedValues);
      console.log(values);
      setAlert("The user successfully created");
      setOpen(true);
    } catch (err) {
      console.error(err);
      setAlert(error);
    }
  };

  const style = {
    backgroundColor: "white",
    borderRadius: 5,
    boxShadow: 24,
    padding: "2% 5%",
  };

  return (
    <Box style={style}>
      <Typography variant="h2">Create new User</Typography>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="First name"
            name="firstName"
            control={control}
            {...register("firstName")}
            onChange={handleNameChange}
            defaultValue={taskDetails.firstName}
            inputRef={register}
          />
          <FormInput
            label="Last name"
            name="lastName"
            control={control}
            {...register("lastName")}
            onChange={handleNameChange}
            defaultValue={taskDetails.lastName}
            inputRef={register}
          />
          <FormInput
            label="Password"
            name="password"
            control={control}
            {...register("password")}
            defaultValue={taskDetails.password}
            inputRef={register}
          />
          <FormInput
            label="Username"
            name="username"
            control={control}
            {...register("username")}
            defaultValue={taskDetails.username}
            inputRef={register}
          />
          <FormInput
            label="Email"
            name="email"
            control={control}
            {...register("email")}
            defaultValue={taskDetails.email}
            inputRef={register}
          />
          <FormInput
            label="Phone"
            name="phone"
            control={control}
            {...register("phone")}
            defaultValue={taskDetails.phone}
            inputRef={register}
          />
          <SelectForm
            id="role"
            {...register("role", { required: true })}
            label="Roles"
            itemName="name"
            itemId="name"
            multiple
            defaultValue={taskDetails.role}
            control={control}
            data={roles}
            isLoading={areRolesLoading}
          />
          <DateInput
            label="Birth"
            name="birth"
            control={control}
            {...register("birth")}
            defaultValue={moment(taskDetails.birth)}
            inputRef={register}
          />
          <Button type="submit" severity="success" label="Create" />
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
export default CreateUser;

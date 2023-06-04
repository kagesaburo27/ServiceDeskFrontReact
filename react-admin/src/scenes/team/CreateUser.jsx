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

} from "../../api/apiUrls";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const CreateUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const { data: roles, isLoading: areRolesLoading } =
    useDataFetching(GET_ROLES_URL);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] =  useState({ message: "", severity: "success" });
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

  const onSubmit = async (values) => {
    const formattedDate = moment(moment(values.birth)).format("YYYY/MM/DD");

    const updatedValues = { ...values, birth: formattedDate };
    // Send the PUT request to the edit API
    try {
      setLoading(true);
      const response = await axiosPrivate.post(CREATE_USER_URL, updatedValues);
      console.log(response.data);
      setLoading(false);
      setAlert({ message: "The user was successfully created", severity: "success" });
   setOpen(true);
    } catch (err) {
      setAlert({ message: err?.response?.data.message, severity: "error" });
      setOpen(true);
      setLoading(false);
    }
  };

  const style = {
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
            error={errors.firstName?.message}
            control={control}
            {...register("firstName")}
            defaultValue={taskDetails.firstName}
            inputRef={register}
          />
          <FormInput
            label="Last name"
            name="lastName"
            error={errors.lastName?.message}
            control={control}
            {...register("lastName")}
            defaultValue={taskDetails.lastName}
            inputRef={register}
          />
          <FormInput
            label="Password"
            name="password"
            error={errors.password?.message}
            control={control}
            {...register("password")}
            defaultValue={taskDetails.password}
            inputRef={register}
          />
          <FormInput
            label="Username"
            name="username"
            error={errors.username?.message}
            control={control}
            {...register("username")}
            defaultValue={taskDetails.username}
            inputRef={register}
          />
          <FormInput
            label="Email"
            name="email"
            error={errors.email?.message}
            control={control}
            {...register("email")}
            defaultValue={taskDetails.email}
            inputRef={register}
          />
          <FormInput
            label="Phone"
            name="phone"
            error={errors.phone?.message}
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
            error={errors.role?.message}
            multiple
            defaultValue={taskDetails.role}
            control={control}
            data={roles}
            isLoading={areRolesLoading}
          />
          <DateInput
            label="Birth"
            name="birth"
            error={errors.birth?.message}
            control={control}
            {...register("birth")}
            defaultValue={moment(taskDetails.birth)}
            inputRef={register}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            sx={{
              backgroundColor: colors.primary[1],
              marginTop: "30px",
              width: "100%",
              height: "60px",
            }}
          >
            {" "}
            Create
          </LoadingButton>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose}  severity={alert.severity} action={action}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default CreateUser;

import axios from "./api/axios";
import React from "react";
import { useState } from "react";
import "./index.css";
import { ColorModeContext, tokens, useMode } from "./theme";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Box,
  CssBaseline,
  InputAdornment,
  Snackbar,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_URL } from "./api/apiUrls";
import useAuth from "./hooks/useAuth";
import FormInput from "./components/reusable/FormInput";
import { AccountCircle } from "@mui/icons-material";

const Login = () => {
  const { setAuth } = useAuth();

  const [theme, colorMode] = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [loading, setLoading] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false); // State for showing/hiding the snackbar

  const defaultValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const { data: response } = await axios.post(LOGIN_URL, values);
      setAuth(response.data);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Show snackbar with error severity
        setShowErrorSnackbar(true);
      }
    }
    setLoading(false);
  };
  const handleSnackbarClose = () => {
    setShowErrorSnackbar(false);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          justifyContent="center"
          display="flex"
          alignItems="center"
          sx={{
            backgroundImage: "url('../../assets/bg-white.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
 
          }}
          height="100vh"
        >
          <Box
            className="login-box form"
            justifyContent="center"
            display="flex"
            width={isMobile ? "100%" : "30vw"}
            height={isMobile ? "100%" : "70vh"}
            borderRadius="3%"
            alignItems="center"
          >
            <Box width="70%">
              <Box>
                <Box mb="10px">
                  <Typography variant="h4">Welcome to</Typography>
                  <Typography variant="h1">Service desk</Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)} width="100%">
                  <FormInput
                    label="Username"
                    name="username"
                    control={control}
                    {...register("username")}
                    inputRef={register}
                    error={errors.username?.message}
                    startAdornment="account"
                  />
                  <FormInput
                    label="Password"
                    name="password"
                    control={control}
                    {...register("password")}
                    inputRef={register}
                    error={errors.password?.message}
                    startAdornment="password"
                  />
                  <LoadingButton
                    variant="contained"
                    loading={loading}
                    sx={{
                      backgroundColor: colors.primary[1],
                      marginTop: "30px",
                      width: "100%",
                      height: "60px",
                    }}
                    type="submit"
                  >
                    Login
                  </LoadingButton>
                </form>
              </Box>
            </Box>
          </Box>
          <Snackbar
            open={showErrorSnackbar}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="error">
              <AlertTitle>Error</AlertTitle>
              Authentication failed. Please check your credentials.
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default Login;

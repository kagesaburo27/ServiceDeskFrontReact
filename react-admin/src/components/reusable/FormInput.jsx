import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FormControl } from "@mui/material";
import { forwardRef, useState } from "react";
import { Controller } from "react-hook-form";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
const FormInput = forwardRef(
  (
    {
      name,
      label,
      control,
      disabled,
      multiline,
      variant,
      maxRows,
      error,
      startAdornment,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordInput = name.toLowerCase().includes("password");
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <FormControl margin="normal" fullWidth error={error}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Typography variant="h5">{label}</Typography>

              <TextField
                {...field}
                error={error}
                type={isPasswordInput && !showPassword ? "password" : "text"}
                disabled={disabled}
                multiline={multiline}
                variant={variant}
                rows={maxRows}
                InputProps={{
                  ...(isPasswordInput && {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }),
                  ...(startAdornment !== null && {
                    startAdornment: (
                      <InputAdornment position="start">
                        {startAdornment === "account" ? (
                          <AccountCircle />
                        ) : startAdornment === "password" ? (
                          <KeyRoundedIcon />
                        ) : null}
                      </InputAdornment>
                    ),
                  }),
                }}
              />
            </>
          )}
          ref={ref}
        />
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </FormControl>
    );
  }
);

export default FormInput;

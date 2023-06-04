import { TextField, Typography } from "@mui/material";
import { FormControl } from "@mui/material";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const DateInput = forwardRef(({ name, label, control, error }, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FormControl margin="normal" error={error} fullWidth>
        <Typography variant="h5">{label}</Typography>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={error}
              {...field}
              value={field.value}
              onChange={(date) => field.onChange(date)}
            />
          )}
          ref={ref}
        />
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </FormControl>
    </LocalizationProvider>
  );
});

export default DateInput;

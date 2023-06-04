import { InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { FormControl } from "@mui/material";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
const SelectForm = forwardRef(
  (
    {
      id,
      label,
      data,
      itemName,
      multiple,
      itemId,
      control,
      onChange,
      error,
      defaultValue,
    },
    ref
  ) => {
    const defaultValues = Array.isArray(defaultValue)
      ? defaultValue.filter((value) => value !== null)
      : [defaultValue].filter((value) => value !== null);
    const handleSelectChange = (event, field) => {
      const selectedValues = Array.isArray(event.target.value)
        ? event.target.value
        : [event.target.value];
      field.onChange(selectedValues);
    };

    return (
      <FormControl margin="normal" error={error} fullWidth>
        <Typography variant="h5">{label}</Typography>
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              id={id}
              error={error}
              multiple={multiple}
              defaultValue={multiple ? defaultValues : defaultValue}
              onChange={
                onChange
                  ? onChange
                  : (event) => handleSelectChange(event, field)
              }
            >
              {data.map((item) => (
                <MenuItem value={item[itemId]} key={item[itemId]}>
                  {item[itemName]}
                </MenuItem>
              ))}
            </Select>
          )}
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

export default SelectForm;

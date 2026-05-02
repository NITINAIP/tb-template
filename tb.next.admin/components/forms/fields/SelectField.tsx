"use client";

import TextField, { type TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { type BaseFieldProps, resolveErrorState, resolveHelperText } from "../types";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = BaseFieldProps &
  Omit<TextFieldProps, "name" | "label" | "helperText" | "error" | "required" | "disabled" | "size" | "select"> & {
    options: SelectOption[];
  };

export function SelectField({
  name,
  label,
  helperText,
  error,
  required,
  disabled,
  fullWidth = true,
  size = "small",
  options,
  ...props
}: SelectFieldProps) {
  return (
    <TextField
      {...props}
      select
      name={name}
      label={label}
      helperText={resolveHelperText(helperText, error)}
      error={resolveErrorState(error)}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

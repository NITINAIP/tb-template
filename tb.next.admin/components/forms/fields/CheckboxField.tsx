"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { type CheckboxProps } from "@mui/material/Checkbox";
import { type BaseFieldProps, resolveErrorState, resolveHelperText } from "../types";

type CheckboxFieldProps = BaseFieldProps &
  Omit<CheckboxProps, "name" | "required" | "disabled" | "size">;

export function CheckboxField({
  name,
  label,
  helperText,
  error,
  required,
  disabled,
  size = "small",
  readOnly,
  ...props
}: CheckboxFieldProps) {
  return (
    <FormControl error={resolveErrorState(error)} required={required} disabled={disabled}>
      <FormControlLabel
        label={label}
        control={<Checkbox {...props} name={name} size={size} disabled={disabled} inputProps={{ "aria-readonly": readOnly }} />}
      />
      <FormHelperText>{resolveHelperText(helperText, error)}</FormHelperText>
    </FormControl>
  );
}

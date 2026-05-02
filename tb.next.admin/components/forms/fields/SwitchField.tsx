"use client";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch, { type SwitchProps } from "@mui/material/Switch";
import { type BaseFieldProps, resolveErrorState, resolveHelperText } from "../types";

type SwitchFieldProps = BaseFieldProps & Omit<SwitchProps, "name" | "required" | "disabled">;

export function SwitchField({
  name,
  label,
  helperText,
  error,
  required,
  disabled,
  readOnly,
  ...props
}: SwitchFieldProps) {
  return (
    <FormControl error={resolveErrorState(error)} required={required} disabled={disabled}>
      <FormControlLabel
        label={label}
        control={<Switch {...props} name={name} disabled={disabled} inputProps={{ "aria-readonly": readOnly }} />}
      />
      <FormHelperText>{resolveHelperText(helperText, error)}</FormHelperText>
    </FormControl>
  );
}

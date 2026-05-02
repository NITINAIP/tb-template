"use client";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup, { type RadioGroupProps } from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";
import { type BaseFieldProps, resolveErrorState, resolveHelperText } from "../types";
import type { SelectOption } from "./SelectField";

export type { SelectOption };

type RadioGroupFieldProps = BaseFieldProps &
  Omit<RadioGroupProps, "name"> & {
    options: SelectOption[];
  };

export function RadioGroupField({
  name,
  label,
  helperText,
  error,
  required,
  disabled,
  options,
  ...props
}: RadioGroupFieldProps) {
  return (
    <FormControl error={resolveErrorState(error)} required={required} disabled={disabled}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup {...props} name={name}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio size="small" />} label={option.label} />
        ))}
      </RadioGroup>
      <FormHelperText>{resolveHelperText(helperText, error)}</FormHelperText>
    </FormControl>
  );
}

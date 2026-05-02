"use client";

import Autocomplete, { type AutocompleteProps } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { type BaseFieldProps, resolveErrorState, resolveHelperText } from "../types";

export type AutocompleteOption = {
  label: string;
  value: string;
};

type AutocompleteFieldProps = BaseFieldProps &
  Omit<AutocompleteProps<AutocompleteOption, false, false, false>, "renderInput" | "options"> & {
    options: AutocompleteOption[];
  };

export function AutocompleteField({
  label,
  helperText,
  error,
  required,
  disabled,
  fullWidth = true,
  size = "small",
  options,
  ...props
}: AutocompleteFieldProps) {
  return (
    <Autocomplete
      {...props}
      options={options}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          helperText={resolveHelperText(helperText, error)}
          error={resolveErrorState(error)}
          required={required}
          fullWidth={fullWidth}
          size={size}
        />
      )}
    />
  );
}

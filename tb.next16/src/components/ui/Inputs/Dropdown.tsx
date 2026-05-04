"use client";

import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export interface DropdownOptions {
  label?: string;
  value?: string | number;
  id?: string;
}
type KeyOptions = keyof DropdownOptions;
interface DropdownProps {
  label?: string;
  options?: DropdownOptions[];
  value?: string | number;
  onChange?: (_data: string | number) => void;
  required?: boolean;
  fullWidth?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  keyValue?: KeyOptions;
  keyLabel?: KeyOptions;
  hideItems?: string[];
  defaultValue?: string;
  dataTestId?: string;
  error?: boolean;
  helperText?: string;
}

const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  required,
  fullWidth = true,
  readOnly = false,
  disabled = false,
  keyValue = "value",
  keyLabel = "label",
  hideItems = [],
  defaultValue,
  dataTestId,
  error = false,
  helperText = ``,
}: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(
    value ?? defaultValue ?? "",
  );
  const handleChange = (newValue: string | number) => {
    setSelectedValue(newValue);
    if (onChange) onChange(newValue);
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <FormControl fullWidth={fullWidth} error={error}>
      <div className="flex items-center gap-1">
        {label && <Typography>{label}</Typography>}
        {required && <Typography color="error">*</Typography>}
      </div>
      <Select
        sx={{ marginTop: "4px" }}
        variant="filled"
        value={selectedValue}
        onChange={(event) => handleChange(event.target.value)}
        size="small"
        disabled={disabled || readOnly}
        defaultValue={defaultValue}
        inputProps={{
          "data-testid": dataTestId,
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`${label}-${index}`}
            value={option[keyValue]}
            data-testid={`${dataTestId}-${option[keyLabel]}`}
            sx={{
              display: hideItems.includes(`${option[keyValue]}`)
                ? "none"
                : "block",
            }}
          >
            {`${option[keyLabel]}`}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Dropdown;

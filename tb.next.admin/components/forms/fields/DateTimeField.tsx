"use client";

import dayjs, { type Dayjs } from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { type BaseFieldProps, resolveErrorState, resolveHelperText } from "../types";

type DateTimeFieldProps = BaseFieldProps & {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
};

export function DateTimeField({
  label,
  helperText,
  error,
  required,
  disabled,
  readOnly,
  value,
  onChange,
}: DateTimeFieldProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={value ?? dayjs()}
        onChange={onChange}
        disabled={disabled}
        slotProps={{
          textField: {
            required,
            error: resolveErrorState(error),
            helperText: resolveHelperText(helperText, error),
            size: "small",
            fullWidth: true,
            inputProps: {
              readOnly,
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

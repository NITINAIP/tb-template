"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { SelectField, type SelectOption } from "../fields/SelectField";
import type { RHFBaseProps } from "./types";

type RHFSelectProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> & {
  label: string;
  options: SelectOption[];
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
};

export function RHFSelect<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: RHFSelectProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <SelectField
          {...field}
          {...props}
          error={error?.message}
        />
      )}
    />
  );
}

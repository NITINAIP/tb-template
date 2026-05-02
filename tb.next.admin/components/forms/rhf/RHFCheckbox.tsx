"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { CheckboxField } from "../fields/CheckboxField";
import type { RHFBaseProps } from "./types";

type RHFCheckboxProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> & {
  label: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

export function RHFCheckbox<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: RHFCheckboxProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <CheckboxField
          {...field}
          {...props}
          checked={field.value || false}
          error={error?.message}
        />
      )}
    />
  );
}

"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { TextareaField } from "../fields/TextareaField";
import type { RHFBaseProps } from "./types";

type RHFTextareaProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> & {
  label: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  minRows?: number;
};

export function RHFTextarea<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: RHFTextareaProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextareaField
          {...field}
          {...props}
          error={error?.message}
        />
      )}
    />
  );
}

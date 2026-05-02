"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { TextInputField } from "../fields/TextInputField";
import type { RHFBaseProps } from "./types";

type RHFTextInputProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> & {
  label: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  type?: string;
};

export function RHFTextInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: RHFTextInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextInputField
          {...field}
          {...props}
          error={error?.message}
        />
      )}
    />
  );
}

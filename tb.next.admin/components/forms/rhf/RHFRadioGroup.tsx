"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { RadioGroupField, type SelectOption } from "../fields/RadioGroupField";
import type { RHFBaseProps } from "./types";

type RHFRadioGroupProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> & {
  label: string;
  options: SelectOption[];
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

export function RHFRadioGroup<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: RHFRadioGroupProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <RadioGroupField
          {...field}
          {...props}
          error={error?.message}
        />
      )}
    />
  );
}

"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { SwitchField } from "../fields/SwitchField";
import type { RHFBaseProps } from "./types";

type RHFSwitchProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> & {
  label: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

export function RHFSwitch<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: RHFSwitchProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <SwitchField
          {...field}
          {...props}
          checked={field.value || false}
          error={error?.message}
        />
      )}
    />
  );
}

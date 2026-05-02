"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { AutocompleteField, type AutocompleteOption } from "../fields/AutocompleteField";
import type { RHFBaseProps } from "./types";

type RHFAutocompleteProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> & {
  label: string;
  options: AutocompleteOption[];
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
};

export function RHFAutocomplete<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: RHFAutocompleteProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <AutocompleteField
          name={field.name}
          value={
            props.options.find((opt) => opt.value === field.value) || null
          }
          onChange={(_, option) => {
            field.onChange(option?.value || "");
          }}
          onBlur={field.onBlur}
          {...props}
          error={error?.message}
        />
      )}
    />
  );
}

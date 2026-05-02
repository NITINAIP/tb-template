"use client";

import dayjs, { type Dayjs } from "dayjs";
import { Controller, type FieldValues } from "react-hook-form";
import { DateTimeField } from "../fields/DateTimeField";
import type { RHFBaseProps } from "./types";

type RHFDateTimeProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> & {
  label: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

export function RHFDateTime<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: RHFDateTimeProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <DateTimeField
          name={field.name}
          value={field.value ? dayjs(field.value) : null}
          onChange={(val: Dayjs | null) => {
            field.onChange(val?.toISOString() || null);
          }}
          {...props}
          error={error?.message}
        />
      )}
    />
  );
}

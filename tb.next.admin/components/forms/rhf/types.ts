"use client";

import { Control, type FieldPath, FieldValues } from "react-hook-form";
import { BaseFieldProps } from "../types";

export type RHFBaseProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

export type RHFFieldProps<TFieldValues extends FieldValues = FieldValues> = RHFBaseProps<TFieldValues> &
  Omit<BaseFieldProps, "name">;

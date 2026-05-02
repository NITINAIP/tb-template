"use client";

import { TextInputField } from "./TextInputField";
import { type BaseFieldProps } from "../types";
import type { TextFieldProps } from "@mui/material/TextField";

type TextareaFieldProps = BaseFieldProps &
  Omit<TextFieldProps, "name" | "label" | "helperText" | "error" | "required" | "disabled" | "size" | "multiline" | "minRows"> & {
    minRows?: number;
  };

export function TextareaField({ minRows = 3, ...props }: TextareaFieldProps) {
  return <TextInputField {...props} multiline minRows={minRows} />;
}

"use client";

import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { type BaseFieldProps, resolveErrorState, resolveHelperText } from "../types";

type TextInputFieldProps = BaseFieldProps &
    Omit<TextFieldProps, "name" | "label" | "helperText" | "error" | "required" | "disabled" | "size">;

export function TextInputField({
    name,
    label,
    helperText,
    error,
    required,
    disabled,
    readOnly,
    fullWidth = true,
    size = "small",
    ...props
}: TextInputFieldProps) {
    return (
        <TextField
            {...props}
            name={name}
            label={label}
            helperText={resolveHelperText(helperText, error)}
            error={resolveErrorState(error)}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            slotProps={{
                input: {
                    autoComplete: 'new-password',
                    readOnly,
                },
            }}
        />
    );
}

"use client";

import { styled, TextField, Typography } from "@mui/material";
import { useMask } from "@react-input/mask";
import React, { useEffect, useRef } from "react";

import { REPLACEMENT } from "@/utils/constants";
import { MASK_INPUT } from "@/utils/enums";
const disabledStyle = {
  background: "#f0f0f0",
  cursor: "not-allowed",
};

const InputTextContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "4px",
}));

interface InputTextProps {
  label?: string;
  size?: "small" | "medium";
  onChange?: (_data: string) => void;
  disabled?: boolean;
  value?: string;
  required?: boolean;
  defaultValue?: string | number;
  readOnly?: boolean;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  dataTestId?: string;
  error?: boolean;
  helperText?: string;
  maxLength?: string;
  mask?: string;
  inputMode?:
    | "search"
    | "text"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  maskType?: MASK_INPUT;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  size = "small",
  onChange,
  disabled = false,
  value,
  required = false,
  defaultValue,
  readOnly = false,
  placeholder,
  type,
  multiline,
  dataTestId,
  error = false,
  helperText = ``,
  maxLength,
  mask,
  maskType = MASK_INPUT.DEFAULT,
  inputMode = "text",
}) => {
  const fallbackRef = useRef<HTMLInputElement>(null);
  const maskedRef = useMask({
    mask: mask || "",
    replacement: REPLACEMENT.get(maskType),
  });
  const inputRef = mask ? maskedRef : fallbackRef;

  useEffect(() => {
    if (dataTestId && inputRef.current) {
      inputRef.current.setAttribute("data-testid", dataTestId);
    }
    if (maxLength && inputRef.current) {
      inputRef.current.setAttribute("maxlength", maxLength);
    }
  }, [dataTestId, maxLength]);
  return (
    <InputTextContainer>
      <div className="flex items-center gap-1">
        {label && <Typography>{label}</Typography>}
        {required && <Typography color="error">*</Typography>}
      </div>
      <TextField
        size={size}
        variant="filled"
        sx={disabled ? disabledStyle : undefined}
        fullWidth
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        multiline={multiline}
        rows={multiline ? 5 : 0}
        inputRef={inputRef}
        slotProps={{
          input: {
            readOnly,
            autoComplete: "off",
            inputMode,
          },
        }}
        error={error}
        helperText={helperText}
      />
    </InputTextContainer>
  );
};

export default InputText;

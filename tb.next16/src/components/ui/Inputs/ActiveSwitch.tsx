"use client";

import { FormControlLabel, Switch, Typography } from "@mui/material";
import React, { useRef } from "react";

import { useTestId } from "@/utils/hook/useTestId";

interface ActiveSwitchProps {
  label?: string;
  dataTestId?: string;
  onChange?: (_checked: boolean) => void;
  disabled?: boolean;
  checked: boolean;
}

const ActiveSwitch: React.FC<ActiveSwitchProps> = ({
  label,
  onChange,
  disabled = false,
  dataTestId = "",
  checked,
}) => {
  const switchLabel = checked ? "Active" : "Inactive";
  const ref = useRef(null);
  useTestId(ref, dataTestId);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      {label && <Typography>{label}</Typography>}
      <FormControlLabel
        disabled={disabled}
        control={
          <Switch checked={checked} onChange={handleChange} inputRef={ref} />
        }
        label={switchLabel}
      />
    </div>
  );
};

export default ActiveSwitch;

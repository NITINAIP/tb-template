"use client";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";

import { Option } from "@/utils/types";

interface CheckboxesProps {
  label?: string;
  dataTestId?: string;
  options?: Option[];
  required?: boolean;
  selectedValues?: string[];
  onChange?: (_values: string[]) => void;
  isSelectAll?: boolean;
}

const Checkboxes: FC<CheckboxesProps> = ({
  label,
  options = [],
  required = false,
  selectedValues = [],
  dataTestId,
  onChange,
  isSelectAll,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedValues);

  useEffect(() => {
    setSelected(selectedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(updated);
    onChange?.(updated);
  };

  const handleSelectAll = () => {
    const allValues = options.map((o) => o.value);
    const isAllSelected = selected.length === allValues.length;
    const updated = isAllSelected ? [] : allValues;
    setSelected(updated);
    onChange?.(updated);
  };

  const isAllChecked = selected.length === options.length && options.length > 0;
  const isIndeterminate =
    selected.length > 0 && selected.length < options.length;

  return (
    <FormControl component="fieldset" variant="standard">
      <div className="flex items-center gap-1 mb-1 flex-wrap">
        {label && <Typography>{label}</Typography>}
        {required && <Typography color="error">*</Typography>}
        {isSelectAll ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllChecked}
                indeterminate={isIndeterminate}
                onChange={handleSelectAll}
              />
            }
            label="เลือกทั้งหมด"
          />
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 w-full">
        {options.map((item, index) => (
          <div key={`${item.value}-${index}`} className="w-full">
            <FormControlLabel
              control={
                <Checkbox
                  slotProps={{
                    input: {
                      ref: (instance) => {
                        if (instance != null) {
                          instance.setAttribute(
                            "data-testid",
                            `${dataTestId}-${index}`,
                          );
                        }
                      },
                    },
                  }}
                  checked={selected.includes(item.value)}
                  onChange={() => handleToggle(item.value)}
                />
              }
              label={item.label}
            />
          </div>
        ))}
      </div>
    </FormControl>
  );
};

export default Checkboxes;

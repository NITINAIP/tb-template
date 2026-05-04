"use client";

import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  ButtonGroup,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from "@mui/material";
import React, { ReactNode, useEffect, useId, useRef, useState } from "react";

import { ActionType } from "@/utils/enums";
import { formatDate, formatNumber, toBuddhistYear } from "@/utils/format";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const ACTIONS_BUTTON: Record<
  ActionType,
  {
    getIcon: (_rowData: any) => ReactNode;
    label: string;
  }
> = {
  add: {
    getIcon: () => <AddIcon />,
    label: "เพิ่มข้อมูล"
  },
  view: {
    getIcon: () => <VisibilityIcon />,
    label: "ดูข้อมูล"
  },
  edit: {
    getIcon: () => <EditIcon />,
    label: "แก้ไขข้อมูล"
  },
  delete: {
    getIcon: () => <DeleteIcon />,
    label: "ลบข้อมูล"
  }
};

export interface RowData {
  id: string | number;
  [key: string]: any;
}

interface CheckBoxColumnProps {
  defaultChecked?: boolean;
  onClick?: (_checked: any) => void;
  disabled?: boolean;
  tableId?: string;
  headId?: string;
}

export const CheckBoxColumn: React.FC<CheckBoxColumnProps> = ({
  defaultChecked,
  onClick,
  disabled,
  tableId = `check-box-column`,
  headId
}) => {
  const uqid = useId();
  const handleOnClick = (value: boolean) => {
    if (onClick) onClick(value);
  };
  return (
    <Checkbox
      defaultChecked={defaultChecked}
      data-testid={`${tableId}-${headId}-${uqid}`}
      onClick={(e) => handleOnClick((e.target as HTMLInputElement).checked)}
      disabled={disabled}
    />
  );
};

interface ActionButtonData {
  type: ActionType;
  onClick: (_rowData: RowData) => void;
  isAuthorization: boolean;
}

interface ActionColumnProps {
  data: ActionButtonData[];
  tableId: string;
  rowData: RowData;
}

export const ActionColumn: React.FC<ActionColumnProps> = ({
  data = [],
  tableId,
  rowData
}) => (
  <ButtonGroup variant="text" size="small">
    {data.map(({ type, onClick, isAuthorization = true }) => {
      const uniqueKey = `${tableId}-${type}-${rowData.id}`;
      const { getIcon, label } = ACTIONS_BUTTON[type];
      if (!isAuthorization) return null;
      return (
        <Tooltip title={label} key={uniqueKey} arrow>
          <Button
            sx={{ color: "primary.main" }}
            data-testid={uniqueKey}
            onClick={() => onClick(rowData)}
          >
            {getIcon(rowData)}
          </Button>
        </Tooltip>
      );
    })}
  </ButtonGroup>
);
export const ActionsMenuColumn: React.FC<ActionColumnProps> = ({
  data = [],
  tableId,
  rowData
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton aria-label="more-vert" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu-menu"
        aria-labelledby="actions-menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        {data.map(({ type, onClick }) => {
          const uniqueKey = `${tableId}-${type}-${rowData.id}`;
          const { getIcon, label } = ACTIONS_BUTTON[type];
          return (
            <MenuItem
              onClick={() => {
                handleClose();
                onClick?.(rowData);
              }}
              key={uniqueKey}
            >
              <div className="flex gap-4">
                {getIcon(rowData)} {label}
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

interface ActiveColumnProps {
  currentStatus: number;
}

export const ActiveColumn: React.FC<ActiveColumnProps> = ({
  currentStatus
}) => {
  const isActive = currentStatus === 1 || currentStatus;

  return isActive ? (
    <CheckCircleOutlinedIcon color="success" />
  ) : (
    <CancelOutlinedIcon color="error" />
  );
};

export const FormattedValue = ({
  type,
  value
}: {
  type?: string;
  value: any;
  maxWidth?: number;
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  const format = ({ type, value }: { type?: string; value: any }) => {
    const types = {
      date: formatDate(value),
      number: formatNumber(value),
      year: toBuddhistYear(value)
    };
    return type ? types[type as keyof typeof types] : value;
  };

  const formattedValue = format({ type, value });

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const checkOverflow = () => {
        setIsOverflowed(el.scrollWidth > el.clientWidth);
      };
      requestAnimationFrame(checkOverflow);
    }
  }, [formattedValue]);

  const text = (
    <Typography
      ref={textRef}
      component="span"
      noWrap
      fontSize={12}
      sx={{
        maxWidth: "400px",
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        cursor: "default"
      }}
    >
      {formattedValue}
    </Typography>
  );

  return isOverflowed ? (
    <Tooltip
      arrow
      title={
        <Typography sx={{ fontSize: "12px" }}>{formattedValue}</Typography>
      }
    >
      {text}
    </Tooltip>
  ) : (
    text
  );
};

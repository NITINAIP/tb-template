"use client";

import {
  Button,
  DialogContent,
  NoSsr,
  Slide,
  SlideProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { FC, forwardRef, ReactNode } from "react";

import { CANCEL_LABEL, CLOSE_LABEL, CONFIRM_LABEL } from "@/utils/constants";

import {
  BtnSection,
  DialogContainer,
  DialogMUI,
  DialogTitle,
} from "./Dialog.style";
import { slotsTransition, Transition } from "../commons/Transitions";

interface CustomDialogProps {
  children: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  title: string | ReactNode;
  open?: boolean;
}

const CustomDialog: FC<CustomDialogProps> = ({
  children,
  onConfirm,
  onCancel,
  title,
  open = false,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const isConfirmMode = typeof onConfirm === "function";

  const handleConfirm = () => {
    if (isConfirmMode) {
      onConfirm();
    }
  };

  return (
    <NoSsr>
      <DialogMUI
        fullScreen={fullScreen}
        open={open}
        onClose={onCancel}
        scroll="paper"
        slots={slotsTransition}
      >
        <DialogTitle id="modal-title" variant="h6" component="h2">
          {title}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>

        <BtnSection>
          {isConfirmMode && (
            <Button
              variant="contained"
              onClick={handleConfirm}
              data-testid="confirm-custom-dialog"
            >
              {CONFIRM_LABEL}
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={onCancel}
            data-testid="cancel-custom-dialog"
          >
            {isConfirmMode ? CANCEL_LABEL : CLOSE_LABEL}
          </Button>
        </BtnSection>
      </DialogMUI>
    </NoSsr>
  );
};

export default CustomDialog;

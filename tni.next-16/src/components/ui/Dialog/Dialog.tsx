"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Button,
  NoSsr,
  Slide,
  SlideProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { forwardRef, JSX } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeDialog } from "@/redux/slices/dialogSlice";
import { CANCEL_LABEL, CLOSE_LABEL, CONFIRM_LABEL } from "@/utils/constants";
import { DialogStatus } from "@/utils/enums";

import { slotsTransition } from "../commons/Transitions";
import {
  BtnSection,
  DialogContainer,
  DialogContentMUI,
  DialogMUI,
  DialogTitle,
} from "./Dialog.style";

interface DialogDetail {
  title?: string;
  content: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  status?: DialogStatus;
  redirectPath?: string;
}

interface RootState {
  dialog: {
    dialogDetail?: DialogDetail;
    open: boolean;
  };
}

export default function Dialog() {
  const { dialogDetail, open } =
    useSelector((state: RootState) => state.dialog) ?? {};
  const { title, content, onConfirm, onCancel, status, redirectPath } =
    dialogDetail ?? {};
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const handleClose = () => {
    if (typeof onCancel === "function") {
      onCancel();
    }
    if (redirectPath) {
      router.push(redirectPath);
    }
    dispatch(closeDialog());
  };

  const isConfirmMode = typeof onConfirm === "function";

  const handleConfirm = () => {
    if (isConfirmMode) {
      onConfirm();
    }
    dispatch(closeDialog());
  };

  const dialogTypes: Record<string, JSX.Element> = {
    warn: <ErrorOutlineIcon sx={{ color: "#FFE500" }} />,
    success: <CheckCircleOutlineIcon color="success" />,
    error: <HighlightOffIcon color="error" />,
  };

  const dialogTitle: Record<string, string | undefined> = {
    warn: title,
    success: "สำเร็จ",
    error: "เกิดข้อผิดพลาด",
  };

  return (
    <NoSsr>
      <DialogMUI
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        slots={slotsTransition}
      >
        <DialogContainer>
          <DialogTitle id="modal-title" variant="h6" component="h2">
            {status && dialogTypes[status]}
            {status ? dialogTitle[status] : title}
          </DialogTitle>
          <DialogContentMUI
            id="modal-description"
            dividers
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          />
          <BtnSection>
            {isConfirmMode && (
              <Button
                variant="contained"
                onClick={handleConfirm}
                data-testid="dialog-confirm-btn"
              >
                {CONFIRM_LABEL}
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={handleClose}
              data-testid="dialog-close-btn"
            >
              {isConfirmMode ? CANCEL_LABEL : CLOSE_LABEL}
            </Button>
          </BtnSection>
        </DialogContainer>
      </DialogMUI>
    </NoSsr>
  );
}

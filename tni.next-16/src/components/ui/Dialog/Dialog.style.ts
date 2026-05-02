import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  TypographyProps
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const DialogBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "600px",
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",

  "&:focus": {
    outline: "none"
  }
}));

export const BtnSection = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
  paddingBlock: "8px"
}));

export const DialogTitle = styled(Typography)<TypographyProps>(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px"
}));

export const DialogContentMUI = styled(DialogContent)(() => ({
  wordWrap: "break-word"
}));

export const DialogMUI = styled(Dialog)(({ theme }) => ({
  gap: "16px",
  "& .MuiDialog-paper": {
    padding: "20px",
    [theme.breakpoints.up("md")]: {
      minWidth: "800px"
    }
  }
}));

export const DialogContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px"
}));

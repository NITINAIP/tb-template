"use client";

import { styled } from "@mui/system";
import { FormHTMLAttributes } from "react";

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(2.5)
}));

const FormContainer: React.FC<FormHTMLAttributes<HTMLFormElement>> = (
  props
) => {
  return <StyledForm noValidate autoComplete="off" {...props} />;
};

export default FormContainer;

import { styled } from "@mui/system";

export const ButtonContainer = styled("div")(() => ({
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  width: "100%"
}));
export const FilterContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "12px",
  gridTemplateColumns: "1fr 1fr",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr"
  },
  width: "100%"
}));

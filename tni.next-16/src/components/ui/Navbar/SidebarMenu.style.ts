import { ListItemButton, ListItemIcon, styled } from "@mui/material";

interface ListItemButtonProps {
  selected?: boolean;
  margin?: string;
}

interface ListItemIconProps {
  selected?: boolean;
}

export const ListItemButtonMUI = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme, selected, margin }) => ({
    borderRadius: "50px",
    margin: margin || "6px 0px",
    backgroundColor: selected
      ? `${theme.palette.primary.main} !important`
      : "transparent",
    color: selected ? "white" : theme.palette.secondary.main,
    fontWeight: "bold"
  })
);

export const ListItemIconMUI = styled(ListItemIcon)<ListItemIconProps>(
  ({ theme, selected }) => ({
    color: selected ? theme.palette.primary.main : theme.palette.secondary.main,
    minWidth: "40px"
  })
);

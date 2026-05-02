"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";
import {
  Collapse,
  List,
  ListItemText,
  NoSsr,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeNavbar } from "@/redux/slices/navbarSlice";
import { RootState } from "@/utils/types";

import { APP_MENU } from "./menu";
import { ListItemButtonMUI, ListItemIconMUI } from "./SidebarMenu.style";

interface SidebarChild {
  label: string;
  path: string;
  icon?: ReactNode;
}

interface SidebarButtonProps {
  label?: string;
  path: string;
  icon?: ReactNode;
  children?: SidebarChild[];
}

const SidebarButton = ({ label, path, icon, children }: SidebarButtonProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();

  const parentPath = `/${pathname.split("/")[1]}`;

  const isActive = Boolean(
    pathname === path ||
    parentPath === path ||
    (children && children.some((child) => pathname.startsWith(child.path))),
  );

  const [open, setOpen] = useState<boolean>(isActive);

  const handleOnClick = () => {
    if (children && children.length) return setOpen((prev) => !prev);

    router.push(path);
    if (isMobile) dispatch(closeNavbar());
  };

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  return (
    <NoSsr>
      <ListItemButtonMUI
        onClick={handleOnClick}
        selected={isActive}
        data-testid={`${label}-sidebar-button`}
      >
        {icon && <ListItemIconMUI selected={isActive}>{icon}</ListItemIconMUI>}
        <ListItemText primary={label} />
        {children ? open ? <ExpandLessIcon /> : <ExpandMoreIcon /> : null}
      </ListItemButtonMUI>

      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child) => {
              const isChildActive =
                pathname === child.path || pathname.startsWith(child.path);

              const handleOnChildClick = () => {
                router.push(child.path);
                if (isMobile) dispatch(closeNavbar());
              };

              return (
                <ListItemButtonMUI
                  key={child.path}
                  margin="4px 0px 0px 20px"
                  selected={isChildActive}
                  onClick={handleOnChildClick}
                  data-testid={`${child.label}-sidebar-child-button`}
                >
                  <ListItemIconMUI selected={isChildActive}>
                    {child.icon ?? <SubdirectoryArrowRightOutlinedIcon />}
                  </ListItemIconMUI>
                  <ListItemText primary={child.label} />
                </ListItemButtonMUI>
              );
            })}
          </List>
        </Collapse>
      )}
    </NoSsr>
  );
};

const SidebarMenu = () => {
  const { menuPermission = {} } = useSelector(
    (stage: RootState) => stage.auth.userInfo,
  );
  return (
    <List
      sx={(theme) => ({
        overflowY: "auto",
        scrollbarGutter: "stable",
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
        [`&:hover`]: {
          scrollbarColor: `${theme.palette.custom.lightGray} transparent`,
        },
      })}
    >
      {APP_MENU.map((menu) => (
        <SidebarButton key={menu.label} {...menu} />
      ))}
    </List>
  );
};

export default SidebarMenu;

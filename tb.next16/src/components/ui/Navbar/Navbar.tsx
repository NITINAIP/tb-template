"use client";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { NoSsr, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeNavbar, openNavbar } from "@/redux/slices/navbarSlice";
import { RootState } from "@/utils/types";

import { APP_MENU } from "./menu";
import {
  AppBar,
  AppTitle,
  AppTitleSection,
  ContainerInsideMain,
  DrawerContainer,
  DrawerHeader,
  DrawerMUI,
  Main,
  SubTitle,
} from "./Navbar.style";
import SidebarMenu from "./SidebarMenu";
import UserProfile from "./UserProfile";

const APP_TITLE = "TNI Master Data Service Application";

interface NavbarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state: RootState) => state.navbar);
  const path = usePathname();
  const menuName = APP_MENU.find((m) => m.path === path)?.label ?? "";

  const handleDrawerOpen = () => {
    dispatch(openNavbar());
  };

  const handleDrawerClose = () => {
    dispatch(closeNavbar());
  };

  return (
    <NoSsr>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={isOpened}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open Menu"
              onClick={handleDrawerOpen}
              data-testid="open-menu-btn"
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                isOpened && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <AppTitleSection>
              <AppTitle>{APP_TITLE}</AppTitle>
              <SubTitle>{menuName}</SubTitle>
            </AppTitleSection>
            <UserProfile />
          </Toolbar>
        </AppBar>
        <DrawerMUI
          variant={isMobile ? "temporary" : "persistent"}
          anchor="left"
          open={isOpened}
        >
          <DrawerContainer>
            <DrawerHeader>
              <Image
                src="/logo.png"
                alt="Thanachart Insurance"
                width={180}
                height={24}
                className="w-full h-auto max-w-40"
              />
              <IconButton
                onClick={handleDrawerClose}
                data-testid="close-menu-btn"
              >
                <MenuOpenIcon />
              </IconButton>
            </DrawerHeader>
            <Divider
              sx={(theme) => ({ borderColor: theme.palette.primary.main })}
            />
            <SidebarMenu />
          </DrawerContainer>
        </DrawerMUI>
        <Main open={isOpened}>
          <DrawerHeader />
          <ContainerInsideMain>{children}</ContainerInsideMain>
        </Main>
      </Box>
    </NoSsr>
  );
};

export default Navbar;

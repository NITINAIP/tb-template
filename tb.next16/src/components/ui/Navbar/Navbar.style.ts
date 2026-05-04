import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Drawer, styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

export const DRAWER_WIDTH = 260;

interface DrawerStateProps {
  open?: boolean;
}

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open"
})<DrawerStateProps>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: open ? 0 : `-${DRAWER_WIDTH}px`,
  width: "100dvw",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    width: "100dvw",
    marginLeft: "0px"
  }
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<DrawerStateProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  background: theme.palette.custom.white,
  boxShadow: "none",
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between"
}));

export const DrawerMUI = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    backgroundColor: theme.lighten(theme.palette.primary.main, 0.899),
    boxSizing: "border-box",
    [theme.breakpoints.down("lg")]: {
      width: "100dvw"
    }
  }
}));

export const DrawerContainer = styled("div")(() => ({
  padding: "0px 10px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
}));

export const UserProfileContainer = styled("div")(({ theme }) => ({
  marginTop: "auto",
  padding: "20px 10px",
  // borderTop: `1px solid ${theme.palette.primary.main}`,
  display: "flex",
  justifyContent: "space-between",
  gap: 1
}));

export const UserDetailContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "14px"
}));

export const UserName = styled("div")(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: "bold"
}));

export const UserPosition = styled("div")(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.custom.lightGray
}));

export const UserProfileIcon = styled(AccountCircleIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "32px"
}));

export const AppTitleSection = styled("div")(() => ({
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 1
}));

export const AppTitle = styled("div")(({ theme }) => ({
  fontSize: "18px",
  color: theme.palette.primary.main,
  fontWeight: "bolder"
}));

export const SubTitle = styled("div")(() => ({
  fontSize: "14px"
}));

export const ContainerInsideMain = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px"
}));

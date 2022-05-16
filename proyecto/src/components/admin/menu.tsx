import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AlbumIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ListItem, ListItemIcon, Slider } from "@mui/material";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { NavButton } from "../types";
import { Styles } from "../../types/types";
import { Logout } from "@mui/icons-material";
import { logout } from "../../service/Login";
import LyricsIcon from "@mui/icons-material/Lyrics";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const AdminMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const adminButtons: NavButton[] = useMemo(
    () => [
      {
        text: "Songs",
        icon: <LibraryMusicIcon />,
        onClick: () => navigate("/admin/songs"),
      },
      {
        text: "Singers",
        icon: <MenuIcon />,
        onClick: () => navigate("/admin/singers"),
      },
      {
        text: "Albums",
        icon: <LyricsIcon />,
        onClick: () => navigate("/admin/albums"),
      },
    ],
    [navigate]
  );
  const styles: Styles = useMemo(
    () => ({
      drawerContainer: {
        width: "200px",
      },
      drawerItem: {
        width: "200px",
      },
    }),
    []
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navegar = () => {
    logout();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{ display: "flex" }}
          style={{ justifyContent: "space-between" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ fontFamily: "Helvetica Neue" }}
          >
            Good morning, Admin
          </Typography>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ fontFamily: "Helvetica Neue" }}
          >
            <Link
              to="/"
              onClick={() =>
                setTimeout(() => {
                  navegar();
                }, 1)
              }
            >
              Logout
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="div" disablePadding>
          {adminButtons.map((button, index) => (
            <ListItem
              button
              key={`NavButton-${button.text}-${index}`}
              onClick={button.onClick}
              sx={styles.drawerItem}
            >
              <ListItemIcon>{button.icon}</ListItemIcon>
              <ListItemText primary={button.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}></Main>
    </Box>
  );
};

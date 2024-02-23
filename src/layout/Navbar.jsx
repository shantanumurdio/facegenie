import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ResoluteaiLogo from "../assets/resoluteai_logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from "react-router-dom";
import { appStateActions } from "../store/appState";

const drawerWidth = 260;



const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.appState.isDrawerOpen);

  const pageNames = {
    "/dashboard": "Dashboard",
    "/uploadvideos": "Upload Videos",
    "/allvideos": "All Videos",
    "/analysis": "View Analysis",
    "/user": "User",
    "/role": "Role",
    "/settings": "Settings",
    "/logout": "Logout",
  };

  return (
    <AppBarStyle
      position="absolute"
      open={isDrawerOpen}
      sx={{ backgroundColor: "#fa2520" }}
    >
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(appStateActions.toggleDrawer())}
          sx={{
            marginRight: "36px",
            ...(isDrawerOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {pageNames[location.pathname]}
        </Typography>
        <Typography>
          <img
            src={ResoluteaiLogo}
            alt="Resoluteai Logo"
            style={{ width: "150px", marginTop: "5px" }}
          />
        </Typography>
        <Typography  sx={{m:"5px"}}>
            <AccountCircleIcon/>
        </Typography>
      </Toolbar>
    </AppBarStyle>
  );
};

export default Navbar;

import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from './SideNavOptions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { appStateActions } from "../store/appState";
import FaceGenie from '../assets/FaceGenieLogo.webp'
import Resoluteai from '../assets/resoluteai_logo.png'


const drawerWidth = 260;

const DrawerStyle = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


const SideNavbar = () => {

    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(state => state.appState.isDrawerOpen);

    return (
        <DrawerStyle variant="permanent" open={isDrawerOpen}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex',
                    px: [1],
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    <img src={FaceGenie} alt="Company Logo" style={{ width: '200px', margin:"auto" }} />
                </Typography>
                <IconButton onClick={() => dispatch(appStateActions.toggleDrawer())}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <MainListItems />
                <Divider sx={{ my: 2 }} />
            </List>
            <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1, mt:"100px", ml:"25px" }}
                >
                    <img src={Resoluteai} alt="Company Logo" style={{ width: '200px', margin:"auto" }} />
                </Typography>
        </DrawerStyle >
    )
}

export default SideNavbar;
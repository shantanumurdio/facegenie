import React from "react";
import { Link, useLocation } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadVideos from '@mui/icons-material/PlayCircleOutlineSharp';
import AllVideos from '@mui/icons-material/AutoGraph';
import InsertChart from '@mui/icons-material/InsertChart';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


import './styles.css'


export const MainListItems = () => {

    const location = useLocation()

    const PageList = [
        { path: '/dashboard', pageName: 'Dashboard', icon: DashboardIcon },
        { path: '/uploadvideos', pageName: 'Upload Videos', icon: UploadVideos },
        { path: '/allvideos', pageName: 'All Videos', icon: AllVideos },
        { path: '/analysis', pageName: 'View Analysis', icon: InsertChart },
        { path: '/settings', pageName: 'Settings', icon: Settings },
        { path: '/logout', pageName: 'Logout', icon: Logout },
    ]

    return (
        <>
            {
                PageList.map(page => {
                    return (
                        <ListItemButton
                            component={Link}
                            to={page.path}
                            className={location.pathname === page.path ? 'selectedNavButton' : null}
                        >
                            <ListItemIcon>
                                <page.icon className={location.pathname === page.path ? 'selectedNavIcon' : null} />
                            </ListItemIcon>
                            <ListItemText primary={page.pageName} className={location.pathname === page.path ? 'selectedNavText' : null} />
                        </ListItemButton>
                    )
                })
            }
        </>
    );
}
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Userlist from '../pages/userlist';
import { isLogin } from '../service/action';
import CrudModal from './crudmodal';
import LogoImage from '../utilities/logo.png'


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const Maindrawer = () => {

    const loc = useLocation().pathname;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const userName = localStorage.getItem('userDetails').toLocaleUpperCase()
    const jobRole = localStorage.getItem('role').toLocaleUpperCase()
    const [check, setCheck] = useState(false);

    const iconsList = [<DashboardIcon />, <GroupIcon />];
    const navigate = ['/dashboard', '/userlist']

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const modalResult = (res) => {
        if (res) {
            localStorage.setItem('isLogin', "false");
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            localStorage.removeItem('userDetails');
            dispatch(isLogin(state.reducer_public.isLogin = false));
        }
        setCheck(false);
      }

    const logout = () => {
        setCheck(true);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ backgroundColor: "#F28F80" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ width: '100%', display: { sm: "flex" }, justifyContent: "space-between", }}>
                        <Typography variant="h6" noWrap component="div" >
                            <div>Welcome {userName} | {jobRole}</div>
                        </Typography>
                        <Typography variant="h6" noWrap component="div" >
                            {loc.slice(1,).toLocaleUpperCase()}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <img src={LogoImage} alt='logo' width={200} height={50}/>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Dashboard', 'User List'].map((text, index) => (
                        <Link to={`${navigate[index]}`} className='text-decoration-none text-dark'>
                            <ListItem key={text} disablePadding sx={{ display: 'block', backgroundColor: navigate[index] === loc ? "#F28F80" : "" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {iconsList[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem></Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Logout'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{
                            display: "flex", alignItems: "end", height: "70vh",
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center', backgroundColor: "rgb(234, 53, 29)",
                                    px: 2.5,
                                    pl: open ? 5 : 'auto',
                                    fontWeight: "bold",
                                    '&:hover,& .MuiButtonBase-root': {
                                        background: "red"
                                    }
                                }}
                                onClick={logout}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 5 : 'auto',
                                        justifyContent: 'center',
                                        fontWeight: "bold"
                                    }}
                                >
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {check && <CrudModal title={'Are you sure want to Logout ?'} returnResult={modalResult} />}
            {
                loc === '/dashboard' ? <Dashboard /> : <Userlist/>
            }
        </Box >

    )
}

export default Maindrawer
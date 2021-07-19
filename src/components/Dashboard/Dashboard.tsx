import React from 'react';
import clsx from 'clsx';
import {
    AppBar,
    colors,
    Container, createMuiTheme, ThemeProvider,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    ListItem, ListItemIcon, ListItemText,
    Toolbar,
    Typography,
    MenuItem, Menu, Fade
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import TocIcon from '@material-ui/icons/Toc';
import AddIcon from '@material-ui/icons/Add';
import ChatIcon from "@material-ui/icons/Chat";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PaymentIcon from '@material-ui/icons/Payment';
import useStyles from "./styles";
import {useHistory} from "react-router-dom";
import {Logout} from "../../api/Auth";
import Cookies from "js-cookie";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';

export default function Dashboard(props: any) {
    const classesDashboard = useStyles();
    const history = useHistory();
    // Menu Bar
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpenOther(false);
        setOpen(false);
    };
    const [openOther, setOpenOther] = React.useState(false);
    const handleClick = () => {
        setOpenOther(!openOther);
        // Menu Bar is not opened...
        if (!open) {
            setOpen(true);
        }
    };

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: colors.blue[800],
            },
            type: "dark",
            // type: darkMode ? "dark" : "light",
        },
    });

    const DashboardPage = () => {
        history.push("/dashboard");
    }
    const VMPage = () => {
        history.push("/dashboard/vm");
    }
    const SupportPage = () => {
        history.push("/dashboard/support");
    }
    const ProcedurePage = () => {
        history.push("/dashboard/procedure");
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classesDashboard.root}>
                <CssBaseline/>
                <AppBar position="absolute"
                        className={clsx(classesDashboard.appBar, open && classesDashboard.appBarShift)}>
                    <Toolbar className={classesDashboard.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classesDashboard.menuButton, open && classesDashboard.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap
                                    className={classesDashboard.title}>
                            vmmgr Service Online
                        </Typography>
                        {/*<IconButton color="inherit">*/}
                        {/*    <Badge badgeContent={0} color="secondary">*/}
                        {/*        <NotificationsIcon/>*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}
                        <UserMenu key={"user_menu"}/>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{paper: clsx(classesDashboard.drawerPaper, !open && classesDashboard.drawerPaperClose),}}
                    open={open}
                >
                    <div className={classesDashboard.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <ListItem button onClick={DashboardPage}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem button onClick={VMPage}>
                        <ListItemIcon>
                            <ViewAgendaIcon/>
                        </ListItemIcon>
                        <ListItemText primary="VM"/>
                    </ListItem>
                    <Divider/>
                </Drawer>
                <main className={classesDashboard.content}>
                    <div className={classesDashboard.appBarSpacer}/>
                    <Container maxWidth="lg" className={classesDashboard.container}>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            noWrap
                            className={classesDashboard.pageTitle}
                        >
                            {props.title}
                        </Typography>
                        {props.children}
                    </Container>
                </main>
            </div>
        </ThemeProvider>
    );
}

export function UserMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clickLogout = () => {
        Logout().then(res => {
                Cookies.remove('user_token');
                Cookies.remove('access_token');
                history.push('/login');
                console.log(res)
                if (res === "") {
                } else {

                }
            }
        );
    }

    return (
        <div className={classes.root}>
            <IconButton
                color="inherit"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <PermIdentityIcon/>
            </IconButton>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                <MenuItem onClick={clickLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

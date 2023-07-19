import React, {useEffect} from 'react';
import Schedule from "./components/schedule/Schedule"
import './App.css';
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";
import LeftContentController from "./components/LeftContent/LeftContentController";
import qs from 'qs'
import AuthToolbar from "./components/AuthToolbar";
import {connect} from "react-redux";
import {changeTab, changeUser} from "./redux/actions";
import {getTabFromID, TABS} from "./constants/model";
import PlanToolbar from "./components/PlanToolbar";
import SearchIcon from '@mui/icons-material/Search';
import {logInUser} from "./model/networking";

//https://faizanv.medium.com/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0


const drawerWidth = 240;


const useStyles = makeStyles((theme) => {
    console.log(theme)
    return {
        root: {
            display: 'flex',
        },
        toolbar: {
            minHeight: '80px',
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: {
            marginTop: '80px'
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 240,
        }
    }
});

const App = (props) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        let location = props.location.search
        if (location[0] === '?') location = location.substring(1)
        const parsed = qs.parse(location)
        console.log("Parsed: ", parsed)
        if (parsed.token && parsed.token.length > 0) {
            window.localStorage.setItem("token", parsed.token);
            props.history.push("/")
            const token = parsed.token
            logInUser(token, null, null, props.changeUser)
        }
    })


    const onClickTabItem = (id) => {
        props.changeTab(getTabFromID(id))
    }

    const mainListItems = (
        <div>
            <ListItem button onClick={() => onClickTabItem(TABS.SEARCH.id)}>
                <ListItemIcon>
                    <SearchIcon/>
                </ListItemIcon>
                <ListItemText primary="Search"/>
            </ListItem>
            {props.user &&
                <ListItem button onClick={() => onClickTabItem(TABS.PLAN.id)}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Current Plan"/>
                </ListItem>
            }

        </div>
    )

    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge='start' onClick={handleDrawerOpen} size="large">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        {props.tab.title}
                    </Typography>
                    {props.user && <PlanToolbar/>}
                    <AuthToolbar/>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}>
                <div style={{marginBottom: '32px'}}>
                    <IconButton onClick={handleDrawerClose} size="large">
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <div id="body">
                    <LeftContentController>

                    </LeftContentController>
                    <div id="scheduleHalf">
                        <Schedule/>
                    </div>
                </div>
            </main>


        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        tab: state.tab
    }
}


export default connect(mapStateToProps, {changeUser, changeTab})(App);

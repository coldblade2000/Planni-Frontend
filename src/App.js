import React, {useEffect} from 'react';
import Schedule from "./components/schedule/Schedule"
import './App.css';
import {
    Box,
    CssBaseline,
    Divider,
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
import LeftContentController from "./components/LeftContent/LeftContentController";
import qs from 'qs'
import AuthToolbar from "./components/AuthToolbar";
import {connect} from "react-redux";
import {changeTab, changeUser} from "./redux/actions";
import {getTabFromID, TABS} from "./constants/model";
import PlanToolbar from "./components/PlanToolbar";
import SearchIcon from '@mui/icons-material/Search';
import {logInUser} from "./model/networking";
import {styled} from "@mui/material/styles";
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';

//https://faizanv.medium.com/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0


const drawerWidth = 240;


const useStyles = makeStyles((theme) => {
    console.log(theme)
    return {
        title: {
            flexGrow: 1,
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }
    }
});

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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
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

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
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
                open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>{mainListItems}</List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3, paddingLeft: '0'}}>
                <DrawerHeader/>
                <Box id="body" sx={{display: 'flex', flexDirection: 'row', flexWrap: 'false'}}>
                    <LeftContentController>

                    </LeftContentController>
                    <div id="scheduleHalf">
                        <Schedule/>
                    </div>
                </Box>
            </Box>


        </Box>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        tab: state.tab
    }
}


export default connect(mapStateToProps, {changeUser, changeTab})(App);

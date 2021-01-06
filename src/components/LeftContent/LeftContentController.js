import React from 'react'
import {connect} from "react-redux";
import {TABS} from "../../constants/model";
import SearchTab from "./SearchTab";
import {makeStyles} from "@material-ui/core";

const LeftContentController = (props)=>{
    const tab = getTabInfo(props.selectedTab)
    const classes = useStyles();

    return <div className={classes.root}>
        {renderTab(tab, classes)}
    </div>
}
const renderTab = (tabInfo)=>{
    switch (tabInfo.tabID) {
        case TABS.SEARCH:
            return(
                <SearchTab />
            )
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const mapStateToProps = (state)=>{
    return {selectedTab : state.tab}
}

const getTabInfo = (tabID)=>{
    switch (tabID){
        case TABS.SEARCH:
            return {
                tabID: tabID,
                title: "Search"
            }
        default:
            return null;
    }
}

export default connect(mapStateToProps, null)(LeftContentController)
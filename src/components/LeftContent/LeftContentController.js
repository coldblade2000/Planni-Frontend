import React from 'react'
import {connect} from "react-redux";
import {TABS} from "../../constants/model";
import SearchTab from "./SearchTab";
import makeStyles from '@mui/styles/makeStyles';
import PlanTab from "./PlanTab";

const LeftContentController = (props)=>{
    const tab = props.selectedTab
    const classes = useStyles();

    return <div className={classes.root}>
        {renderTab(tab, classes)}
    </div>
}
const renderTab = (tabInfo)=> {
    switch (tabInfo.id) {
        case TABS.SEARCH.id:
            return (
                <SearchTab/>
            )
        case TABS.PLAN.id:
            return <PlanTab/>
        default:
            break;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 'auto',
        maxWidth: '30rem',
        overflow: "scroll",
    },
}));

const mapStateToProps = (state)=>{
    return {selectedTab : state.tab}
}


export default connect(mapStateToProps, null)(LeftContentController)

import React from 'react'
import {connect} from "react-redux";
import SearchPanel from "./SearchPanel";
import CourseList from "./CourseList";
import {makeStyles} from "@material-ui/core";

const SearchTab = (props)=>{
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <SearchPanel/>
            <CourseList/>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default connect(null, null)(SearchTab)
import React from 'react'
import {List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const CourseList = (props)=>{
    const classes = useStyles();

    return(
        <List className={classes.root} component='nav' aria-label="main mailbox folders">
            {renderCourseListItems()}
        </List>
    )
}


const renderCourseListItems = (courses) =>{

}

export default CourseList
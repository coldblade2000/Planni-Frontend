import React from 'react'
import {List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CourseListItem from "./CourseListItem";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const CourseList = (props) => {
    const classes = useStyles();

    return(
        <List className={classes.root} component='nav' aria-label="main mailbox folders">
            {renderCourseListItems(props.courseArray)}
        </List>
    )
}


const renderCourseListItems = (courses) => {
    return courses.map((course) =>
        <CourseListItem course={course}/>
    )
}

const mapStateToProps = (state) => {
    return {
        courseArray: state.searchCourses
    }
}

export default connect(mapStateToProps, null)(CourseList)
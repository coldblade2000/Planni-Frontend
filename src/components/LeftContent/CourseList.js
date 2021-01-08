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
            {renderCourseListItems(props.courseArray, props.displayedCourses)}
        </List>
    )
}


const renderCourseListItems = (courses, displayedCourses) => {
    return courses.map((course) => {
            let isAlreadyDisplayed = false
            if (displayedCourses.find(dispCourse => dispCourse._id === course._id)) isAlreadyDisplayed = true
            return <CourseListItem course={course}
                                   isAlreadyAdded={isAlreadyDisplayed}
                                   key={course._id}
            />
        }
    )
}

const mapStateToProps = (state) => {
    return {
        courseArray: state.searchCourses,
        displayedCourses: state.displayedCourses
    }
}

export default connect(mapStateToProps, null)(CourseList)
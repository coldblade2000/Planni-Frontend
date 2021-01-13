import React from 'react'
import {List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CourseListItem from "./CourseListItem";
import {connect} from "react-redux";
import {selectedNewPlanWithUpdate} from "../../redux/actions";



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

//This is in charge of tendering the array of courses and displaying them verticaly  by calling the renderCourseListItems function
const CourseList = (props) => {
    const classes = useStyles();
    const renderCourseListItems = (courses, displayedCourses) => {
        return courses.map((course) => {
                let isAlreadyDisplayed = false
                if (displayedCourses.find(dispCourse => dispCourse._id === course._id)) isAlreadyDisplayed = true
                return <CourseListItem course={course}
                                       isAlreadyAdded={isAlreadyDisplayed}
                                       onChangeCallback={onChangeCallback}
                                       key={course._id}
                />
            }
        )
    }
    const onChangeCallback = () => {
        //TODO finish once the redux store has been formalized
        //props.selectedNewPlanWithUpdate(props.currentPlan, getToken(window))
    }
    return (
        <List className={classes.root} component='nav' aria-label="main mailbox folders">
         {renderCourseListItems(props.courseArray, props.displayedCourses)}
        </List>
    )
}

//This is responsible for rendering the courses if they already arent, if they are it does nothing
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

const mapStateToProps = (state, ownprops) => {

    if (ownprops.usesSearch === true) {
        return {
            courseArray: state.searchCourses,
            displayedCourses: state.displayedCourses,
            currentPlan: state.selectedPlan
        }
    } else {
        return {
            courseArray: state.displayedCourses,
            displayedCourses: state.displayedCourses,
            currentPlan: state.selectedPlan

        }
    }
}

export default connect(mapStateToProps, {selectedNewPlanWithUpdate})(CourseList)
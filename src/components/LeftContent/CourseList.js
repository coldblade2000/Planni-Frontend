import React, {useEffect, useState} from 'react'
import {List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CourseListItem from "./CourseListItem";
import {connect} from "react-redux";
import {selectedNewPlanWithUpdate} from "../../redux/actions";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

//This is in charge of tendering the array of courses and displaying them verticaly  by calling the renderCourseListItems function
const CourseList = (props) => {
    const [listedCourses, setListedCourses] = useState([])
    const classes = useStyles();

    useEffect(() => {
        setListedCourses(props.courseArray)
    }, [props.courseArray])

    const deleteItemIfFull = (CRN) => {
        if (props.filterFull === true) {
            setListedCourses(listedCourses.filter(elem => elem._id !== CRN))
        }
    }

    const renderCourseListItems = (courses, displayedCourses) => {
        return courses.map((course) => {
            let isAlreadyDisplayed = false
            if (displayedCourses.find(dispCourse => dispCourse._id === course._id)) isAlreadyDisplayed = true
            return <CourseListItem course={course}
                                   isAlreadyAdded={isAlreadyDisplayed}
                                   deleteItemIfFull={deleteItemIfFull}
                                   key={course._id}
            />
            }
        )
    }

    return (
        <List className={classes.root} component='nav' aria-label="main mailbox folders">
            {renderCourseListItems(listedCourses, props.displayedCourses)}
        </List>
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
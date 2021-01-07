import {combineReducers} from "redux";
import {
    ADDED_BLACKOUT,
    ADDED_SECTION,
    CHANGE_TAB,
    CHANGE_USER,
    COURSE_SEARCH_COMPLETE,
    HIGHLIGHT_SECTION,
    REMOVED_BLACKOUT,
    REMOVED_SECTION,
    SELECTED_PLAN
} from "./types";
import {TABS} from "../constants/model";

const displayedCoursesStickers = (courses = [], action) => {
    switch (action.type) {
        case ADDED_SECTION:
            return [...courses, action.payload]
        case REMOVED_SECTION:
            return [...courses].filter((course => course._id !== action.payload._id))
        case HIGHLIGHT_SECTION:
            if (action.payload === null) {
                return courses.filter((elem => (elem.isHighlight === null) || !elem.isHighlight))
            } else {
                //If we are adding a new highlight, we retrieve the course, set isHighlight to true
                const course = action.payload;
                course.isHighlight = true;
                //We then create a new array from the previous courses that removes all courses that
                // were highlighted. We then push our new course there and return
                const courseArray = courses.filter((elem => (elem.isHighlight === null) || !elem.isHighlight))
                courseArray.push(course)
                return courseArray
            }

    }
    return courses
}

const displayedBlackouts = (blackouts = [], action) => {
    switch (action.type) {
        case ADDED_BLACKOUT:
            return [...blackouts, action.payload]
        case REMOVED_BLACKOUT:
            //TODO Check if _id works, otherwise replace with CRN
            return [...blackouts].filter((blackout => blackout._id !== action.payload._id))

    }
    return blackouts
}

const switchUser = (user = null, action) => {
    switch (action.type) {
        case CHANGE_USER:
            return action.payload;
        default:
            return user
    }
}

const changeTab = (tab = TABS.SEARCH, action) => {
    switch (action.type) {
        case CHANGE_TAB:
            return action.payload;
        default:
            return tab
    }
}
const changePlan = (plan = null, action) => {
    switch (action.type) {
        case SELECTED_PLAN:
            return action.payload;
        default:
            return plan
    }
}

const foundSearchCourses = (courses = [], action) => {
    switch (action.type) {
        case COURSE_SEARCH_COMPLETE:
            return action.payload;
        case CHANGE_USER:
            return [];
        default:
            return courses
    }
}

export default combineReducers({
    displayedCourses: displayedCoursesStickers,
    displayedBlackouts: displayedBlackouts,
    user: switchUser,
    tab: changeTab,
    selectedPlan: changePlan,
    searchCourses: foundSearchCourses

})
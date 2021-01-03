import {combineReducers} from "redux";
import {
    ADDED_BLACKOUT,
    ADDED_SECTION,
    CHANGE_TAB,
    CHANGE_USER,
    HIGHLIGHT_SECTION,
    REMOVED_BLACKOUT,
    REMOVED_SECTION,
    SELECTED_PLAN
} from "./types";

const displayedCoursesStickers = (courses = [], action) => {
    switch (action.type) {
        case ADDED_SECTION:
            return [...courses, action.payload]
        case REMOVED_SECTION:
            //TODO Check if _id works, otherwise replace with CRN
            return [...courses].filter((course => course._id !== action.payload._id))
        case HIGHLIGHT_SECTION:
            const course = action.payload;
            course.isHighlight = false;
            const courseArray = [...courses]
            courseArray.filter((elem => (elem.isHighlight === null) || elem.isHighlight))
            return [...courseArray, course]
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
const SEARCH = 1
const changeTab = (tab = SEARCH, action) => {
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

export default combineReducers({
    displayedCourses: displayedCoursesStickers,
    displayedBlackouts: displayedBlackouts,
    user: switchUser,
    tab: changeTab,
    selectedPlan: changePlan

})
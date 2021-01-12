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
            const courseArray = courses.filter(elem =>
                (elem._id !== action.payload._id && (elem.isHighlight === null || !elem.isHighlight))
            );
            courseArray.push(action.payload)
            return courseArray
        case REMOVED_SECTION:
            return [...courses].filter((course => course._id !== action.payload._id))
        case HIGHLIGHT_SECTION:
            if (action.payload === null) {
                return courses.filter((elem => (elem.isHighlight === null) || !elem.isHighlight))
            } else {
                //If we are adding a new highlight, we retrieve the course, set isHighlight to true
                if (!courses.find((courseInner => courseInner._id === action.payload._id))) {
                    const course = action.payload;
                    course.isHighlight = true;
                    //We then create a new array from the previous courses that removes all courses that
                    // were highlighted. We then push our new course there and return
                    const courseArray = courses.filter((elem => (elem.isHighlight === null) || !elem.isHighlight))
                    courseArray.push(course)
                    return courseArray
                } else {
                    return courses
                }
            }
        case SELECTED_PLAN:
            return action.currentPlan.courseList
        case CHANGE_USER:
            if (action.payload) {
                const firstPlan = action.payload.planIDs[0]
                if (firstPlan) {
                    return firstPlan.courseList
                } else {
                    return []
                }
            } else {
                return []
            }
        default:
            return courses

    }
}

const displayedBlackouts = (blackouts = [], action) => {
    switch (action.type) {
        case ADDED_BLACKOUT:
            return [...blackouts, action.payload]
        case REMOVED_BLACKOUT:
            return [...blackouts].filter((blackout => blackout._id !== action.payload._id))
        case SELECTED_PLAN:
            return action.currentPlan.blockList
        case CHANGE_USER:
            if (action.payload) {
                const firstPlan = action.payload.planIDs[0]
                return firstPlan ? firstPlan.blockList : [];
            } else return []
        default:
            return blackouts
    }

}

const switchUser = (user = null, action) => {
    let newPlan, n;
    switch (action.type) {
        case ADDED_SECTION:
            const newUserAdd = {...user}
            for (let i = 0; i < newUserAdd.planIDs.length; i++) {
                newPlan = newUserAdd.planIDs[i]
                if (newPlan._id === action.planID) {
                    n = i
                }
            }
            const newCourseListAdd = newPlan.courseList.filter(elem =>
                (elem._id !== action.payload._id && (elem.isHighlight === null || !elem.isHighlight)))
            newCourseListAdd.push(action.payload)
            newPlan.courseList = newCourseListAdd
            newUserAdd.planIDs[n] = newPlan
            return newUserAdd
        case REMOVED_SECTION:
            const newUserRemove = {...user}
            for (let i = 0; i < newUserRemove.planIDs.length; i++) {
                newPlan = newUserRemove.planIDs[i]
                if (newPlan._id === action.planID) {
                    n = i
                }
            }
            const newCourseList = newPlan.courseList.filter(elem =>
                (elem._id !== action.payload._id && (elem.isHighlight === null || !elem.isHighlight)))
            newPlan.courseList = newCourseList
            newUserRemove.planIDs[n] = newPlan
            return newUserRemove
        //        return plan.courseList.filter((course => course._id !== action.payload._id))
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
            return action.planID;
        /* case ADDED_SECTION:
             if (!plan) return plan
             const courseArray = plan.courseList.filter(elem =>
                 (elem._id !== action.payload._id && (elem.isHighlight === null || !elem.isHighlight))
             );
             courseArray.push(action.payload)
             return courseArray
         case REMOVED_SECTION:
             return plan.courseList.filter((course => course._id !== action.payload._id))*/
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
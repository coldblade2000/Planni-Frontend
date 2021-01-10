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

export const highlightSection = (section) => {
    return {
        type: HIGHLIGHT_SECTION,
        payload: section
    }
}

export const addedSection = (section) => {
    return {
        type: ADDED_SECTION,
        payload: section
    }
}

export const addedBlackout = (blackout) => {
    return {
        type: ADDED_BLACKOUT,
        payload: blackout
    }
}

export const removedSection = (section) => {
    return {
        type: REMOVED_SECTION,
        payload: section
    }
}

export const courseSearchCompleted = (courses) => {
    return {
        type: COURSE_SEARCH_COMPLETE,
        payload: courses
    }
}

export const removedBlackout = (blackout) => {
    return {
        type: REMOVED_BLACKOUT,
        payload: blackout
    }
}

export const selectedNewPlan = (plan) => {
    return {
        type: SELECTED_PLAN,
        payload: plan
    }
}

export const changeTab = (currentTab) => {
    return {
        type: CHANGE_TAB,
        payload: currentTab
    }
}

export const changeUser = (currentUser) => {
    return {
        type: CHANGE_USER,
        payload: currentUser
    }
}


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
    return (dispatch, getState) => {
        const initialState = getState()
        if (initialState.selectedPlan) {
            dispatch({
                type: ADDED_SECTION,
                payload: section,
                planID: initialState.selectedPlan
            })
        }
    }

    /*return {
        type: ADDED_SECTION,
        payload: section
    }*/
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

export const selectedNewPlan = (planID) => {
    return (dispatch, getstate) => {
        const initialState = getstate()
        if (initialState.user) {
            const plan = initialState
                .user
                .planIDs
                .find((elem) => elem._id === planID)
            dispatch({
                type: SELECTED_PLAN,
                planID: planID,
                currentPlan: plan
            })
        }

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


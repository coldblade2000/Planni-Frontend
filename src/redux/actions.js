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
import {getPlan, updatePlan} from "../model/networking";

export const highlightSection = (section) => {
    return {
        type: HIGHLIGHT_SECTION,
        payload: section
    }
}

export const addedSection = (section, token) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADDED_SECTION,
            payload: section
        })
        if (getState().selectedPlan) {
            const plan = getState().selectedPlan
            updatePlan(token, plan, (res) => {
                dispatch({
                    type: SELECTED_PLAN,
                    payload: res.data
                })
            })
        }
    }
}

//TODO allow removing sections as well
export const removedSection = (section, token) => {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVED_SECTION,
            payload: section
        })
        if (getState().selectedPlan) {
            const plan = getState().selectedPlan
            updatePlan(token, plan, (res) => {
                dispatch({
                    type: REMOVED_SECTION,
                    payload: res.data
                })
            })
        }
    }

}

export const addedBlackout = (blackout) => {
    return {
        type: ADDED_BLACKOUT,
        payload: blackout
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

export const selectedNewPlan = (plan, token) => {
    return (dispatch) => {
        dispatch({
            type: SELECTED_PLAN,
            payload: plan
        })
        getPlan(token, plan._id, (res) => {
            if (res.data)
                dispatch({
                    type: SELECTED_PLAN,
                    payload: res.data
                })
        })

    }
}

export const selectedNewPlanWithUpdate = (plan, token) => {
    return (dispatch) => {
        dispatch({
            type: SELECTED_PLAN,
            payload: plan
        })
        if (plan) {
            updatePlan(token, plan, (res) => {
                dispatch({
                    type: SELECTED_PLAN,
                    payload: res.data
                })
            })
        }
    }
    /* return {
         type: SELECTED_PLAN,
         payload: plan
     }*/
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


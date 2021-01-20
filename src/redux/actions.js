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

/**
 * Adds a section to the schedule, tagged as a highlighted section
 * @param section
 */
export const highlightSection = (section) => {
    return {
        type: HIGHLIGHT_SECTION,
        payload: section
    }
}
/**
 * Adds a section to the current plan, and subsequently to the schedule.
 * This is a thunk that first adds the current section to the local plan,
 * then sends a PUT request to update the current plan.
 * @param section - section to be added
 * @param token - user login token
 * @returns {function(*, *): void}
 */
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
/**
 * Removed a section from the current plan, and subsequently from the schedule.
 * This is a thunk that first removes the current section from the local plan,
 * then sends a PUT request to update the current plan, then receives the
 * updated plan, commiting it to state.
 * @param section - section to be added
 * @param token - user login token
 * @returns {function(*, *): void}
 */
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

export const removedBlackout = (blackout) => {
    return {
        type: REMOVED_BLACKOUT,
        payload: blackout
    }
}

/**
 * adds to the search courses the results of a search query
 */
export const courseSearchCompleted = (courses) => {
    return {
        type: COURSE_SEARCH_COMPLETE,
        payload: courses
    }
}

/**
 * Selects another plan. First commits the local plan to the state,
 * requests the server for an updated version and then commits that new
 * plan to the state. This is a thunk that takes care of the updating
 * @param plan - plan to be selected
 * @param token - user login token
 * @returns {function(*): void}
 */
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
/**
 * Selects another plan and then send the plan to the backend, to update the plan
 * in the database. This is a thunk.
 * @param plan - selected plan to update
 * @param token - user token
 */
export const selectedNewPlanWithUpdate = (plan, token) => {
    return async (dispatch) => {
        dispatch({
            type: SELECTED_PLAN,
            payload: plan
        })
        if (plan) {
            await updatePlan(token, plan, (res) => {
                dispatch({
                    type: SELECTED_PLAN,
                    payload: res.data
                })
                console.log("Action end")
            })
        }

    }

}
/**
 * Change current tab selected
 * @param currentTab
 * @returns {{payload, type: string}}
 */
export const changeTab = (currentTab) => {
    return {
        type: CHANGE_TAB,
        payload: currentTab
    }
}
/**
 * Change the selected user
 * @param currentUser
 * @returns {{payload, type: string}}
 */
export const changeUser = (currentUser) => {
    return {
        type: CHANGE_USER,
        payload: currentUser
    }
}


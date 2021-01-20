import axios from "axios";
import {BACKEND_ADDRESS} from "../constants/model";

/**
 * Returns the JWT token from local storage
 * @param window - window variable
 * @returns {string}
 */
export const getToken = (window) => window.localStorage.getItem('token')

/**
 * Sends to the backend a get request to login, and retrieve the user object.
 * @param token - user JWT
 * @param successCallback - callback to be called upon success
 * @param errorCallback - callback to be called in case of error
 * @param changeUser - optional callback that fires a Redux action to change the current
 * user from the state
 * @param thenCallback - callback to be called after execution finishes
 */
export const logInUser = (token, successCallback, errorCallback, changeUser, thenCallback) => {
    axios.get(BACKEND_ADDRESS + '/user/', {headers: {Authorization: `Bearer ${token}`}}).then((res) => {
        console.log("Logged in user: ", res.data)
        if (successCallback) successCallback(res)
        if (changeUser) changeUser(res.data)
    }).catch((err) => {
        console.log(err)
        if (err.response) {
            console.log(err.response.status, err.message)
            if (err.response.status === 401) window.localStorage.setItem('token', null)
        }
        if (errorCallback) errorCallback(err)
    }).then(() => {
        if (thenCallback) thenCallback()
    })
}
/**
 * Sends to the backend a POST request to create new plan.
 * @param token - user JWT
 * @param planName - name of the plan to be created
 * @param successCallback - callback to be called upon success
 * @param errorCallback - callback to be called in case of error
 */
export const createNewPlan = (token, planName, successCallback, errorCallback) => {
    axios({
        method: 'post',
        url: BACKEND_ADDRESS + '/plan/',
        data: {
            name: planName
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        console.log("Created new plan: ", res.data)
        successCallback(res)
    }).catch((err) => {
        console.log(err)
        if (err.response) {
            console.log(err.response.status, err.message)
            if (err.response.status === 401) window.localStorage.setItem('token', null)
        }
        if (errorCallback) errorCallback(err)
    })
}
/**
 * Sends to the backend a PUT request to update a plan
 * @param token - user JWT
 * @param plan - plan to be updated, this will replace the backend's plan
 * @param successCallback - callback to be called upon success
 * @param errorCallback - callback to be called in case of error
 * @param thenCallback - callback to be called after execution finishes

 */
export const updatePlan = (token, plan, successCallback, errorCallback, thenCallback) => {
    axios({
        method: 'put',
        url: BACKEND_ADDRESS + '/plan/' + plan._id.toString(),
        data: plan,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        console.log("Updated plan: ", res.data)
        successCallback(res)
    }).catch((err) => {
        console.log(err)
        if (err.response) {
            console.log(err.response.status, err.message)
            if (err.response.status === 401) window.localStorage.setItem('token', null)
        }
        if (errorCallback) errorCallback(err)
    }).then(() => {
        if (thenCallback) thenCallback()
    })
}
/**
 * Sends to the backend a GET request to get an up-to-date plan
 * @param token - user JWT
 * @param planID - ID of plan to be updated
 * @param successCallback - callback to be called upon success
 * @param errorCallback - callback to be called in case of error
 * @param thenCallback - callback to be called after execution finishes

 */
export const getPlan = (token, planID, successCallback, errorCallback, thenCallback) => {
    axios({
        method: 'get',
        url: BACKEND_ADDRESS + '/plan/' + planID,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        console.log("Updated plan: ", res.data)
        successCallback(res)
    }).catch((err) => {
        console.log(err)
        if (err.response) {
            console.log(err.response.status, err.message)
            if (err.response.status === 401) window.localStorage.setItem('token', null)
        }
        if (errorCallback) errorCallback(err)
    }).then(() => {
        if (thenCallback) thenCallback()
    })
}
/**
 * Gets from Oferta de Cursos the amount of available seats for a single course
 * @param crn - CRN of ection
 * @param successCallback - callback to be called upon success
 * @param errorCallback - callback to be called in case of error
 * @param thenCallback - callback to be called after execution finishes
 */
export const getListItemSeats = (crn, successCallback, errorCallback, thenCallback) => {
    axios({
        method: 'get',
        url: 'https://ofertadecursos.uniandes.edu.co/api/courses?offset=0&limit=25&nameInput=' + crn,
    }).then((res) => {
        //console.log("Got course seat info: ", res.data[0])
        successCallback(res)
    }).catch((err) => {
        console.log(err)
        if (err.response) {
            console.log(err.response.status, err.message)
            if (err.response.status === 401) window.localStorage.setItem('token', null)
        }
        if (errorCallback) errorCallback(err)
    }).then(() => {
        if (thenCallback) thenCallback()
    })
}
import axios from "axios";
import {BACKEND_ADDRESS} from "../constants/model";

export const getToken = (window) => window.localStorage.getItem('token')


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
//TODO finish once the redux store has been formalized
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
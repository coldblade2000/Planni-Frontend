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
        console.log(err.response.status, err.message)
        if (err.response.status === 401) window.localStorage.setItem('token', null)
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
        console.log("Logged in user: ", res.data)
        successCallback(res)
    }).catch((err) => {
        console.log(err.response.status, err.response.data)
        if (err.response.status === 401) window.localStorage.setItem('token', null)
        if (errorCallback) errorCallback(err)
    })

}

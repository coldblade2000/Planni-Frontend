import axios from "axios";
import {BACKEND_ADDRESS} from "../constants/model";

export const logInUser = (token, successCallback, errorCallback) => {
    axios.get(BACKEND_ADDRESS + '/user/', {headers: {Authorization: `Bearer ${token}`}}).then((res) => {
        console.log("Logged in user: ", res.data)
        successCallback(res)
    }).catch((err) => {
        console.log(err.response.status, err.message)
        if (err.response.status === 401) window.localStorage.setItem('token', null)
        if (errorCallback) errorCallback(err)
    })
}


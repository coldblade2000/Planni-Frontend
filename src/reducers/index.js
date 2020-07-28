import {combineReducers} from "redux";
import {COURSE_ADDED} from "../actions/types";

const courseReducer = (courses = [], action)=>{
    if(action.type === COURSE_ADDED){
        return [...courses, action.payload]
    }
    return courses
}

export default combineReducers({
    courses : courseReducer
})
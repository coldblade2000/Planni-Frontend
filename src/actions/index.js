import {COURSE_ADDED} from "./types";

export const addCourse = (course)=>{
    return{
        type: COURSE_ADDED,
        payload: course
    }
}
import React, { useRef, useState} from "react";
import {DAYS} from "./Schedule";
import "./ScheduleContainer.css"
import ScheduleEventColumn from "./ScheduleEventColumn";
import {connect} from "react-redux";
import {addCourse} from "../../actions";
import {organizeDays} from "../../processing";

const ScheduleContainer = (props)=>{

    const overlayRef = useRef()
    const courseArray = props.courseArray
    const organizedDays = organizeDays(courseArray)



    return (
        <div className="scheduleContainer">
            <div className="scheduleContent">
                {props.contentHours}
            </div>
            <div className="scheduleOverlay" ref={overlayRef}>
                {DAYS.map((day)=>{
                    return <ScheduleEventColumn stickerArray={organizedDays[day]} initialHour={props.initialHour} key={day}/>
                })}
            </div>
        </div>
    )
}



const mapStateToProps = (state)=>{
    return {courseArray : state.courses}
}


export default connect(mapStateToProps, {addCourse})(ScheduleContainer)
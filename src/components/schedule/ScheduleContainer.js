import React, { useRef, useState} from "react";
import {DAYS} from "./Schedule";
import "./ScheduleContainer.css"
import ScheduleEventColumn from "./ScheduleEventColumn";
import {connect} from "react-redux";
import {addCourse} from "../../actions";
import {defaultArray} from "../../constants/model";
import {organizeDays} from "../../processing";

const ScheduleContainer = (props)=>{

    const overlayRef = useRef()
    const courseArray = props.courseArray
    const organizedDays = organizeDays(courseArray)


    //TODO remove debug button
    const [count, setCount] = useState(0)
    const onClickButton = ()=>{
        props.addCourse(defaultArray[count])
        setCount(count+1)
    }
    return (
        <div className="scheduleContainer">
            <button onClick={    onClickButton    }>Click me</button>
            <div className="scheduleContent">
                {props.contentHours}
            </div>
            <div className="scheduleOverlay" ref={overlayRef}>
                {DAYS.map((day)=>{
                    return <ScheduleEventColumn stickerArray={organizedDays[day]} key={day}/>
                })}
            </div>
        </div>
    )
}



const mapStateToProps = (state)=>{
    return {courseArray : state.courses}
}


export default connect(mapStateToProps, {addCourse})(ScheduleContainer)
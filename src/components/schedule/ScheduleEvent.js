import React from "react";
import './ScheduleEvent.css'

const ScheduleEvent = ({lengthInHours, color, title, subtitle}) =>{
    return(
        <div className="eventSticker"
             style={
                 {backgroundColor:color, height:""+(4*lengthInHours)+"rem"}
             }>
            <h4>{title}</h4>
            <p>{subtitle}</p>
        </div>
    )
}

export default ScheduleEvent
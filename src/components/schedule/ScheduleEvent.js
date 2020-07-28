import React from "react";
import './ScheduleEvent.css'
import {HOUR_HEIGHT} from "../../constants/style";

const ScheduleEvent = ({lengthInMinutes, color, title, subtitle, topOffset}) =>{
    return(
        <div className="eventSticker"
             style={
                 {
                     backgroundColor:color,
                     height:""+(lengthInMinutes/60*HOUR_HEIGHT)+"px",
                     top:topOffset+"px"
                 }
             }>
            <h4 className="stickerTitle">{title}</h4>
            <p className="stickerSubtitle">{subtitle}</p>
        </div>
    )
}

export default ScheduleEvent
import React from "react";
import './ScheduleEvent.css'
import {colors, HOUR_HEIGHT} from "../../constants/style";


//This is in charge of calling the css ScheduleEvent.css that contains the information for the set up
//This also recieves the color, title , subtitle information 

//TODO: Edit this to make it nicer. Even though the color and those properties should be somewhere else
const ScheduleEvent = ({lengthInMinutes, color, title, subtitle, topOffset, opacity = 1}) => {
    return (
        <div className="eventSticker"
             style={
                 {
                     backgroundColor: color,
                     height: "" + (lengthInMinutes / 60 * HOUR_HEIGHT) + "px",
                     top: topOffset + "px",
                     opacity: opacity
                 }
             }>
            <h4 className="stickerTitle">{title}</h4>
            <p className="stickerSubtitle">{subtitle}</p>
        </div>
    )
}


export default ScheduleEvent
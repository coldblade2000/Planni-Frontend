import React from "react";
import './ScheduleEvent.css'
import {HOUR_HEIGHT} from "../../constants/style";
import tinycolor2 from "tinycolor2";


//This is in charge of calling the css ScheduleEvent.css that contains the information for the set up
//This also recieves the color, title , subtitle information 

//TODO: Edit this to make it nicer. Even though the color and those properties should be somewhere else
const ScheduleEvent = ({lengthInMinutes, color, title, subtitle, topOffset, opacity = 1, campus}) => {
    let campusText = campus
    console.log(tinycolor2);
    switch (campus) {
        case 'VIRTUAL':
            //campusText = 'VIRTUAL'
            campusText = '(V)'
            break;
        case 'BLENDED - CAMPUS PRINCIPAL':
            //campusText = 'BLENDED'
            campusText = '(B)'
            break;
        default:
            break;
    }
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
            <h4 className="stickerTitle">{title + " " + campusText}</h4>
            <p className={"stickerSubtitle " + ((tinycolor2.default(color).isDark()) ? 'darkmodetext' : '')}>{subtitle}</p>
            {/*<p className="campus">{campusText}</p>*/}
        </div>
    )
}


export default ScheduleEvent
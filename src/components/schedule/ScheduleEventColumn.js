import React from 'react'
import {HOUR_HEIGHT} from "../../constants/style";
import ScheduleEvent from "./ScheduleEvent";
import "./ScheduleEventColumn.css"

const ScheduleEventColumn = ({stickerArray = [], initialHour}) => {
    return (
        <div className="column overlayColumn">
            <div className="innerOverColumn">
                {stickerArray.map((sticker) => renderSticker(sticker, initialHour))}
            </div>
        </div>
    )
}

const renderSticker = (stickerObject, initialscheduleHour) => {
    const [beginHour, beginMinute, endHour, endMinute] =
        returnHourValues(stickerObject.beginTime, stickerObject.endTime)
    console.log(`Begin hour: ${beginHour}, beginMinute: ${beginMinute}, endHour: ${endHour}, endMinute: ${endMinute}`)
    const beginTimeInMinutes = beginHour*60 + beginMinute
    const topValue = HOUR_HEIGHT * (beginTimeInMinutes - initialscheduleHour*60)/60
    console.log(topValue)
    let durationMins = ((endHour * 60 + endMinute) - (beginHour * 60 + beginMinute))

    return <ScheduleEvent key={stickerObject['CRN']}
                          lengthInMinutes={durationMins}
                          topOffset={topValue}
                          title={stickerObject.title}
                          subtitle={stickerObject.subtitle}
                          color={stickerObject.color}/>
}

const returnHourValues = (beginTime, endTime) => {
    const beginHour = parseInt(beginTime.substring(0, 2))
    const beginMinute = parseInt(beginTime.substring(2, 4))
    const endHour = parseInt(endTime.substring(0, 2))
    const endMinute = parseInt(endTime.substring(2, 4))
    return [beginHour, beginMinute, endHour, endMinute]
}

export default ScheduleEventColumn
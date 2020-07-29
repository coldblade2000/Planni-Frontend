import React, {useState} from "react";
import './Schedule.css'
import ScheduleContainer from "./ScheduleContainer";
import ScrollbarSize from "react-scrollbar-size";

export const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


const Schedule = (props) => {

    const [contentHours, sideHours] = generateDaysInRow([props.initialHour, props.finalHour] )
    const [scrollbarMargin, setScrollbarMargin] = useState(0)
    const scrollbarSizeChange = ({width}) => {
        setScrollbarMargin(width)
    }

    return (
        <div className="schedule">
            <div className="scheduleUpper">
                <div className="emptyTimeCol"></div>
                <ul className="scheduleDays" style={{marginRight: scrollbarMargin + "px"}}>
                    {DAYS.map((day) =>
                        <li className="scheduleUpperDay column" key={day}><p>{day}</p></li>)}
                </ul>
            </div>
            <div className="scheduleMain">
                <div className="timeColumn">
                    {sideHours}
                </div>
                <ScheduleContainer contentHours={contentHours} initialHour={props.initialHour}/>
            </div>
            <ScrollbarSize onChange={scrollbarSizeChange} style={{scrollbarWidth: 'thin'}}/>
        </div>
    )
}
Schedule.defaultProps = {
    initialHour: 6,
    finalHour: 20
}


const generateDaysInRow = (hourRangeArray) => {
    const listOfDays = []
    const [contentHours, sideHours] = generateHoursInColumn(hourRangeArray)
    for (const day of DAYS) {
        listOfDays.push(
            <div className="dayColumn column" key={day}>
                {contentHours}
            </div>
        )
    }
    return [listOfDays, sideHours]
}

const generateHoursInColumn = ([initialHour, finalHour]) => {
    if (finalHour < initialHour) {
        throw new Error("Final hour comes before the initial hour")
    }
    if (initialHour < 0 || finalHour >= 24) {
        throw new Error("Hour range is not correct")
    }
    const listOfContentHours = []
    const listOfSideHours = []
    for (let currentHour = Math.floor(initialHour); currentHour < Math.ceil(finalHour + 1); currentHour++) {
        listOfContentHours.push(
            <div className="hour hourContent" key={currentHour}>
                <div className="halfHourContent"/>
                <div className="halfHourContent"/>
            </div>
        )
        listOfSideHours.push(
            <div className="hour hourNumber" key={currentHour}>
                {getHourString(currentHour)}
            </div>
        )
    }
    return [listOfContentHours, listOfSideHours]
}

const getHourString = (hour) => {
    let hourNum = (Math.floor(hour) % 12)
    if (hourNum === 0)
        hourNum = 12
    const meridianString = (hour >= 12) ? "PM" : "AM"
    return `${hourNum} ${meridianString}`
}

export default Schedule
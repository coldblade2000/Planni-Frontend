import React from "react";
import './Schedule.css'
import ScheduleEvent from "./ScheduleEvent";
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


const Schedule = (props)=>{

    const [contentHours,sideHours] = generateDaysInRow({initialHour:6,finalHour:20})

    return (
        <div className="schedule">
            <div className="scheduleUpper">
                <div className="emptyTimeCol"></div>
                <ul className="scheduleDays">
                    {DAYS.map((day)=>
                        <li className="scheduleUpperDay column" key={day}><p>{day}</p></li>)}
                </ul>
            </div>
            <div className="scheduleMain">
                <div className="timeColumn">
                    {sideHours}
                </div>
                <div className="scheduleContainer">
                    <div className="scheduleContent">
                        {contentHours}
                    </div>
                    <div className="scheduleOverlay">
                        <ScheduleEvent title="Title"
                                       subtitle="lorem ipsum is a total bro"
                                       color="#4CAF50"
                                       lengthInHours={2}/>

                    </div>
                </div>
            </div>
        </div>
    )
}


const generateDaysInRow = (hourRangeObject)=>{
    const listOfDays = []
    const [contentHours, sideHours] = generateHoursInColumn(hourRangeObject)
    for (const day of DAYS) {
        listOfDays.push(
            <div className="dayColumn column" key={day}>
                {contentHours}
            </div>
        )
    }
    return [listOfDays, sideHours]
}

const generateHoursInColumn = ({initialHour, finalHour})=>{
    if(finalHour<initialHour){
        throw new Error("Final hour comes before the initial hour")
    }
    if (initialHour < 0 || finalHour>=24){
        throw new Error("Hour range is not correct")
    }
    const listOfContentHours = []
    const listOfSideHours = []
    for (let currentHour = Math.floor(initialHour); currentHour < Math.ceil(finalHour+1); currentHour++) {
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

const getHourString = (hour)=>{
    let hourNum = (Math.floor(hour)%12)
    if(hourNum==0)
        hourNum = 12
    const meridianString = (hour >=12) ? "PM" : "AM"
    return `${hourNum} ${meridianString}`
}

export default Schedule
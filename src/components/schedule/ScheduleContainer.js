import React, { useEffect, useRef} from "react";
import {DAYS} from "./Schedule";
import "./ScheduleContainer.css"
import ScheduleEventColumn from "./ScheduleEventColumn";
import {getRandomColor} from "../../constants/style";

const ScheduleContainer = (props)=>{
    const overlayRef = useRef()
    const organizedDays = organizeDays(defaultArray)

    return (
        <div className="scheduleContainer">
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

const organizeDays = (coursesArray)=>{
    const meetingDays = {
        'SUN': [],
        'MON': [],
        'TUE': [],
        'WED': [],
        'THU': [],
        'FRI': [],
        'SAT': []
    }
    for (const course of coursesArray) {
        const color = getRandomColor()
        for (const meeting of course.meetings) {
            const meetingObj = {
                title: course.courseIdentifier,
                subtitle: course.courseTitle,
                'CRN':course['CRN'],
                beginTime: meeting.beginTime,
                endTime: meeting.endTime,
                color: color
            }
            const days = meeting.activeDays
            if(days.sunday)   meetingDays['SUN'].push(meetingObj)
            if(days.monday)   meetingDays['MON'].push(meetingObj)
            if(days.tuesday)   meetingDays['TUE'].push(meetingObj)
            if(days.wednesday)   meetingDays['WED'].push(meetingObj)
            if(days.thursday)   meetingDays['THU'].push(meetingObj)
            if(days.friday)   meetingDays['FRI'].push(meetingObj)
            if(days.saturday)   meetingDays['SAT'].push(meetingObj)
        }
    }
    return meetingDays
}

const defaultArray = [{ "_id" : '', "CRN" : 36248, "term" : 202020, "subjectShort" : "ISIS", "courseNumber" : "1104", "subjectLong" : "INGENIERIA DE SISTEMAS", "campusDescription" : "VIRTUAL", "scheduleTypeDescription" : "TEORICA", "courseTitle" : "MATEM&Aacute;TICA ESTRUCTURAL Y L&Oacute;GICA", "maximumSeats" : 40, "currentSeats" : 0, "emptySeats" : 40, "credits" : 3, "openSection" : true, "courseIdentifier" : "ISIS1104", "faculty" : [ { "_id" : '', "bannerId" : "194810841", "displayName" : "CARDOZO RODRIGUEZ, RODRIGO", "email" : "rcardoso@uniandes.edu.co", "isPrimary" : true } ], "meetings" : [ { "_id" : '', "beginTime" : "1000", "endTime" : "1115", "building" : "VIRTUAL", "campus" : "VIRTUAL", "startDate" : "08/10/2020", "endDate" : "12/05/2020", "activeDays" : { "monday" : false, "tuesday" : true, "wednesday" : false, "thursday" : true, "friday" : false, "saturday" : false, "sunday" : false } }, { "_id" : '', "beginTime" : "1000", "endTime" : "1115", "building" : "VIRTUAL", "campus" : "VIRTUAL", "startDate" : "08/10/2020", "endDate" : "12/05/2020", "activeDays" : { "monday" : false, "tuesday" : false, "wednesday" : false, "thursday" : false, "friday" : true, "saturday" : false, "sunday" : false } } ], "totalActiveDays" : { "monday" : false, "tuesday" : true, "wednesday" : false, "thursday" : true, "friday" : true, "saturday" : false, "sunday" : false }, "__v" : 0 },
    { "_id" : '', "CRN" : 11209, "term" : 202020, "subjectShort" : "ISIS", "courseNumber" : "1104", "subjectLong" : "INGENIERIA DE SISTEMAS", "campusDescription" : "VIRTUAL", "scheduleTypeDescription" : "TEORICA", "courseTitle" : "MATEM&Aacute;TICA ESTRUCTURAL Y L&Oacute;GICA", "maximumSeats" : 40, "currentSeats" : 0, "emptySeats" : 40, "credits" : 3, "openSection" : true, "courseIdentifier" : "ISIS1104", "faculty" : [ { "_id" : '', "bannerId" : "201216454", "displayName" : "SANCHEZ OTALORA, NELSON", "email" : "na.sanchez162@uniandes.edu.co", "isPrimary" : true } ], "meetings" : [ { "_id" : '', "beginTime" : "1300", "endTime" : "1415", "building" : "VIRTUAL", "campus" : "VIRTUAL", "startDate" : "08/10/2020", "endDate" : "12/05/2020", "activeDays" : { "monday" : false, "tuesday" : true, "wednesday" : false, "thursday" : true, "friday" : false, "saturday" : false, "sunday" : false } }, { "_id" : '', "beginTime" : "1300", "endTime" : "1415", "building" : "VIRTUAL", "campus" : "VIRTUAL", "startDate" : "08/10/2020", "endDate" : "12/05/2020", "activeDays" : { "monday" : false, "tuesday" : false, "wednesday" : false, "thursday" : false, "friday" : true, "saturday" : false, "sunday" : false } } ], "totalActiveDays" : { "monday" : false, "tuesday" : true, "wednesday" : false, "thursday" : true, "friday" : true, "saturday" : false, "sunday" : false }, "__v" : 0 },
    { "_id" : '', "CRN" : 22759, "term" : 202020, "subjectShort" : "ISIS", "courseNumber" : "1104", "subjectLong" : "INGENIERIA DE SISTEMAS", "campusDescription" : "VIRTUAL", "scheduleTypeDescription" : "TEORICA", "courseTitle" : "MATEM&Aacute;TICA ESTRUCTURAL Y L&Oacute;GICA", "maximumSeats" : 40, "currentSeats" : 0, "emptySeats" : 40, "credits" : 3, "openSection" : true, "courseIdentifier" : "ISIS1104", "faculty" : [ { "_id" : '', "bannerId" : "201216454", "displayName" : "SANCHEZ OTALORA, NELSON", "email" : "na.sanchez162@uniandes.edu.co", "isPrimary" : true } ], "meetings" : [ { "_id" : '', "beginTime" : "1600", "endTime" : "1715", "building" : "VIRTUAL", "campus" : "VIRTUAL", "startDate" : "08/10/2020", "endDate" : "12/05/2020", "activeDays" : { "monday" : false, "tuesday" : true, "wednesday" : false, "thursday" : false, "friday" : true, "saturday" : false, "sunday" : false } }, { "_id" : '', "beginTime" : "1600", "endTime" : "1715", "building" : "VIRTUAL", "campus" : "VIRTUAL", "startDate" : "08/10/2020", "endDate" : "12/05/2020", "activeDays" : { "monday" : false, "tuesday" : false, "wednesday" : false, "thursday" : true, "friday" : false, "saturday" : false, "sunday" : false } } ], "totalActiveDays" : { "monday" : false, "tuesday" : true, "wednesday" : false, "thursday" : true, "friday" : true, "saturday" : false, "sunday" : false }, "__v" : 0 }]

export default ScheduleContainer
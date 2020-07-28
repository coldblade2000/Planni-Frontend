import {getRandomColor} from "./constants/style";
import {StickerClass} from "./components/schedule/StickerClass";

export const organizeDays = (coursesArray)=>{
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
            const meetingObj = new StickerClass(course, meeting, color)
            /*const meetingObj = {
                title: course.courseIdentifier,
                subtitle: course.courseTitle,
                'CRN':course['CRN'],
                beginTime: meeting.beginTime,
                endTime: meeting.endTime,
                color: color
            }*/
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
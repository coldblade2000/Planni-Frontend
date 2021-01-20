import {getManyRandomColors} from "../constants/style";
import {StickerClass} from "../components/schedule/StickerClass";

//This is responsible for sending the selected courses to the schedule
/**
 * Organizes the list of meetings for each day of the week.
 * @param coursesArray
 * @returns {{THU: [], TUE: [], WED: [], SAT: [], FRI: [], SUN: [], MON: []}}
 */
export const organizeDays = (coursesArray = []) => {
    const meetingDays = {
        'SUN': [],
        'MON': [],
        'TUE': [],
        'WED': [],
        'THU': [],
        'FRI': [],
        'SAT': []
    }
    for (let i = 0; i<coursesArray.length; i++) {
        const course = coursesArray[i]
        const color = getManyRandomColors(i, course.CRN)
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
            if (days.monday) meetingDays['MON'].push(meetingObj)
            if (days.tuesday) meetingDays['TUE'].push(meetingObj)
            if (days.wednesday) meetingDays['WED'].push(meetingObj)
            if (days.thursday) meetingDays['THU'].push(meetingObj)
            if (days.friday) meetingDays['FRI'].push(meetingObj)
            if (days.saturday) meetingDays['SAT'].push(meetingObj)
        }
    }
    return meetingDays
}

/**
 * Returns whether the object in question is null or empty.
 * @param obj - object to be tested
 * @returns {boolean}
 */
export function isEmpty(obj) {
    if (!obj) return true
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}



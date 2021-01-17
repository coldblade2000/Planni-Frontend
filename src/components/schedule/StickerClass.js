export class StickerClass {

    constructor(course, meeting, color) {
        const subtitle = course.courseTitle + "\n" + findPrimaryFaculty(course)
        this.title = course.courseIdentifier;
        this.subtitle = subtitle;
        this['CRN'] = course['CRN'];
        this.beginTime = meeting.beginTime;
        this.campus = meeting.campus
        this.endTime = meeting.endTime;
        this.color = color;
        this.isHighlight = course.isHighlight
    }
}

const findPrimaryFaculty = (course) => {
    for (const professor of course['faculty']) {
        if (professor['isFaculty'] === true) {
            //return professor.displayName

            let prof = professor.displayName.split(",");
            let fName = prof[1].split(" ")
            if (fName.length >= 2) {
                fName = fName[0].charAt(1).toUpperCase() + fName[1].charAt(2).toLowerCase();
            } else {
                fName = fName[0].charAt(1).toUpperCase();
            }
            let lName = prof[0].split(" ");//First last Name
            if (lName.length === 3) {
                lName = lName[0] + " " + lName[1];
            } else {
                lName = lName[0];
            }
            return fName + "." + lName
        }
    }
    if (course['faculty'].length === 0) {
        return null
    } else {
        //return course['faculty'][0].displayName

        let prof = course['faculty'][0].displayName.split(",");
        let fName = prof[1].split(" ")
        fName[0] = fName[0].trim()
        if (fName.length >= 2) {
            fName[1] = fName[1].trim();
            fName = fName[0].charAt(0).toUpperCase() + fName[1].charAt(0).toUpperCase();
        } else {
            fName = fName[0].charAt(1).toUpperCase();
        }
        let lName = prof[0].split(" ");//First last Name
        if (lName.length === 3) {
            lName = lName[0] + " " + lName[1];
        } else {
            lName = lName[0];
        }
        return fName + "." + lName
    }
}
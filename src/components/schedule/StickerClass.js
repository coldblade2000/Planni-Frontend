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
    if (course['faculty'].length === 0) {
        return null
    } else {
        let prof = undefined;
        for (const professor of course['faculty']) {
            if (professor['isPrimary'] === true) {
                prof = professor.displayName.split(",");
            }
        }
        if (!prof) {
            prof = course['faculty'][0].displayName.split(",");
        }
        const firstNames = prof[1].split(" ")
        const lastNames = prof[0].split(" ")

        let firstNameInitials = ""
        for (let firstName of firstNames) {
            firstName = firstName.trim()
            if (firstName.length > 0) {
                firstNameInitials += firstName.toUpperCase().charAt(0) + "."
            }
        }
        return titleCase(`${firstNameInitials} ${titleCase(lastNames[0])}`)
    }
}

function titleCase(str) {
    return str.replace(/(^|\s)\S/g, function (t) {
        return t.toUpperCase()
    });
}

export class StickerClass {
    constructor(course, meeting, color) {
        this.title = course.courseIdentifier;
        this.subtitle = course.courseTitle;
        this['CRN'] = course['CRN'];
        this.beginTime = meeting.beginTime;
        this.endTime = meeting.endTime;
        this.color = color;
    }
}
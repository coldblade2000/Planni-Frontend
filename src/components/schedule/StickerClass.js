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
const findPrimaryFaculty = (course)=>{
    for (const professor of course['faculty']){
        if(professor['isFaculty']===true){
            //return professor.displayName
           
            var prof = professor.displayName.split(",");
            var fName = prof[1].toLowerCase(); //First Letter of First Name
            fName = fName.charAt(1).toUpperCase();
            var lName = prof[0].split(" ")[0];//First last Name
            var profAbreviation = fName + "." + lName;
            return profAbreviation
        }
    }
    if (course['faculty'].length===0){
        return null
    }else{
        //return course['faculty'][0].displayName
        
        var prof = course['faculty'][0].displayName.split(",");
        var fName = prof[1].toLowerCase(); //First Letter of First Name
        fName = fName.charAt(1).toUpperCase();
        var lName = prof[0].split(" ");//First last Name
        if(lName.length == 3){
            lName = lName[0] + " " + lName[1];
        }
        else{
            lName = lName[0];
        }
        var profAbreviation = fName + "." + lName;
        return profAbreviation
    }
}
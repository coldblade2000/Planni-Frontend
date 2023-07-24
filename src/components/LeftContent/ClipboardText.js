import React, {useState} from 'react';
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

function ClipboardText({children, copyText}) {
    const [active, setActive] = useState(false)

    function onTextClick(e) {
        navigator.clipboard.writeText(`${copyText}`.trim())
        setActive(true)
    }

    return (
        <a onClick={onTextClick} className={`clipboardText ${active ? 'active' : ''}`}
           onAnimationEnd={() => setActive(false)}
        >
            <p>{children}</p>
        </a>
    );
}

function ClipboardIcon({course, primaryTeacherName}) {
    const [active, setActive] = useState(false)

    function convertTo12HourFormat(timeString) {
        if (timeString.length !== 4) {
            throw new Error("Invalid time format. Time should be in 24-hour format like '1345'.");
        }

        const hours = parseInt(timeString.substr(0, 2));
        const minutes = parseInt(timeString.substr(2, 2));

        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            throw new Error("Invalid time format. Time should be in 24-hour format like '1345'.");
        }

        let period = "AM";
        let twelveHour = hours;

        if (hours >= 12) {
            period = "PM";
            twelveHour = hours === 12 ? 12 : hours - 12;
        }

        return `${twelveHour}:${minutes.toString().padStart(2, '0')}${period}`;
    }

    function onTextClick(e) {
        let copy =
            `
### ${course.courseIdentifier} ${course.courseTitle}

- ${primaryTeacherName} | CRN: ${course._id} | ${course.campusDescription}

`
        course.meetings.forEach((meet) => {
            const beginTime = convertTo12HourFormat(meet.beginTime)
            const endTime = convertTo12HourFormat(meet.endTime)

            const englishDays = Object.keys(meet.activeDays);

            const spanishDays = {
                Sunday: "Domingo",
                Monday: "Lunes",
                Tuesday: "Martes",
                Wednesday: "Miércoles",
                Thursday: "Jueves",
                Friday: "Viernes",
                Saturday: "Sábado",
            };

            const selectedSpanishDays = englishDays.filter((day) => meet.activeDays[day]).map((day) => spanishDays[day]);

            copy = copy +
                `   ${beginTime}-${endTime} ${selectedSpanishDays.join(', ')}\n\n`
        })
        navigator.clipboard.writeText(copy)
        setActive(true)
    }

    return (
        <ContentPasteIcon sx={{marginLeft: '4px', fontSize: '1rem', verticalAlign: 'middle'}}
                          onClick={onTextClick}
                          className={active ? 'active' : ''}
                          onAnimationEnd={() => setActive(false)}
        />
    );
}

export {ClipboardText, ClipboardIcon};
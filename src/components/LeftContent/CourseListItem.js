import React, {useState} from 'react'
import {connect} from "react-redux";
import {addedSection, highlightSection, removedSection} from "../../redux/actions";
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Button, Card, CardContent, IconButton, Typography} from "@mui/material";
import '../stylesheets/CourseListItem.css';
import {getListItemSeats, getToken} from "../../model/networking";
import ReplayIcon from '@mui/icons-material/Replay';
import WeekDaysPillbox from "./WeekDaysPillbox";


/**
 * [This funtion sets up a course list item,, which is an element that contains and displays the information for a section for a specific course]
 * @param props
 * @return Html and Css to display the course. Info inculded CRN, Course ID, Course identifier
 */
const CourseListItem = (props) => {
    const [isAlreadyDisplayed, setIsAlreadyDisplayed] = useState(props.isAlreadyAdded || false)
    const [seatsLeft, setSeatsLeft] = useState('?')
    const [maxSeats, setMaxSeats] = useState('?')


    //The element that contains the information of a specifici course
    const COURSE = props.course

    const updateSeats = () => {
        setSeatsLeft('?')
        setMaxSeats('?')
        getListItemSeats(COURSE._id, (res) => {
            if (res.data && res.data[0]) {
                const data = res.data[0]
                setSeatsLeft(data.seatsavail)
                setMaxSeats(data.maxenrol)
            } else {
                console.warn("Couldn't retrieve seat data for a course with CRN : " + COURSE._id, res)
            }
        })
    }

    useState(() => {
        updateSeats()
    })


    const classes = useStyles(props)

    //When a course has been aded to the schedule with the '+' button 
    const handleAddClick = (e) => {
        COURSE.isHighlight = false
        props.addedSection(COURSE, getToken(window))
        props.onChangeCallback()
        setIsAlreadyDisplayed(true)
    }

    //When a course has been removed from the schedule with the '-' button
    const handleRemoveClick = (e) => {
        COURSE.isHighlight = false
        props.removedSection(COURSE, getToken(window))
        props.onChangeCallback()
        setIsAlreadyDisplayed(false)
    }


    //When hovering over a course in the course list it Shows how the course should look on the Schedule
    const handleStartHover = (e) => {
        if (!isAlreadyDisplayed) props.highlightSection(COURSE)
    }


    //When one stops hovering its removes the preview of the course from the schedule
    const handleEndHover = (e) => {
        props.highlightSection(null)
    }

    let primaryTeacherName = undefined
    for (let faculty of COURSE.faculty) {
        if (faculty.isPrimary === true) {
            let primaryTeacherNameArray = faculty.displayName.split(",");
            let lastName = primaryTeacherNameArray[0];
            let firstName = primaryTeacherNameArray[1];
            primaryTeacherName = firstName + " " + lastName;
            break;
            
            //primaryTeacherName = faculty.displayName
            //break;
        }
    }

    return (
        //This displays the course information for a particular section in a vertical format.
        //When mouse hover over button preview the course section on the schedule. When the mouse is no longer ther remove the preview from the schedule.
        //When + or - clicked it the course will be added or removed from the schedule    


        //Info displayed:
        //Course name
        //Course identifier
        //Course ID (CRN)
        //TODO(VEA): Add more relevant info here. Check the database info for each section. 
        //Should add, main teacher, activedays the classes arre and some other relevant information

        <Card variant="outlined" className={classes.card} onMouseEnter={handleStartHover} onMouseLeave={handleEndHover}
              sx={{flexDirection: 'row', display: 'flex'}}>
            <CardContent className={classes.root} sx={{padding: '0px'}}>
                <div className={classes.content}>
                    <Typography variant="h6" className={classes.courseTitle}
                                sx={{fontWeight: '800', fontSize: '1rem'}}
                    >
                        {COURSE.courseTitle}
                    </Typography>
                    <div className='halfContainer'>
                        <div className="contentHalf">
                            <p className={classes.courseIdentifier}>{COURSE.courseIdentifier}</p>
                            <p className={classes.CRN}>CRN: {COURSE._id}</p>
                            <p className={classes.campusDescription}>{COURSE.campusDescription}</p>
                            <p className={classes.sectionNumber}>Seccion: {COURSE.sectionNumber}</p>
                        </div>
                        <div className="contentHalf">
                            <p>{primaryTeacherName}</p>
                            <p className={parseInt(seatsLeft) <= 0 ? "emptyClass" : undefined}>Seats: {`${seatsLeft <= 0 ? 0 : seatsLeft}/${maxSeats}`}
                                <IconButton onClick={updateSeats} size="large"><ReplayIcon/></IconButton>
                            </p>
                        </div>
                        <WeekDaysPillbox totalActiveDays={COURSE.totalActiveDays}/>
                    </div>
                </div>
            </CardContent>
            <Button color='primary' variant={(isAlreadyDisplayed) ? 'contained' : 'outlined'}
                    onClick={(isAlreadyDisplayed) ? handleRemoveClick : handleAddClick}
                    sx={{padding: '0 0.5rem', minWidth: "1rem"}}
            >
                {isAlreadyDisplayed ? <RemoveIcon/> : <AddIcon/>}
            </Button>
        </Card>
    );


}


//Styles for the
const useStyles = makeStyles({
    root: {

        padding: '8px 0',
        margin: '16px 0',
        //background: '#bbdefb',
        //color: '#5D7DD7',
        display: 'flex',
        flexDirection: 'row'
    },
    card: {
        margin: '16px'
    },
    button: {
        height: '100%',
    },
    courseTitle: {
        fontWeight: '800'
    },
    content: {
        flexGrow: 1,
        paddingLeft: '16px',
    }
})

export default connect(null, {highlightSection, addedSection, removedSection})(CourseListItem)
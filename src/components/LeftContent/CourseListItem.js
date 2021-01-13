import React, {useState} from 'react'
import {connect} from "react-redux";
import {addedSection, highlightSection, removedSection} from "../../redux/actions";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {Divider} from "@material-ui/core";
import '../stylesheets/CourseListItem.css'
import {getToken} from "../../model/networking";

const CourseListItem = (props) => {
    const [isAlreadyDisplayed, setIsAlreadyDisplayed] = useState(props.isAlreadyAdded || false)

    const COURSE = props.course
    const classes = useStyles(props)

    const handleAddClick = (e) => {
        COURSE.isHighlight = false
        props.addedSection(COURSE, getToken(window))
        props.onChangeCallback()
        setIsAlreadyDisplayed(true)
    }

    const handleRemoveClick = (e) => {
        COURSE.isHighlight = false
        props.removedSection(COURSE, getToken(window))
        props.onChangeCallback()
        setIsAlreadyDisplayed(false)

    }

    const handleStartHover = (e) => {
        if (!isAlreadyDisplayed) props.highlightSection(COURSE)
    }

    const handleEndHover = (e) => {
        props.highlightSection(null)
    }

    return (
        <div className={classes.root} onMouseEnter={handleStartHover} onMouseLeave={handleEndHover}>
            <div>
                <p className={classes.courseTitle}>{COURSE.courseTitle}</p>
                <p className={classes.courseIdentifier}>{COURSE.courseIdentifier}</p>
                <p className={classes.CRN}>{COURSE._id}</p>
            </div>
            <Divider orientation="vertical" flexitem/>
            <button onClick={(isAlreadyDisplayed) ? handleRemoveClick : handleAddClick}>
                {isAlreadyDisplayed ? <RemoveIcon/> : <AddIcon/>}
            </button>
        </div>
    )


}


const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '8px',
        color: '#5D7DD7',
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        height: '100%',
    },
    courseTitle: {
        fontWeight: 'bold'
    },
})

export default connect(null, {highlightSection, addedSection, removedSection})(CourseListItem)
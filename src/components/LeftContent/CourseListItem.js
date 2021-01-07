import React from 'react'
import {connect} from "react-redux";
import {highlightSection} from "../../redux/actions";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import {Divider} from "@material-ui/core";

const CourseListItem = (props) => {
    const COURSE = props.course
    const classes = useStyles(props)

    const handleAddClick = (e) => {
        props.highlightSection(COURSE)
    }

    return (
        <div className={classes.root}>
            <div>
                <p className={classes.courseTitle}>{COURSE.courseTitle}</p>
                <p className={classes.courseIdentifier}>{COURSE.courseIdentifier}</p>
            </div>
            <Divider orientation="vertical" flexitem/>
            <button>
                <AddIcon onClick={handleAddClick}/>
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

export default connect(null, {highlightSection})(CourseListItem)
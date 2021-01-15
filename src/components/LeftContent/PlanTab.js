import React from 'react';
import {connect} from 'react-redux';
import CourseList from "./CourseList";
import {Divider, Typography} from "@material-ui/core";
import '../stylesheets/PlanTab.css'

const PlanTab = (props) => {

    const calculateCredits = () => {
        let num = 0
        for (let course of props.plan.courseList) {
            if (course.credits) num = num + course.credits
        }
        return num
    }

    return (
        <div className="plantab">
            <div className="topInfo headerItem">
                <Typography variant='h3'>{props.plan.name}</Typography>
            </div>
            <Divider/>
            <Typography className="headerItem centertext" variant="subtitle1" gutterBottom>
                {`You have selected ${calculateCredits()} credits`}
            </Typography>
            <CourseList usesSearch={false}/>
        </div>
    )
}


function mapStateToProps(state) {
    return {plan: state.selectedPlan};
}

export default connect(mapStateToProps, null)(PlanTab);
import React from 'react';
import {connect} from 'react-redux';
import CourseList from "./CourseList";

const PlanTab = (props) => {

    return (
        <CourseList usesSearch={false}/>
    )
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, null)(PlanTab);
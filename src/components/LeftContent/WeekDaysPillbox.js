import React from 'react';
import './WeekDay.css';

const WeekDaysPillbox = ({totalActiveDays}) => {


    return (
        <div className="activeWeekDaysPilbox">
            <ul id="menu">
                <li className={`weekDay ${totalActiveDays.sunday ? "dayEnabled" : "dayDisabled"}`}>Do</li>
                <li className={`weekDay ${totalActiveDays.monday ? "dayEnabled" : "dayDisabled"}`}>Lu</li>
                <li className={`weekDay ${totalActiveDays.tuesday ? "dayEnabled" : "dayDisabled"}`}>Ma</li>
                <li className={`weekDay ${totalActiveDays.wednesday ? "dayEnabled" : "dayDisabled"}`}>Mi</li>
                <li className={`weekDay ${totalActiveDays.thursday ? "dayEnabled" : "dayDisabled"}`}>Ju</li>
                <li className={`weekDay ${totalActiveDays.friday ? "dayEnabled" : "dayDisabled"}`}>Vi</li>
                <li className={`weekDay ${totalActiveDays.saturday ? "dayEnabled" : "dayDisabled"}`}>Sa</li>
            </ul>
        </div>
    )
}


export default WeekDaysPillbox;
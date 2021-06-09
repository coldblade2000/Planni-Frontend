import React, {useState} from 'react'
import {Button, Chip, TextField} from "@material-ui/core";
import '../stylesheets/SearchPanel.css'
//This is the search bar
//This deals with the process of searching for a course by its department code (ej: ISIS) and course number (ej:1104)

const SearchPanel = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [CRN, setCRN] = useState('')
    const [credits, setCredits] = useState('')
    const [creditsIneq, setCreditsIneq] = useState('')
    const [days, setDays] = useState({
        "monday": null,
        "tuesday": null,
        "wednesday": null,
        "thursday": null,
        "friday": null,
        "saturday": null,
        "sunday": null
    })
    const [campus, setCampus] = useState('')

    //Handles the submition to search for a new course 
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //alert('Click')
        props.onSubmitSearch({
            CRN,
            searchTerm,
            credits,
            creditsIneq,
            days,
            campus

        })
    }

    const onDayClick = (day) => {
        const newDays = {...days}
        let dayValue = newDays[day]
        switch (dayValue) {
            case true:
                newDays[day] = false
                break;
            case false:
                newDays[day] = null
                break;
            case null:
                newDays[day] = true
                break;
            default:
                break;
        }
        console.log("Setting days to: ", newDays)
        setDays(newDays)
    }

    const getChipColor = (dayVal) => {
        switch (dayVal) {
            case true:
                return "primary"
            case false:
                return "secondary"
            default:
                return undefined
        }
    }

    const renderDays = () => {
        const renderedDayList = []
        for (let day in days) {
            const dayBool = days[day]
            renderedDayList.push(<Chip
                key={day}
                clickable
                color={getChipColor(dayBool)}
                onClick={() => onDayClick(day)}
                label={day}
                className="dayChip searchElement"
            />)
        }
        return renderedDayList
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <TextField label="Course Identifier"
                       variant="outlined"
                       value={searchTerm}
                       className="searchElement"
                       onChange={e => setSearchTerm(e.target.value)}
            />
            <TextField label="CRN"
                       variant="outlined"
                       type="number"
                       className="searchElement"
                       value={CRN}
                       onChange={e => setCRN(e.target.value)}
            />
            <div className="chipDiv">
                {renderDays()}
            </div>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    );
}

export default SearchPanel

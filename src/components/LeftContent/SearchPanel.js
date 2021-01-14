import React, {useState} from 'react'
import {Button, TextField} from "@material-ui/core";

//This is the search bar
//This deals with the process of searching for a course by its department code (ej: ISIS) and course number (ej:1104)

const SearchPanel = (props)=>{
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

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#e2f1f8',
            margin: '16px'
        }}>
            <TextField label="Course Identifier"
                       variant="filled"
                       value={searchTerm}
                       onChange={e => setSearchTerm(e.target.value)}
            />
            <TextField label="CRN"
                       variant="filled"
                       type="number"
                       value={CRN}
                       onChange={e => setCRN(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    );
}

export default SearchPanel
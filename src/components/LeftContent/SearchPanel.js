import React, {useState} from 'react'

const SearchPanel = (props)=>{
    const [searchTerm, setSearchTerm] = useState('ISIS1104')
    const [CRN, setCRN] = useState(null)
    const [credits, setCredits] = useState(null)
    const [creditsIneq, setCreditsIneq] = useState(null)
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

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Search Term:
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e=>setSearchTerm(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default SearchPanel
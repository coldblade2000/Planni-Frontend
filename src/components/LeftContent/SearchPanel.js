import React, {useState} from 'react'

const SearchPanel = (props)=>{
    const [searchTerm, setSearchTerm] = useState('')
    const [CRN, setCRN] = useState(null)
    const [credits, setCredits] = useState(null)
    const [creditsIneq, setCreditsIneq] = useState(null)
    const [days, setDays] = useState(new Array(7))
    const [campus, setCampus] = useState('VIRTUAL')

    const handleSubmit = (evt) => {
        evt.preventDefault();
        //TODO handle event
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
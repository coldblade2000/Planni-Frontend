import React from 'react'
import {connect} from "react-redux";
import SearchPanel from "./SearchPanel";
import CourseList from "./CourseList";
import axios from "axios";
import {BACKEND_ADDRESS} from "../../constants/model";
import {courseSearchCompleted} from "../../redux/actions";
import {isEmpty} from "../../model/processing";
import {Divider} from "@mui/material";

const SearchTab = (props) => {
    //const classes = useStyles();

    const onSubmitSearch = (obj) => {
        //TODO Stop assuming the search term is just straight-up the course Identifier
        const properSearchTerm = {}
        if (obj.CRN) properSearchTerm.CRN = obj.CRN
        if (obj.searchTerm && obj.searchTerm.length > 3 && obj.searchTerm.length <= 8) properSearchTerm.courseIdentifier = {"$regex": `.*${obj.searchTerm}.*`}
        if (obj.credits) properSearchTerm.credits = obj.credits
        //if (obj.creditsIneq) properSearchTerm.creditsIneq = obj.creditsIneq
        if (obj.campus && obj.campus.length > 0) properSearchTerm.campusDescription = obj.campus

        if (obj.days) {
            //const totalActiveDays = {}
            for (let day in obj.days) {
                if (obj.days[day] !== null)
                    properSearchTerm[`totalActiveDays.${day}`] = obj.days[day]
                //totalActiveDays[day] = obj.days[day]
            }
            //if (!isEmpty(totalActiveDays)) properSearchTerm.totalActiveDays = totalActiveDays
        }
        console.log("Search query: ", properSearchTerm)
        if (!isEmpty(properSearchTerm)) {
            console.log(BACKEND_ADDRESS)
            axios.get(BACKEND_ADDRESS + '/courses/', {
                params: {
                    q: JSON.stringify(properSearchTerm)
                }
            }).then((res) => {
                if (res.status === 200) {
                    props.courseSearchCompleted(res.data)
                }
            }).catch((error) => console.log(error))
        }
    }


    return (
        <div>
            <SearchPanel onSubmitSearch={onSubmitSearch}/>
            <Divider/>
            <CourseList usesSearch={true}/>
        </div>
    )
}


/*const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));*/

export default connect(null, {courseSearchCompleted})(SearchTab)

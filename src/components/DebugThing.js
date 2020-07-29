import React, {useState} from "react";
import {defaultArray} from "../constants/model";
import {connect} from "react-redux";
import {addCourse} from "../actions";


const DebugThing = (props)=>{

    const [count, setCount] = useState(0)
    const onClickButton = ()=>{
        props.addCourse(defaultArray[count])
        setCount(count+1)
    }
    return(
        <button onClick={    onClickButton    }>Click me</button>
    )
}

export default connect(null, {addCourse})(DebugThing)
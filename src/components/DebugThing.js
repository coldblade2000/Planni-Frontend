import React, {useState} from "react";
import axios from 'axios'
import {connect} from 'react-redux'
import {addCourse} from "../actions";

class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();

        if (this.state.value.length===8){
            axios.get(`http://localhost:3001/courses/${this.state.value}`).then((res)=>{
                console.log(res)
                for (const course of res.data) {
                    this.props.addCourse(course)
                }
            })
        }else{
            alert('Enter correct ID')
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default connect(null, {addCourse})(CourseForm)


/*const DebugThing = (props) => {

    const [count, setCount] = useState(0)
    const onClickButton = () => {
        props.addCourse(defaultArray[count])
        setCount(count + 1)
    }
    return (
        <div className="search">
            <form><label htmlFor="courseSearch">Course Identifier (e.g. 'ISIS1104')</label>
                <input type="text" name="courseSearch" id="courseSearch"/>
                <button onClick={onClickButton}>Click me</button>
            </form>
        </div>
    )
}*/

// export default
import React from "react";
import './stylesheets/ToolbarBox.css'

const ToolbarBox = (props) => {
    return (
        <div className="toolbarbox">
            {props.children}
        </div>
    )
}

export default ToolbarBox
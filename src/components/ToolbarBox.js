import React from "react";
import './stylesheets/ToolbarBox.css'

const ToolbarBox = (props) => {
    const padding = (props.padding) ? props.padding : '8px'
    return (
        <div className="toolbarbox" style={{padding: padding}}>
            {props.children}
        </div>
    )
}

export default ToolbarBox
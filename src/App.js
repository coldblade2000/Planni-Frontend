import React, {useState} from 'react';
import Schedule from "./components/schedule/Schedule"
import DebugThing from "./components/DebugThing";
import './App.css';


function App() {
  return (
    <div className="App">
        <h1>Banner v2</h1>
        <div className="debugContainer">
            <Schedule/>
            <DebugThing/>
        </div>
    </div>
  );
}




export default App;

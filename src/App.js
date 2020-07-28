import React from 'react';
import Schedule from "./components/schedule/Schedule"
import logo from './logo.svg';
import './App.css';
import ScheduleEvent from "./components/schedule/ScheduleEvent";

function App() {
  return (
    <div className="App">
        <h1>Banner v2</h1>
        <div className="debugContainer">
            <Schedule/>
        </div>
    </div>
  );
}

export default App;

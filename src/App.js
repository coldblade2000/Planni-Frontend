import React from 'react';
import Schedule from "./components/schedule/Schedule"
import './App.css';

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

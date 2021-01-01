import React from 'react';
import Schedule from "./components/schedule/Schedule"
import CourseForm from "./components/DebugThing";
import './App.css';

//https://faizanv.medium.com/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
function App() {
  return (
      <div className="App">
          <div id="header"/>
          <div id="body">
              <div className="debugContainer">
                  <CourseForm/>
              </div>
              <div id="scheduleHalf">
                  <Schedule/>
              </div>
          </div>

      </div>
  );
}




export default App;

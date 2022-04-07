import React from "react";
import "./App.css";
import { CourseList } from "./components/CourseList";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <CourseList></CourseList>
            <hr></hr>
            <p>
                Group Members: <br></br>Ryan Evans, Craig Barber, Joshua
                Nicholls
            </p>
        </div>
    );
}

export default App;

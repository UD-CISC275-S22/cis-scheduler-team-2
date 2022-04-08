import React, { useState } from "react";
import "./App.css";
import { CourseList } from "./components/CourseList";
import { Plan } from "./interfaces/plan";
import { AddNewPlan } from "./components/AddNewPlan";

function App(): JSX.Element {
    const [planList, updatePlans] = useState<Plan[]>([]);

    function addPlan(newPlan: Plan) {
        const fixId = {
            ...newPlan,
            id: planList.length,
            semesters: [...newPlan.semesters]
        };
        updatePlans([...planList, fixId]);
    }

    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <AddNewPlan addPlan={addPlan}></AddNewPlan>
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

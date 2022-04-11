import React, { useState } from "react";
import "./App.css";
import { CourseList } from "./components/CourseList";
import { Plan } from "./interfaces/plan";
import { AddNewPlan } from "./components/AddNewPlan";
import { samplePlan } from "./interfaces/placeholderPlan";
import { DeletePlanButton } from "./components/DeletePlan";
//import { DeletePlanButton } from "./components/DeletePlan";

function App(): JSX.Element {
    //this is the state containing the list of plans
    const [planList, updatePlans] = useState<Plan[]>([samplePlan]);
    //statt to hold the active plan
    const [activePlan, setActivePlan] = useState<Plan>(planList[0]);

    function addPlan(newPlan: Plan) {
        //Passed to AddNewPlan, adds the new plan to the end of planList array
        const fixId = {
            ...newPlan,
            id: planList.length,
            semesters: [...newPlan.semesters]
        };
        updatePlans([...planList, fixId]);
    }

    function deletePlan() {
        //Passed to DeletePlanButton, deletes the ACTIVE plan from planList
        const newList = planList.filter(
            (aPlan: Plan): boolean => aPlan.name !== activePlan.name
        );
        updatePlans(newList);
        setActivePlan(newList[0]);
    }

    const sampleSemester = samplePlan.semesters[0];

    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <AddNewPlan addPlan={addPlan}></AddNewPlan>
            <CourseList semester={sampleSemester}></CourseList>
            <hr></hr>
            <DeletePlanButton
                PlanList={planList}
                deleteFunct={deletePlan}
            ></DeletePlanButton>
            <hr></hr>
            <p>
                Group Members: <br></br>Ryan Evans, Craig Barber, Joshua
                Nicholls
            </p>
        </div>
    );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { CourseList } from "./components/CourseList";
import { Plan } from "./interfaces/plan";
import { AddNewPlan } from "./components/AddNewPlan";
import { samplePlan } from "./interfaces/placeholderPlan";
import { DeletePlanButton } from "./components/DeletePlan";
import { ListAllPlans } from "./components/ListAllPlans";
import { Button, Col, Row } from "react-bootstrap";
import { SemesterTable } from "./components/SemesterTable";
import { InsertSemesterModal } from "./components/InsertSemesterModal";
import { EmptySemestersButton } from "./components/ClearAllSemesters";
import { Semester } from "./interfaces/semester";

function App(): JSX.Element {
    //this is the state containing the list of plans
    const [planList, updatePlans] = useState<Plan[]>([samplePlan]);
    //state to hold the active plan
    const [activePlan, setActivePlan] = useState<Plan>(planList[0]);

    // State that handles add semester modal
    const [showModal, setShowModal] = useState<boolean>(false);

    function addPlan(newPlan: Plan) {
        //Passed to AddNewPlan, adds the new plan to the end of planList array
        const fixId = {
            ...newPlan,
            id: planList[planList.length - 1].id + 1,
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

    function clearSemester(planID: number, semYear: number, semSeas: string) {
        //passed to the ClearSemesterButton
        //gets the plan
        const toFix = planList.filter(
            (aPlan: Plan): boolean => aPlan.id === planID
        );
        //array of semseters from that plan
        const semMap = toFix[0].semesters;
        //clears the proper semester
        const clearSem = semMap.map(
            (aSem: Semester): Semester =>
                aSem.season === semSeas && aSem.year === semYear
                    ? { ...aSem, classes: [] }
                    : { ...aSem }
        );
        const fixedPlan = { ...toFix[0], semesters: [...clearSem] };
        const fixedList = planList.map(
            (aPlan: Plan): Plan =>
                aPlan.id === planID ? { ...fixedPlan } : { ...aPlan }
        );
        setActivePlan(fixedPlan);
        updatePlans(fixedList);
    }

    const sampleSemester = samplePlan.semesters[0];

    const handleShowInsertSemesterModal = () => setShowModal(true);
    const handleCloseInsertSemesterModal = () => setShowModal(false);

    function addSemester(newSemester: Semester): void {
        const existing = activePlan.semesters.find(
            (semester: Semester): boolean => semester.id === newSemester.id
        );

        if (existing === undefined) {
            const fixedPlan = {
                id: activePlan.id,
                name: activePlan.name,
                semesters: [...activePlan.semesters, newSemester]
            };
            const fixedPlanList = planList.map((plan: Plan) =>
                plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
            );
            setActivePlan(fixedPlan);
            updatePlans(fixedPlanList);
        }
        return;
    }

    function deleteSemester(planId: number, semesterId: string) {
        const fixedPlan = {
            id: activePlan.id,
            name: activePlan.name,
            semesters: activePlan.semesters.filter(
                (semester: Semester): boolean => semester.id !== semesterId
            )
        };
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }

    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <Row>
                <Col>
                    <ListAllPlans
                        allPlans={planList}
                        activePlan={activePlan}
                        setActivePlan={setActivePlan}
                    ></ListAllPlans>
                    Active Plan: {activePlan.name}
                    <DeletePlanButton
                        PlanList={planList}
                        deleteFunct={deletePlan}
                    ></DeletePlanButton>
                </Col>
                <Col>
                    <AddNewPlan addPlan={addPlan}></AddNewPlan>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <Col>
                    <SemesterTable
                        plan={activePlan}
                        clearSem={clearSemester}
                        deleteSemester={deleteSemester}
                    ></SemesterTable>
                    <hr />
                    <Button onClick={handleShowInsertSemesterModal}>
                        Add Semester
                    </Button>
                    <hr />
                    <EmptySemestersButton
                        allPlans={planList}
                        updatePlans={updatePlans}
                        activePlan={activePlan}
                        setActivePlan={setActivePlan}
                    ></EmptySemestersButton>
                </Col>
                <Col>
                    <CourseList semester={sampleSemester}></CourseList>
                </Col>
            </Row>
            <hr></hr>
            <p>
                Group Members: <br></br>Ryan Evans, Craig Barber, Joshua
                Nicholls
            </p>
            <hr></hr>
            <InsertSemesterModal
                showModal={showModal}
                addSemester={addSemester}
                closeModal={handleCloseInsertSemesterModal}
            ></InsertSemesterModal>
        </div>
    );
}

export default App;

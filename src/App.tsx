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
import { Course } from "./interfaces/course";

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

    function addCourse(newCourse: Course, semID: string) {
        //adds a new Course to the active plan, given a specified semester to insert to, and the details of the course
        //passed to AddSourceToSemester component
        const actPlan = activePlan;
        const actSems = actPlan.semesters.filter(
            (aSem: Semester): boolean => aSem.id === semID
        );
        if (actSems.length >= 1) {
            actSems[0].classes = [...actSems[0].classes, newCourse];
            actSems[0].credits += newCourse.credits;
            const replaceSem = actPlan.semesters.map(
                (aSem: Semester): Semester =>
                    aSem.id === semID ? { ...actSems[0] } : { ...aSem }
            );
            actPlan.semesters = replaceSem;
            const fixedList = planList.map(
                (aPlan: Plan): Plan =>
                    aPlan.id === actPlan.id ? { ...actPlan } : { ...aPlan }
            );
            setActivePlan(actPlan);
            updatePlans(fixedList);
            return true;
        }
    }

    // Opens and closes the insertSemester modal view
    const handleShowInsertSemesterModal = () => setShowModal(true);
    const handleCloseInsertSemesterModal = () => setShowModal(false);

    /**
     * Adds a new semester to the currently selected plan
     *
     * @param newSemester The semester that will be added to the plan
     */
    function addSemester(newSemester: Semester): void {
        // Checking if the new semester already exists
        const existing = activePlan.semesters.find(
            (semester: Semester): boolean => semester.id === newSemester.id
        );
        // If the semester doesn't exist, crete a new plan with an updated semesters array
        if (existing === undefined) {
            const fixedPlan = {
                id: activePlan.id,
                name: activePlan.name,
                semesters: [...activePlan.semesters, newSemester]
            };
            // Creating a list that replaces the active plan with the fixed plan
            const fixedPlanList = planList.map((plan: Plan) =>
                plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
            );
            // Updating the active plan and the plan list to both contain the updated plan that contains the new semester
            setActivePlan(fixedPlan);
            updatePlans(fixedPlanList);
        }
        return;
    }

    /**
     * Removes a given semester from the currently active plan.
     *
     * @param semesterId The id of the semester to be deleted
     */
    function deleteSemester(semesterId: string) {
        // Creating a new plan with an updated semesters array that contains every plan besides the one being removed
        const fixedPlan = {
            id: activePlan.id,
            name: activePlan.name,
            semesters: activePlan.semesters.filter(
                (semester: Semester): boolean => semester.id !== semesterId
            )
        };
        // Creating a list of plans that replaces the active plan with the updated plan
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        // Updating the active plan and plan list to both contain the updated plan with the semester removed.
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }

    function deleteCourse(
        courseDept: string,
        courseCode: number,
        semID: string
    ) {
        //deletes the specific course from the active plan, properly updating Semester credits also
        const toFix = activePlan.semesters.filter(
            (aSem: Semester): boolean => aSem.id === semID
        );
        const getClass = toFix[0].classes.filter(
            (aCourse: Course): boolean =>
                aCourse.department === courseDept &&
                aCourse.courseCode === courseCode
        )[0];
        const fixCreds = toFix[0].credits - getClass.credits;
        const fixCourse = toFix[0].classes.filter(
            (aCourse: Course): boolean =>
                !(
                    aCourse.department === courseDept &&
                    aCourse.courseCode === courseCode
                )
        );
        const fixedPlan = {
            ...activePlan,
            semesters: activePlan.semesters.map(
                (aSem: Semester): Semester =>
                    aSem.id === semID
                        ? { ...aSem, classes: fixCourse, credits: fixCreds }
                        : { ...aSem }
            )
        };
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }

    /**
     * Moves a course from one semester to another (as long as they aren't the same semester)
     *
     * @param courseToMove The course object that will be relocated
     * @param fromSemester The semester that currently contains the to-be-relocated course
     * @param toSemester The semester that the course will be relocated to
     */
    function moveCourse(
        courseToMove: Course,
        fromSemester: Semester,
        toSemester: Semester
    ) {
        // As long as the course isn't being moved to the same semester, move it
        if (toSemester !== fromSemester) {
            addCourse(courseToMove, toSemester.id);
            deleteCourse(
                courseToMove.department,
                courseToMove.courseCode,
                fromSemester.id
            );
        }
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
                <Col sm={7}>
                    <SemesterTable
                        plan={activePlan}
                        clearSem={clearSemester}
                        deleteSemester={deleteSemester}
                        courseAdder={addCourse}
                        delCourseFunct={deleteCourse}
                        moveCourse={moveCourse}
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
                <Col sm={5}>
                    <CourseList plan={activePlan}></CourseList>
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

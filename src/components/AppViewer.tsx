import React from "react";
import { CourseList } from "../components/CourseList";
import { Plan } from "../interfaces/plan";
import { AddNewPlan } from "../components/AddNewPlan";
import { DeletePlanButton } from "../components/DeletePlan";
import { ListAllPlans } from "../components/ListAllPlans";
import { Button, Col, Row } from "react-bootstrap";
import { SemesterTable } from "../components/SemesterTable";
import { InsertSemesterModal } from "../components/InsertSemesterModal";
import { EmptySemestersButton } from "../components/ClearAllSemesters";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { WelcomeMessage } from "../components/WelcomeMessage";

export function AppViewer({
    showWelcome,
    handleCloseWelcomeModal,
    planList,
    activePlan,
    setActivePlan,
    deletePlan,
    addPlan,
    clearSemester,
    deleteSemester,
    addCourse,
    deleteCourse,
    editCourse,
    moveCourse,
    moveCourseToPool,
    handleShowInsertSemesterModal,
    updatePlans,
    moveCourseFromPool,
    //deleteCourseFromPool,
    showModal,
    addSemester,
    handleCloseInsertSemesterModal,
    filterByCourseNumber,
    filterByDeptID
}: {
    showWelcome: boolean;
    handleCloseWelcomeModal: () => void;
    planList: Plan[];
    activePlan: Plan;
    setActivePlan: (newPlan: Plan) => void;
    deletePlan: () => void;
    addPlan: (newPlan: Plan) => void;
    clearSemester: (semesterId: string) => void;
    deleteSemester: (semesterId: string) => void;
    addCourse: (newCourse: Course, semID: string) => void;
    deleteCourse: (courseID: string, semID: string) => void;
    editCourse: (courseID: string, newCourse: Course, semID: string) => void;
    moveCourse: (
        courseToMove: Course,
        fromSemester: Semester,
        toSemester: Semester
    ) => void;
    moveCourseToPool: (courseToMove: Course, fromSemester: Semester) => void;
    handleShowInsertSemesterModal: () => void;
    updatePlans: (newPlans: Plan[]) => void;
    moveCourseFromPool: (courseToMove: Course, toSemester: Semester) => void;
    //deleteCourseFromPool: deleteCourseFromPool(courseToDelete: Course) => void;
    showModal: boolean;
    addSemester: (newSemester: Semester) => boolean;
    handleCloseInsertSemesterModal: () => void;
    filterByCourseNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterByDeptID: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <WelcomeMessage
                showModal={showWelcome}
                closeModal={handleCloseWelcomeModal}
            ></WelcomeMessage>
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
                <Col sm={8}>
                    <SemesterTable
                        plan={activePlan}
                        clearSem={clearSemester}
                        deleteSemester={deleteSemester}
                        courseAdder={addCourse}
                        delCourseFunct={deleteCourse}
                        editCourseFunct={editCourse}
                        moveCourse={moveCourse}
                        moveCourseToPool={moveCourseToPool}
                    ></SemesterTable>
                    <hr />
                    <Button
                        onClick={handleShowInsertSemesterModal}
                        data-testid="add_semester_button"
                    >
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
                <Col sm={4}>
                    <CourseList
                        plan={activePlan}
                        moveCourseFromPool={moveCourseFromPool}
                        moveCourseToPool={moveCourseToPool}
                        filterByCourseNumber={filterByCourseNumber}
                        filterByDeptID={filterByDeptID}
                    ></CourseList>
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

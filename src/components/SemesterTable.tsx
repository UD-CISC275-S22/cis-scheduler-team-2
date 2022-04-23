import React from "react";
import { Col, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { AddCourseButton } from "./AddCourseButton";
import { ClearSemesterButton } from "./ClearSemester";
import { CourseTable } from "./CourseTable";
import { DeleteSemesterButton } from "./DeleteSemesterButton";

/** Takes in a Plan and maps the semesters in the plan to a list of semesters. Each semester gets passed
 * into a CourseTable
 */
export function SemesterTable({
    plan,
    clearSem,
    deleteSemester,
    courseAdder,
    delCourseFunct,
    moveCourse
}: {
    plan: Plan;
    clearSem: (planID: number, semYear: number, semSeas: string) => void;
    deleteSemester: (semesterId: string) => void;
    courseAdder: (newCourse: Course, semID: string) => void;
    delCourseFunct: (
        courseDept: string,
        courseCode: number,
        semID: string
    ) => void;
    moveCourse: (
        courseToMove: Course,
        fromSemester: Semester,
        toSemester: Semester
    ) => void;
}): JSX.Element {
    return (
        <div>
            <h4>{`${plan.name}'s Semesters`}</h4>

            <ul style={{ paddingLeft: "0", listStyle: "none" }}>
                {plan.semesters.map((semester: Semester) => (
                    <li key={semester.id}>
                        <CourseTable
                            semester={semester}
                            plan={plan}
                            delCourseFunct={delCourseFunct}
                            moveCourse={moveCourse}
                        ></CourseTable>
                        <Row>
                            <Col>
                                <ClearSemesterButton
                                    PlanID={plan.id}
                                    thisSem={semester}
                                    clearFunct={clearSem}
                                ></ClearSemesterButton>
                            </Col>
                            <Col>
                                <AddCourseButton
                                    semester={semester}
                                    courseAdder={courseAdder}
                                ></AddCourseButton>
                            </Col>
                            <Col>
                                <DeleteSemesterButton
                                    planId={plan.id}
                                    semesterId={semester.id}
                                    deleteSemester={deleteSemester}
                                ></DeleteSemesterButton>
                            </Col>
                        </Row>
                    </li>
                ))}
            </ul>
        </div>
    );
}

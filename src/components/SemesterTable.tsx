import React from "react";
import { Col, Row } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ClearSemesterButton } from "./ClearSemester";
import { CourseTable } from "./CourseTable";
import { DeleteSemesterButton } from "./DeleteSemesterButton";

/** Takes in a Plan and maps the semesters in the plan to a list of semesters. Each semester gets passed
 * into a CourseTable
 */
export function SemesterTable({
    plan,
    clearSem,
    deleteSemester
}: {
    plan: Plan;
    clearSem: (planID: number, semYear: number, semSeas: string) => void;
    deleteSemester: (planId: number, semesterId: string) => void;
}): JSX.Element {
    return (
        <div>
            <h4>{`${plan.name}'s Semesters`}</h4>

            <ul style={{ paddingLeft: "0", listStyle: "none" }}>
                {plan.semesters.map((semester: Semester) => (
                    <li key={semester.id}>
                        <CourseTable semester={semester}></CourseTable>
                        <Row>
                            <Col>
                                <ClearSemesterButton
                                    PlanID={plan.id}
                                    thisSem={semester}
                                    clearFunct={clearSem}
                                ></ClearSemesterButton>
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

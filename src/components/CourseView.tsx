import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { MoveFromPool } from "./MoveFromPool";

export function CourseView({
    course,
    plan,
    moveCourseFromPool
}: {
    course: Course;
    plan: Plan;
    moveCourseFromPool: (courseToMove: Course, toSemester: Semester) => void;
}): JSX.Element {
    const [descriptionVis, setDescriptionVis] = useState<boolean>(false);

    function flipVis(): void {
        setDescriptionVis(!descriptionVis);
    }

    return (
        <div style={{ justifyContent: "center", display: "flex" }}>
            <div style={{ width: "90%" }}>
                <hr></hr>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <h4
                                    onClick={flipVis}
                                    style={{ cursor: "pointer" }}
                                >
                                    {course.department}{" "}
                                    {course.courseCode
                                        .toString()
                                        .padStart(3, "0")}
                                    : {course.title}
                                </h4>
                            </Row>
                            <Row>
                                <Col>
                                    {descriptionVis && (
                                        <h5>({course.credits} credits)</h5>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {descriptionVis && (
                                        <p>{course.description}</p>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {descriptionVis && (
                                        <MoveFromPool
                                            plan={plan}
                                            course={course}
                                            moveCourseFromPool={
                                                moveCourseFromPool
                                            }
                                        ></MoveFromPool>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

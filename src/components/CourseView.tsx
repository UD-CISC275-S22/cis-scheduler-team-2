import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseView({ course }: { course: Course }): JSX.Element {
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
                                    {course.department} {course.courseCode}:{" "}
                                    {course.title}
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

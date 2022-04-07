import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseView({ course }: { course: Course }): JSX.Element {
    return (
        <div>
            <hr></hr>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <h3>
                                {course.department} {course.courseCode}:{" "}
                                {course.title}
                            </h3>
                        </Row>
                        <Row>
                            <Col>
                                <h4>({course.credits} credits)</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <p>{course.description}</p>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

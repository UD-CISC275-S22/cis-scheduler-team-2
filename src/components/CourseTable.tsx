import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { DeleteCourseButton } from "./DeleteCourseButton";
import { EditCourseButton } from "./EditCourseButton";

export function CourseTable({
    semester,
    delCourseFunct,
    editCourseFunct
}: {
    semester: Semester;
    delCourseFunct: (
        courseDept: string,
        courseCode: number,
        semID: string
    ) => void;
    editCourseFunct: (
        oldCourse: Course,
        newCourse: Course,
        semID: string
    ) => void;
}): JSX.Element {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    function toggleVis(): void {
        setIsVisible(!isVisible);
    }

    return (
        <div>
            <div>
                <hr></hr>
                <h4 onClick={toggleVis} style={{ cursor: "pointer" }}>
                    Semester: {semester.season} {semester.year}
                </h4>
            </div>
            {isVisible && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Credits</th>
                            <th>Course Number</th>
                            <th>Course Title</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester.classes.map((course: Course) => (
                            <tr key={course.courseCode}>
                                <th>{course.credits}</th>
                                <th>{`${course.department}${course.courseCode}`}</th>
                                <th>{course.title}</th>
                                <th>
                                    <Row sm={2}>
                                        <Col>
                                            <EditCourseButton
                                                semester={semester}
                                                course={course}
                                                courseEditor={editCourseFunct}
                                            ></EditCourseButton>
                                        </Col>
                                        <Col>
                                            <DeleteCourseButton
                                                course={course}
                                                semester={semester}
                                                delFunct={delCourseFunct}
                                            ></DeleteCourseButton>
                                        </Col>
                                    </Row>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

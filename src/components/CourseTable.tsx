import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { DeleteCourseButton } from "./DeleteCourseButton";
import { EditCourseButton } from "./EditCourseButton";
import { MoveCourseButton } from "./MoveCourseButton";

export function CourseTable({
    semester,
    plan,
    delCourseFunct,
    editCourseFunct,
    moveCourse,
    moveCourseToPool
}: {
    semester: Semester;
    plan: Plan;
    delCourseFunct: (courseID: string, semID: string) => void;
    editCourseFunct: (
        courseID: string,
        newCourse: Course,
        semID: string
    ) => void;
    moveCourse: (
        courseToMove: Course,
        fromSemester: Semester,
        toSemester: Semester
    ) => void;
    moveCourseToPool: (courseToMove: Course, fromSemester: Semester) => void;
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
                            <tr key={course.courseId}>
                                <th>{course.credits}</th>
                                <th>{`${course.department}${course.courseCode
                                    .toString()
                                    .padStart(3, "0")}`}</th>
                                <th>{course.title}</th>
                                <th>
                                    <Row sm={3}>
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
                                        <Col>
                                            <MoveCourseButton
                                                currentSemester={semester}
                                                course={course}
                                                plan={plan}
                                                moveCourse={moveCourse}
                                                moveCourseToPool={
                                                    moveCourseToPool
                                                }
                                            ></MoveCourseButton>
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

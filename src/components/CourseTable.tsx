import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { DeleteCourseButton } from "./DeleteCourseButton";

export function CourseTable({
    semester,
    delCourseFunct
}: {
    semester: Semester;
    delCourseFunct: (
        courseDept: string,
        courseCode: number,
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
                                    <DeleteCourseButton
                                        course={course}
                                        semester={semester}
                                        delFunct={delCourseFunct}
                                    ></DeleteCourseButton>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

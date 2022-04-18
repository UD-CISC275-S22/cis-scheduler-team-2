import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function CourseTable({ semester }: { semester: Semester }): JSX.Element {
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
                        </tr>
                    </thead>
                    <tbody>
                        {semester.classes.map((course: Course) => (
                            <tr key={course.courseCode}>
                                <th>{course.credits}</th>
                                <th>{`${course.department}${course.courseCode}`}</th>
                                <th>{course.title}</th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

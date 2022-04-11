import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function CourseTable({ semester }: { semester: Semester }): JSX.Element {
    return (
        <div>
            <div>
                <h4>
                    Semester: {semester.season} {semester.year}
                </h4>
            </div>
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
        </div>
    );
}

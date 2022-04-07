import React from "react";
import { Course } from "../interfaces/course";
import { CourseView } from "./CourseView";

export function CourseList(): JSX.Element {
    const INITIAL_COURSES: Course[] = [
        {
            department: "CISC",
            courseCode: 108,
            title: "Introduction to Computer Science I",
            credits: 3,
            prereqs: [],
            description:
                "Computing and principles of programming with an emphasis on systematic program design. Topics include functional programming, data abstraction, procedural abstraction, use of control and state, recursion, testing, and object-oriented programming concepts. Requires no prior programming experience, open to any major, but intended primarily for majors and minors in computer science or mathematics."
        },
        {
            department: "CISC",
            courseCode: 181,
            title: "Introduction to Computer Science II",
            credits: 3,
            prereqs: ["CISC-108"],
            description:
                "Principles of computer science illustrated and applied through programming in an object oriented language. Programming projects illustrate computational problems, styles and issues that arise in computer systems development and in all application areas of computation."
        }
    ];
    return (
        <div>
            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                {INITIAL_COURSES.map((course: Course) => (
                    <li key={course.courseCode}>
                        <CourseView course={course}></CourseView>
                    </li>
                ))}
            </ul>
        </div>
    );
}

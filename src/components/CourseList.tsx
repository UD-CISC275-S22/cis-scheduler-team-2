import React from "react";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./CourseView";

export function CourseList({ plan }: { plan: Plan }): JSX.Element {
    /** Array with the passsed in plan's semesters */
    const PLAN_SEMESTERS: Semester[] = plan.semesters.map(
        (semester: Semester) => semester
    );

    /** Array containing the courses array of every semester */
    const SEM_COURSES: Course[][] = PLAN_SEMESTERS.map(
        (semester: Semester) => semester.classes
    );

    /** Creating an array containing every course from every semester in the plan (Only if there are semesters in the plan) */
    if (SEM_COURSES.length > 0) {
        const allCourses: Course[] = SEM_COURSES.reduce(
            (currResult, currItem) => currResult.concat(currItem)
        );
        return (
            <div>
                <h4>Course Pool</h4>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                    {allCourses.map((course: Course) => (
                        <li key={course.courseCode}>
                            <CourseView course={course}></CourseView>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <h4>Course Pool</h4>
        </div>
    );
}

import React from "react";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./CourseView";

export function CourseList({
    plan,
    moveCourseFromPool
}: {
    plan: Plan;
    moveCourseFromPool: (courseToMove: Course, toSemester: Semester) => void;
    moveCourseToPool: (courseToMove: Course, fromSemester: Semester) => void;
}): JSX.Element {
    /** Creating an array containing every course from every semester in the plan (Only if there are semesters in the course pool) */
    if (plan.coursePool.length > 0) {
        return (
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <h4>Course Pool</h4>
                <div
                    style={{
                        overflowY: "scroll",
                        height: "80vh",
                        width: "auto",
                        border: "solid",
                        borderWidth: "1px",
                        borderRadius: "8px",
                        borderColor: "gray"
                    }}
                >
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                        {plan.coursePool.map((course: Course) => (
                            <li key={course.courseCode}>
                                <CourseView
                                    course={course}
                                    plan={plan}
                                    moveCourseFromPool={moveCourseFromPool}
                                ></CourseView>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h4>Course Pool</h4>
        </div>
    );
}

import React from "react";
import { Dropdown } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

/**
 * Dropdown button to handle swithcing courses between semesters
 */
export function MoveCourseButton({
    plan,
    currentSemester,
    course,
    moveCourse,
    moveCourseToPool
}: {
    plan: Plan;
    course: Course;
    currentSemester: Semester;
    moveCourse: (
        courseToMove: Course,
        fromSemester: Semester,
        toSemester: Semester
    ) => void;
    moveCourseToPool: (courseToMove: Course, fromSemester: Semester) => void;
}): JSX.Element {
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle>Move to...</Dropdown.Toggle>
                <Dropdown.Menu>
                    {plan.semesters.map((semester: Semester) => {
                        if (semester.id !== currentSemester.id) {
                            return (
                                <Dropdown.Item
                                    onClick={() =>
                                        moveCourse(
                                            course,
                                            currentSemester,
                                            semester
                                        )
                                    }
                                    key={semester.id}
                                    eventKey={semester.id}
                                >
                                    {`${semester.season} ${semester.year}`}
                                </Dropdown.Item>
                            );
                        }
                    })}
                    <Dropdown.Item
                        onClick={() =>
                            moveCourseToPool(course, currentSemester)
                        }
                        eventKey={"coursePool"}
                    >
                        Course Pool
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

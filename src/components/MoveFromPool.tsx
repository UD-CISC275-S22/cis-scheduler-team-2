import React from "react";
import { Dropdown } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

export function MoveFromPool({
    plan,
    course,
    moveCourseFromPool
}: {
    plan: Plan;
    course: Course;
    moveCourseFromPool: (courseToMove: Course, toSemester: Semester) => void;
}): JSX.Element {
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle>Add to...</Dropdown.Toggle>
                <Dropdown.Menu>
                    {plan.semesters.map((semester: Semester) => {
                        return (
                            <Dropdown.Item
                                onClick={() =>
                                    moveCourseFromPool(course, semester)
                                }
                                key={semester.id}
                                eventKey={semester.id}
                            >
                                {`${semester.season} ${semester.year}`}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

export function MoveCourseButton({
    plan,
    currentSemester,
    course,
    moveCourse
}: {
    plan: Plan;
    course: Course;
    currentSemester: Semester;
    moveCourse: (
        courseToMove: Course,
        fromSemester: Semester,
        toSemester: Semester
    ) => void;
}): JSX.Element {
    return (
        <div>
            <Dropdown>
                <DropdownToggle>Move to...</DropdownToggle>
                <DropdownMenu>
                    {plan.semesters.map((semester: Semester) => (
                        <DropdownItem
                            onClick={() =>
                                moveCourse(course, currentSemester, semester)
                            }
                            key={semester.id}
                            eventKey={semester.id}
                        >
                            {`${semester.season} ${semester.year}`}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

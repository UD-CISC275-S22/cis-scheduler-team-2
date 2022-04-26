import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
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
                <DropdownToggle>Add to...</DropdownToggle>
                <DropdownMenu>
                    {plan.semesters.map((semester: Semester) => {
                        return (
                            <DropdownItem
                                onClick={() =>
                                    moveCourseFromPool(course, semester)
                                }
                                key={semester.id}
                                eventKey={semester.id}
                            >
                                {`${semester.season} ${semester.year}`}
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

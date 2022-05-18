import React from "react";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./CourseView";
import { Virtuoso } from "react-virtuoso";
import { FilterCoursePool } from "./FilterCoursePool";
import { Col, Row } from "react-bootstrap";

export function CourseList({
    plan,
    moveCourseFromPool,
    filterByCourseNumber,
    filterByDeptID
}: {
    plan: Plan;
    moveCourseFromPool: (courseToMove: Course, toSemester: Semester) => void;
    moveCourseToPool: (courseToMove: Course, fromSemester: Semester) => void;
    filterByCourseNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterByDeptID: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}): JSX.Element {
    /** Creating an array containing every course from every semester in the plan (Only if there are semesters in the course pool) */
    if (plan.coursePool.length > 0) {
        return (
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ margin: "10px" }}>
                    <Row>
                        <Col>
                            <h4>Course Pool</h4>
                        </Col>
                        <Col>
                            <FilterCoursePool
                                plan={plan}
                                filterByCourseNumber={filterByCourseNumber}
                                filterByDeptID={filterByDeptID}
                            ></FilterCoursePool>
                        </Col>
                    </Row>
                </div>
                <hr />
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
                    <Virtuoso
                        style={{ height: "100%" }}
                        totalCount={plan.coursePool.length}
                        itemContent={(index) => (
                            <CourseView
                                course={plan.coursePool[index]}
                                plan={plan}
                                moveCourseFromPool={moveCourseFromPool}
                            ></CourseView>
                        )}
                    ></Virtuoso>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Row>
                <Col>
                    <h4>Course Pool</h4>
                </Col>
                <Col>
                    <FilterCoursePool
                        plan={plan}
                        filterByCourseNumber={filterByCourseNumber}
                        filterByDeptID={filterByDeptID}
                    ></FilterCoursePool>
                </Col>
            </Row>
            <hr />
        </div>
    );
}

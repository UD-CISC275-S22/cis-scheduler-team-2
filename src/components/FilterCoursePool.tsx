import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import catalog from "../assets/catalog.json";

export function FilterCoursePool({
    plan,
    filterByCourseNumber,
    filterByDeptID
}: {
    plan: Plan;
    filterByCourseNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterByDeptID: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}): JSX.Element {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [userSearch, setUserSearch] = useState<string>("");

    function toggleVisibility(): void {
        setIsVisible(!isVisible);
    }

    function updateUserSearch(
        usrSearch: React.ChangeEvent<HTMLTextAreaElement>
    ): void {
        setUserSearch(usrSearch.target.value);
    }

    const departmentIds: string[] = Object.keys(catalog);

    return (
        <div>
            <Button onClick={toggleVisibility}>View Filters</Button>
            <Modal show={isVisible} onHide={toggleVisibility} animation={false}>
                <Modal.Header>
                    <Modal.Title>Filter Course Pool</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group controlId="courseFilters">
                        <Row sm={2}>
                            <Col>
                                <Form.Group controlId="courseNumFilters">
                                    <h5 style={{ color: "DimGrey" }}>
                                        Course Number:
                                    </h5>
                                    <hr />
                                    <Form.Check
                                        type="checkbox"
                                        name="100"
                                        onChange={filterByCourseNumber}
                                        id="filter-100-level"
                                        label="100 Level Courses"
                                        value="100"
                                        checked={plan.activeFilters.includes(
                                            "100"
                                        )}
                                    ></Form.Check>
                                    <Form.Check
                                        type="checkbox"
                                        name="200"
                                        onChange={filterByCourseNumber}
                                        id="filter-200-level"
                                        label="200 Level Courses"
                                        value="200"
                                        checked={plan.activeFilters.includes(
                                            "200"
                                        )}
                                    ></Form.Check>
                                    <Form.Check
                                        type="checkbox"
                                        name="300"
                                        onChange={filterByCourseNumber}
                                        id="filter-300-level"
                                        label="300 Level Courses"
                                        value="300"
                                        checked={plan.activeFilters.includes(
                                            "300"
                                        )}
                                    ></Form.Check>
                                    <Form.Check
                                        type="checkbox"
                                        name="400"
                                        onChange={filterByCourseNumber}
                                        id="filter-400-level"
                                        label="400 Level Courses"
                                        value="400"
                                        checked={plan.activeFilters.includes(
                                            "400"
                                        )}
                                    ></Form.Check>
                                    <Form.Check
                                        type="checkbox"
                                        name="500"
                                        onChange={filterByCourseNumber}
                                        id="filter-500-level"
                                        label="500+ Level Courses"
                                        value="500"
                                        checked={plan.activeFilters.includes(
                                            "500"
                                        )}
                                    ></Form.Check>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="departmentCodeFilter">
                                    <h5 style={{ color: "DimGrey" }}>
                                        Department Code:
                                    </h5>
                                    <hr />
                                    <Row
                                        style={{
                                            margin: ".10em",
                                            padding: ".10em"
                                        }}
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="Ex. CISC, MATH, ENGL ..."
                                            onChange={updateUserSearch}
                                            maxLength={2}
                                        ></Form.Control>
                                    </Row>
                                    <Row
                                        style={{
                                            margin: "3px",
                                            padding: "5px"
                                        }}
                                    >
                                        <Form.Select
                                            value={plan.currentDeptFilter}
                                            onChange={filterByDeptID}
                                        >
                                            {departmentIds.map(
                                                (deptCode: string) => {
                                                    if (
                                                        deptCode.startsWith(
                                                            userSearch.toUpperCase()
                                                        )
                                                    ) {
                                                        return (
                                                            <option
                                                                value={deptCode}
                                                                key={deptCode}
                                                            >
                                                                {deptCode}
                                                            </option>
                                                        );
                                                    }
                                                }
                                            )}
                                        </Form.Select>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
            </Modal>
        </div>
    );
}

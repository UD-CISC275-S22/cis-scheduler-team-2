import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { Button, Col, Form, Row } from "react-bootstrap";

//add ability to push semester changes (double-check all fields are valid)
//add state for prereqs list
//map prereqs to allow them to be deleted if needed

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface addCourseToSemesterProp {
    courseAdder: (newCourse: Course, semYear: number, semSeas: string) => void;
}

export function AddCourseToSemester({
    courseAdder
}: addCourseToSemesterProp): JSX.Element {
    const seasons = ["Fall", "Winter", "Spring", "Summer"];
    const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~1234567890]/;

    const [startSeason, changeSeason] = useState<string>(seasons[0]);
    const [yearBox, changeYear] = useState<string>("");
    const [reqsList, newPre] = useState<string[]>([]);

    function updateSeason(event: ChangeEvent) {
        changeSeason(event.target.value);
    }

    function updateYear(event: ChangeEvent) {
        changeYear(event.target.value);
    }

    const [newCourse, updateCourse] = useState<Course>({
        department: "",
        courseCode: 0,
        title: "",
        credits: 0,
        prereqs: [],
        description: ""
    });

    const [codeBox, changeCode] = useState<string>("");
    const [titleBox, changeTitle] = useState<string>("");
    const [credsBox, changeCreds] = useState<string>("");
    const [reqsBox, changeReqs] = useState<string>("");
    const [descBox, changeDesc] = useState<string>("");

    function enableAdd() {
        const dept = codeBox.substring(0, 4);
        const code = codeBox.substring(4);
        return (
            titleBox !== "" &&
            credsBox !== "" &&
            !isNaN(Number(credsBox)) &&
            descBox !== "" &&
            codeBox.length === 7 &&
            !specialChars.test(dept) &&
            !isNaN(Number(code)) &&
            !isNaN(Number(yearBox)) &&
            yearBox !== ""
        );
    }

    function updateCode(event: ChangeEvent) {
        if (event.target.value.length === 7) {
            const dept = event.target.value.substring(0, 4);
            const code = event.target.value.substring(4);
            if (!specialChars.test(dept) && !isNaN(Number(code))) {
                const newCode = {
                    ...newCourse,
                    courseCode: Number(code),
                    department: dept.toUpperCase()
                };
                updateCourse(newCode);
            }
        }
        changeCode(event.target.value);
    }

    function updateTitle(event: ChangeEvent) {
        if (event.target.value !== "") {
            const newTitle = {
                ...newCourse,
                title: event.target.value
            };
            updateCourse(newTitle);
        }
        changeTitle(event.target.value);
    }

    function updateCreds(event: ChangeEvent) {
        if (!isNaN(Number(event.target.value))) {
            if (Number(event.target.value) > 0) {
                const newCreds = {
                    ...newCourse,
                    credits: Number(event.target.value)
                };
                updateCourse(newCreds);
            }
        }
        changeCreds(event.target.value);
    }

    function updateReqs(event: ChangeEvent) {
        changeReqs(event.target.value);
    }

    function addReq() {
        if (reqsBox.length === 7) {
            const dept = reqsBox.substring(0, 4);
            const code = reqsBox.substring(4);
            if (!specialChars.test(dept) && !isNaN(Number(code))) {
                const addReq = {
                    ...newCourse,
                    prereqs: [...newCourse.prereqs, reqsBox]
                };
                updateCourse(addReq);
                newPre([...reqsList, reqsBox]);
                changeReqs("");
            }
        }
    }

    function remReq(courseName: string) {
        const rem = newCourse.prereqs.filter(
            (aCourse: string): boolean => aCourse !== courseName
        );
        const fixCourse = { ...newCourse, prereqs: [...rem] };
        updateCourse(fixCourse);
        newPre([...rem]);
    }

    function isValidCode(): boolean {
        if (reqsBox.length === 7) {
            const dept = reqsBox.substring(0, 4);
            const code = reqsBox.substring(4);
            if (!specialChars.test(dept) && !isNaN(Number(code))) {
                return true;
            }
        }
        return false;
    }

    function updateDesc(event: ChangeEvent) {
        if (event.target.value !== "") {
            const newDesc = {
                ...newCourse,
                description: event.target.value
            };
            updateCourse(newDesc);
        }
        changeDesc(event.target.value);
    }

    function addCourse() {
        courseAdder(newCourse, Number(yearBox), startSeason);
        changeSeason(seasons[0]);
        changeCode("");
        changeTitle("");
        changeCreds("");
        changeReqs("");
        newPre([]);
        changeDesc("");
        changeYear("");
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>
                            Course Department Here (i.e., CISC181, CISC220):
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Department Code"
                            value={codeBox}
                            onChange={updateCode}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Course Name Here (i.e., Intro to Software
                            Engineering):
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Course Name"
                            value={titleBox}
                            onChange={updateTitle}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Credits here:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Number of Credits"
                            value={credsBox}
                            onChange={updateCreds}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Description here:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Course Description"
                            value={descBox}
                            onChange={updateDesc}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Enter Prerequisites Here: (i.e., CISC181, CISC220)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Prerequisite Here"
                            value={reqsBox}
                            onChange={updateReqs}
                        />
                    </Form.Group>
                    <Button disabled={!isValidCode()} onClick={addReq}>
                        Add This Prerequisite
                    </Button>
                    {reqsList.map(
                        (aReq: string): JSX.Element => (
                            <div key={aReq}>
                                {aReq}
                                <Button onClick={() => remReq(aReq)}>
                                    Remove Prerequisite
                                </Button>
                            </div>
                        )
                    )}
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>
                            <Form.Select
                                value={startSeason}
                                onChange={updateSeason}
                            >
                                {seasons.map(
                                    (season: string): JSX.Element => (
                                        <option key={season} value={season}>
                                            {season}
                                        </option>
                                    )
                                )}
                            </Form.Select>
                        </Form.Label>
                        <Form.Group>
                            <Form.Label>Semester Year Here:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Semester Year"
                                value={yearBox}
                                onChange={updateYear}
                            />
                        </Form.Group>
                    </Form.Group>
                    <Button disabled={!enableAdd()} onClick={addCourse}>
                        Add Course to Plan
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

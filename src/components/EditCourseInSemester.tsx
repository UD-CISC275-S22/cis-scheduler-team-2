import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { Button, Col, Form, Row } from "react-bootstrap";
//import { Semester } from "../interfaces/semester";
//import { Plan } from "../interfaces/plan";

//fix issue with swappin plans not fixing the selected

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface addCourseToSemesterProp {
    semID: string;
    course: Course;
    courseEditor: (oldCourse: Course, newCourse: Course, semID: string) => void;
    closeModal: () => void;
}

export function EditCourseInSemester({
    semID,
    course,
    courseEditor,
    closeModal
}: addCourseToSemesterProp): JSX.Element {
    //for making sure text contains no specail characters or numbers
    const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~1234567890]/;

    //list of prerequisites to be added in the new course
    const [reqsList, newPre] = useState<string[]>([...course.prereqs]);

    //state holding the new course to be added
    const [newCourse, updateCourse] = useState<Course>({
        department: course.department,
        courseCode: course.courseCode,
        title: course.title,
        credits: course.credits,
        prereqs: [...course.prereqs],
        description: course.description,
        prereqsFilled: course.prereqsFilled,
        degreeReqsFilled: course.degreeReqsFilled
    });

    //states holding the values in each of the boxes
    const [codeBox, changeCode] = useState<string>(
        course.department + course.courseCode
    );
    const [titleBox, changeTitle] = useState<string>(course.title);
    const [credsBox, changeCreds] = useState<string>(String(course.credits));
    const [reqsBox, changeReqs] = useState<string>("");
    const [descBox, changeDesc] = useState<string>(course.description);

    function enableAdd() {
        //checks if all fields are legal
        const dept = codeBox.substring(0, 4);
        const code = codeBox.substring(4);
        return (
            titleBox !== "" &&
            credsBox !== "" &&
            !isNaN(Number(credsBox)) &&
            descBox !== "" &&
            codeBox.length === 7 &&
            !specialChars.test(dept) &&
            !isNaN(Number(code))
        );
    }

    function updateCode(event: ChangeEvent) {
        //updates the code fields in the new course
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
        //updates the title of the course to be added
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
        //updates the credits of the course to be added
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
        //updates the text in the prerequisite box
        changeReqs(event.target.value);
    }

    function addReq() {
        //adds the typed prerequisite to the list of prerequisites
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
        //state setter for the course name
        const rem = newCourse.prereqs.filter(
            (aCourse: string): boolean => aCourse !== courseName
        );
        const fixCourse = { ...newCourse, prereqs: [...rem] };
        updateCourse(fixCourse);
        newPre([...rem]);
    }

    function isValidCode(): boolean {
        //checks if the course code is a valid string for a course, i.e., CISC275
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
        //state setter for the course description
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
        //adds the new course to the proper semester
        courseEditor(course, newCourse, semID);
        closeModal();
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
                </Col>
                <Col>
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
                            <li
                                key={aReq}
                                style={{
                                    listStyle: "none",
                                    paddingLeft: "0"
                                }}
                            >
                                <div>
                                    <Row sm={2}>
                                        <span style={{ textAlign: "center" }}>
                                            {aReq}
                                        </span>
                                        <Button onClick={() => remReq(aReq)}>
                                            Remove Prerequisite
                                        </Button>
                                    </Row>
                                </div>
                            </li>
                        )
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="secondary" onClick={closeModal}>
                        Discard Edits
                    </Button>
                </Col>
                <Col>
                    <Button disabled={!enableAdd()} onClick={addCourse}>
                        Save Edits
                    </Button>
                    <div>
                        {!enableAdd() && <div>Please Fill All Fields</div>}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

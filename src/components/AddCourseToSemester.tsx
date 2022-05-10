import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { Button, Col, Form, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
//import { Semester } from "../interfaces/semester";
//import { Plan } from "../interfaces/plan";

//fix issue with swappin plans not fixing the selected

//Test IDs of format add_course_(something)
//i.e add_course_prereq for the textbox to type in prerequistites.
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface addCourseToSemesterProp {
    semID: string;
    courseAdder: (newCourse: Course, semID: string) => void;
    closeModal: () => void;
}

export function AddCourseToSemester({
    semID,
    courseAdder,
    closeModal
}: addCourseToSemesterProp): JSX.Element {
    //for making sure text contains no specail characters or numbers
    const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~1234567890]/;

    //list of prerequisites to be added in the new course
    const [reqsList, newPre] = useState<string[]>([]);
    const [postreqsList, newPost] = useState<string[]>([]);
    const [degreeReqsList, newDeg] = useState<string[]>([]);

    //state holding the new course to be added
    const [newCourse, updateCourse] = useState<Course>({
        department: "",
        courseCode: 0,
        title: "",
        credits: 0,
        prereqs: [],
        description: "",
        prereqsFilled: [],
        degreeReqsFilled: [],
        courseId: uuidv4()
    });

    //states holding the values in each of the boxes
    const [codeBox, changeCode] = useState<string>("");
    const [titleBox, changeTitle] = useState<string>("");
    const [credsBox, changeCreds] = useState<string>("");
    const [reqsBox, changeReqs] = useState<string>("");
    const [fillsReqsBox, changeFillsReqs] = useState<string>("");
    const [fillsDegBox, changeFillsDeg] = useState<string>("");
    const [descBox, changeDesc] = useState<string>("");

    function enableAdd() {
        //checks if all fields are legal
        const dept = codeBox.substring(0, 4);
        const code = codeBox.substring(4);
        return (
            titleBox !== "" &&
            credsBox !== "" &&
            !isNaN(Number(credsBox)) &&
            credsBox.replaceAll(" ", "").length > 0 &&
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

    function updateFillsReqs(event: ChangeEvent) {
        //updates the fullfills reqs for box
        changeFillsReqs(event.target.value);
    }

    function updateFillsDeg(event: ChangeEvent) {
        //updates the fulfills degree requirements
        changeFillsDeg(event.target.value);
    }

    function addReq() {
        //adds the typed prerequisite to the list of prerequisites
        if (reqsBox.length === 7) {
            const dept = reqsBox.substring(0, 4);
            const code = reqsBox.substring(4);
            const final = dept.toUpperCase() + code;
            if (!specialChars.test(dept) && !isNaN(Number(code))) {
                const addReq = {
                    ...newCourse,
                    prereqs: [...newCourse.prereqs, final]
                };
                updateCourse(addReq);
                newPre([...reqsList, final]);
                changeReqs("");
            }
        }
    }

    function addFillsReq() {
        //adds the typed course to the courses this class serves as a prerequisite for
        if (fillsReqsBox.length === 7) {
            const dept = fillsReqsBox.substring(0, 4);
            const code = fillsReqsBox.substring(4);
            const final = dept.toUpperCase() + code;
            if (!specialChars.test(dept) && !isNaN(Number(code))) {
                const addReq = {
                    ...newCourse,
                    prereqsFilled: [...newCourse.prereqsFilled, final]
                };
                updateCourse(addReq);
                newPost([...postreqsList, final]);
                changeFillsReqs("");
            }
        }
    }

    function addDegReq() {
        const addReq = {
            ...newCourse,
            degreeReqsFilled: [...newCourse.degreeReqsFilled, fillsDegBox]
        };
        updateCourse(addReq);
        newDeg([...degreeReqsList, fillsDegBox]);
        changeFillsDeg("");
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

    function remPostReq(courseName: string) {
        const rem = newCourse.prereqsFilled.filter(
            (aCourse: string): boolean => aCourse !== courseName
        );
        const fixCourse = { ...newCourse, prereqsFilled: [...rem] };
        updateCourse(fixCourse);
        newPost([...rem]);
    }

    function remDegReq(degReqName: string) {
        const rem = newCourse.degreeReqsFilled.filter(
            (aReq: string): boolean => aReq !== degReqName
        );
        const fixCourse = { ...newCourse, degreeReqsFilled: [...rem] };
        updateCourse(fixCourse);
        newDeg([...rem]);
    }

    function isValidCode(aCode: string): boolean {
        //checks if the course code is a valid string for a course, i.e., CISC275
        if (aCode.replaceAll(" ", "").length === 7 && aCode.length === 7) {
            const dept = aCode.substring(0, 4);
            const code = aCode.substring(4);
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

        //If the course already contains an originaldata field, use it.
        if (newCourse.originalData) {
            updateCourse(newCourse);
            courseAdder(newCourse, semID);
            closeModal();
        } else {
            //Otherwise fill the field with a clone of itself.
            const newestCourse = {
                department: newCourse.department,
                courseCode: newCourse.courseCode,
                title: newCourse.title,
                credits: newCourse.credits,
                prereqs: [...newCourse.prereqs],
                description: newCourse.description,
                prereqsFilled: [...newCourse.prereqs],
                degreeReqsFilled: [...newCourse.degreeReqsFilled],
                courseId: newCourse.courseId,
                originalData: {
                    department: newCourse.department,
                    courseCode: newCourse.courseCode,
                    title: newCourse.title,
                    credits: newCourse.credits,
                    prereqs: [...newCourse.prereqs],
                    description: newCourse.description,
                    prereqsFilled: [...newCourse.prereqs],
                    degreeReqsFilled: [...newCourse.degreeReqsFilled],
                    courseId: newCourse.courseId
                }
            };
            updateCourse(newestCourse);
            courseAdder(newestCourse, semID);
            closeModal();
        }
        /*
        changeCode("");
        changeTitle("");
        changeCreds("");
        changeReqs("");
        newPre([]);
        changeDesc("");
        updateCourse({
            department: "",
            courseCode: 0,
            title: "",
            credits: 0,
            prereqs: [],
            description: ""
        });
        */
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
                            data-testid="add_course_department"
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
                            data-testid="add_course_name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Credits here:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Number of Credits"
                            value={credsBox}
                            onChange={updateCreds}
                            data-testid="add_course_credits"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Description here:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Course Description"
                            value={descBox}
                            onChange={updateDesc}
                            data-testid="add_course_description"
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
                            data-testid="add_course_prereq"
                        />
                    </Form.Group>
                    <Button
                        disabled={!isValidCode(reqsBox)}
                        onClick={addReq}
                        data-testid="add_course_prereq_button"
                    >
                        Add This Prerequisite
                    </Button>
                    {reqsList.map(
                        (aReq: string): JSX.Element => (
                            <li key={aReq} style={{ margin: "5px" }}>
                                {aReq + " "}
                                <Button onClick={() => remReq(aReq)}>
                                    Remove Prerequisite
                                </Button>
                            </li>
                        )
                    )}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>
                            Enter Degree Requirement Here: (i.e., Group A
                            Breadth, Tech Elective, etc.)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Degree Requirement Here"
                            value={fillsDegBox}
                            onChange={updateFillsDeg}
                        />
                    </Form.Group>
                    <Button disabled={fillsDegBox === ""} onClick={addDegReq}>
                        Add This Degree Requirement
                    </Button>
                    {degreeReqsList.map(
                        (aReq: string): JSX.Element => (
                            <li key={aReq} style={{ margin: "5px" }}>
                                <span style={{ textAlign: "center" }}>
                                    {aReq + " "}
                                </span>
                                <Button onClick={() => remDegReq(aReq)}>
                                    Remove Postrequisite
                                </Button>
                            </li>
                        )
                    )}
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>
                            Enter Postrequisites Here: (i.e., CISC181 For
                            CISC106)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Postrequisite Here"
                            value={fillsReqsBox}
                            onChange={updateFillsReqs}
                        />
                    </Form.Group>
                    <Button
                        disabled={!isValidCode(fillsReqsBox)}
                        onClick={addFillsReq}
                    >
                        Add This Postrequisite
                    </Button>
                    {postreqsList.map(
                        (aReq: string): JSX.Element => (
                            <li key={aReq} style={{ margin: "5px" }}>
                                <span style={{ textAlign: "center" }}>
                                    {aReq + " "}
                                </span>
                                <Button onClick={() => remPostReq(aReq)}>
                                    Remove Postrequisite
                                </Button>
                            </li>
                        )
                    )}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Col>
                <Col>
                    <Button
                        disabled={!enableAdd()}
                        onClick={addCourse}
                        data-testid="add_course_button"
                    >
                        Add Course to Plan
                    </Button>
                    <div>
                        {!enableAdd() && <div>Please Fill All Fields</div>}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

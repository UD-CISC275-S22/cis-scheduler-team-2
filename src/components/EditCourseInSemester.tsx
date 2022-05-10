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
    courseEditor: (courseID: string, newCourse: Course, semID: string) => void;
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
    const [postreqsList, newPost] = useState<string[]>([
        ...course.prereqsFilled
    ]);
    const [degreeReqsList, newDeg] = useState<string[]>([
        ...course.degreeReqsFilled
    ]);

    //state holding the new course to be added
    const [newCourse, updateCourse] = useState<Course>({
        department: course.department,
        courseCode: course.courseCode,
        title: course.title,
        credits: course.credits,
        prereqs: [...course.prereqs],
        description: course.description,
        prereqsFilled: [...course.prereqsFilled],
        degreeReqsFilled: [...course.degreeReqsFilled],
        originalData: course.originalData,
        courseId: course.courseId
    });

    //states holding the values in each of the boxes
    const [codeBox, changeCode] = useState<string>(
        course.department + course.courseCode.toString().padStart(3, "0")
    );

    const [titleBox, changeTitle] = useState<string>(course.title);
    const [credsBox, changeCreds] = useState<string>(String(course.credits));
    const [reqsBox, changeReqs] = useState<string>("");
    const [fillsReqsBox, changeFillsReqs] = useState<string>("");
    const [fillsDegBox, changeFillsDeg] = useState<string>("");
    const [descBox, changeDesc] = useState<string>(course.description);

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

    function addFillsReq() {
        //adds the typed course to the courses this class serves as a prerequisite for
        if (fillsReqsBox.length === 7) {
            const dept = fillsReqsBox.substring(0, 4);
            const code = fillsReqsBox.substring(4);
            if (!specialChars.test(dept) && !isNaN(Number(code))) {
                const addReq = {
                    ...newCourse,
                    prereqsFilled: [...newCourse.prereqsFilled, fillsReqsBox]
                };
                updateCourse(addReq);
                newPost([...postreqsList, fillsReqsBox]);
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
        if (aCode.length === 7) {
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
        //const newerCourse = {
        //  ...newCourse,
        //originalData: { ...newCourse }
        //};
        courseEditor(course.courseId, newCourse, semID);
        closeModal();
    }

    function resetToDefault() {
        //Resets the course information back to the default (if it exists), follows the same basic
        //procedure as updating the fields manually and then adding the course with addCourse.
        console.log("Original Data:");
        console.log(newCourse.originalData); //Logging data to the console for debugging purposes
        if (newCourse.originalData) {
            const defaultCourse = {
                ...newCourse.originalData,
                originalData: newCourse.originalData
            };
            updateCourse(defaultCourse);
            courseEditor(course.courseId, defaultCourse, semID);
            closeModal();
            //addCourse();
        }
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
                    <Button disabled={!isValidCode(reqsBox)} onClick={addReq}>
                        Add This Prerequisite
                    </Button>
                    {reqsList.map(
                        (aReq: string): JSX.Element => (
                            <li key={aReq} style={{ margin: "5px" }}>
                                <span style={{ textAlign: "center" }}>
                                    {aReq + " "}
                                </span>
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
                <Col>
                    <Button
                        onClick={resetToDefault}
                        data-testid="resetToDefault"
                    >
                        Reset To Original
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { Plan } from "../interfaces/plan";

//fix issue with swappin plans not fixing the selected

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface addCourseToSemesterProp {
    actPlan: Plan;
    courseAdder: (
        newCourse: Course,
        semYear: number,
        semSeas: string
    ) => boolean;
}

export function AddCourseToSemester({
    actPlan,
    courseAdder
}: addCourseToSemesterProp): JSX.Element {
    const semList = [...actPlan.semesters];
    const firstSem = actPlan.semesters[0];
    //for making sure text contains no specail characters or numbers
    const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~1234567890]/;

    //states for the semester the course is being added to
    const [startSem, changeSem] = useState<Semester>(firstSem);

    //list of prerequisites to be added in the new course
    const [reqsList, newPre] = useState<string[]>([]);
    //state for seeing if the selected semester can be added to
    const [validSem, swapValid] = useState<boolean>(true);

    //state setter for the semester time information
    function updateSem(event: ChangeEvent) {
        const semInfo = event.target.value.split(" ");
        const rightSem = semList.filter(
            (aSem: Semester): boolean =>
                aSem.season === semInfo[0] && aSem.year === Number(semInfo[1])
        );
        changeSem(rightSem[0]);
    }

    //state holding the new course to be added
    const [newCourse, updateCourse] = useState<Course>({
        department: "",
        courseCode: 0,
        title: "",
        credits: 0,
        prereqs: [],
        description: ""
    });

    //states holding the values in each of the boxes
    const [codeBox, changeCode] = useState<string>("");
    const [titleBox, changeTitle] = useState<string>("");
    const [credsBox, changeCreds] = useState<string>("");
    const [reqsBox, changeReqs] = useState<string>("");
    const [descBox, changeDesc] = useState<string>("");

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
        //adds the new course to the proper semester, if it already exists, and resets all fields
        const fixOnPlanSwap = actPlan.semesters.filter(
            (aSem: Semester): boolean =>
                aSem.season === startSem.season && aSem.year === startSem.year
        );
        if (
            fixOnPlanSwap.length === 0 ||
            courseAdder(newCourse, startSem.year, startSem.season)
        ) {
            if (fixOnPlanSwap.length === 0) {
                //covers for the edge case of not being able to swap???
                //NOT A PERMANENT SOLUTION, FAILS IF SWAPPING BACK TO THE OTHER COURSE
                console.log("testing");
                courseAdder(
                    newCourse,
                    actPlan.semesters[0].year,
                    actPlan.semesters[0].season
                );
            }
            changeSem(semList[0]);
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
            swapValid(true);
        } else {
            swapValid(false);
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
                            <li key={aReq}>
                                {aReq}
                                <Button onClick={() => remReq(aReq)}>
                                    Remove Prerequisite
                                </Button>
                            </li>
                        )
                    )}
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>
                            <Form.Select
                                value={startSem.season + " " + startSem.year}
                                onChange={updateSem}
                            >
                                {semList.map(
                                    (aSem: Semester): JSX.Element => (
                                        <option
                                            key={aSem.season + " " + aSem.year}
                                            value={
                                                aSem.season + " " + aSem.year
                                            }
                                        >
                                            {aSem.season + " " + aSem.year}
                                        </option>
                                    )
                                )}
                            </Form.Select>
                        </Form.Label>
                    </Form.Group>
                    <Button disabled={!enableAdd()} onClick={addCourse}>
                        Add Course to Plan
                    </Button>
                    <div>
                        {!enableAdd() && <div>Please Fill All Fields</div>}
                    </div>
                    <div>
                        {!validSem && <div>Please Select a Valid Semester</div>}
                    </div>
                    {startSem.season} + {startSem.year}
                </Col>
            </Row>
        </div>
    );
}

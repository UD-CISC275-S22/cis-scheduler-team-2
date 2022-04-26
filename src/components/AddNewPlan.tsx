import React, { useState } from "react";
import { Plan } from "../interfaces/plan";
import { Button, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";
import cisc from "../assets/cisc.json";

//Add passer function that does [...planArray, newPlan] inside of App.tsx, this should also give the Plan an ID
//Add functionality to clear the textboxes once the plan is added

//Test IDs of format add_plan_(something)
//i.e button to add the plan is called add_plan_button
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface addPlanProp {
    addPlan: (newPlan: Plan) => void;
}

const course_keys: string[] = Object.keys(cisc.CISC);
const CISC_COURSES: Course[] = course_keys.map(function (key: string) {
    const currCourse = cisc.CISC[key as keyof typeof cisc.CISC];
    const newCourse: Course = {
        department: currCourse.code.substring(0, 4),
        courseCode: parseInt(currCourse.code.substring(5)),
        title: currCourse.name,
        credits: parseInt(currCourse.credits),
        prereqs: [currCourse.preReq],
        description: currCourse.descr,
        prereqsFilled: [],
        degreeReqsFilled: []
    };
    return newCourse;
});

export function AddNewPlan({ addPlan }: addPlanProp): JSX.Element {
    const seasons = ["Fall", "Winter", "Spring", "Summer"];

    const [newPlan, updatePlan] = useState<Plan>({
        name: "",
        semesters: [
            { id: "0", year: 0, season: "Fall", classes: [], credits: 0 }
        ],
        //remember to auto-update the id
        id: 0,
        coursePool: [...CISC_COURSES]
    });

    const [startSeason, changeSeason] = useState<string>(seasons[0]);

    //these two states allow us to clear the boxes once a plan is added
    const [nameBox, changeName] = useState<string>("");
    const [yearBox, changeYear] = useState<string>("");

    function updateName(event: ChangeEvent) {
        if (event.target.value !== "") {
            const newName = {
                ...newPlan,
                name: event.target.value,
                semesters: [...newPlan.semesters]
            };
            updatePlan(newName);
        }
        //updates value in box
        changeName(event.target.value);
    }

    function updateYear(event: ChangeEvent) {
        if (!isNaN(Number(event.target.value))) {
            const newYear = { ...newPlan, semesters: [...newPlan.semesters] };
            newYear.semesters[0].year = Math.floor(Number(event.target.value));
            updatePlan(newYear);
        }
        //updates value in box
        changeYear(event.target.value);
    }

    function updateSeason(event: ChangeEvent) {
        const newSeason = { ...newPlan, semesters: [...newPlan.semesters] };
        newSeason.semesters[0].season = event.target.value;
        updatePlan(newSeason);
        changeSeason(event.target.value);
    }

    function allPlanFieldsFull(): boolean {
        if (!(nameBox === "" && !isNaN(Number(yearBox)))) {
            if (Number(yearBox) > 0) {
                return true;
            }
        }
        return false;
    }

    function addPlanFinal() {
        if (allPlanFieldsFull()) {
            addPlan(newPlan);

            //resets all fields and entry boxes to default
            changeName("");
            changeSeason(seasons[0]);
            changeYear("");
            updatePlan({
                name: "",
                semesters: [
                    {
                        id: "0",
                        year: 0,
                        season: "Fall",
                        classes: [],
                        credits: 0
                    }
                ],
                id: 0,
                coursePool: [...CISC_COURSES]
            });
        }
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>Plan Name Here:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Plan Name"
                    value={nameBox}
                    onChange={updateName}
                    data-testid="add_plan_name"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Degree Starting Year:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Starting Year"
                    value={yearBox}
                    onChange={updateYear}
                    data-testid="add_plan_year"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    <Form.Select
                        value={startSeason}
                        onChange={updateSeason}
                        data-testid="add_plan_season"
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
            </Form.Group>
            <Button
                disabled={!allPlanFieldsFull()}
                onClick={() => addPlanFinal()}
                data-testid="add_plan_button"
            >
                Add New Plan
            </Button>
        </div>
    );
}

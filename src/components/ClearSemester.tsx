import React from "react";
import { Button } from "react-bootstrap";
//import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
//import { SemesterTable } from "./SemesterTable";

//Test-id: clear_semester_button
interface clearSemesterProp {
    PlanID: number;
    thisSem: Semester;
    clearFunct: (semesterId: string) => void;
}

export function ClearSemesterButton({
    thisSem,
    clearFunct
}: clearSemesterProp) {
    return (
        <div>
            <Button
                disabled={thisSem.classes.length <= 0}
                onClick={() => clearFunct(thisSem.id)}
                data-testid="clear_semester_button"
            >
                Clear This Semester
            </Button>
        </div>
    );
}

import React from "react";
import { Button } from "react-bootstrap";
//import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
//import { SemesterTable } from "./SemesterTable";

interface clearSemesterProp {
    PlanID: number;
    thisSem: Semester;
    clearFunct: (planID: number, semYear: number, semSeas: string) => void;
}

export function ClearSemesterButton({
    PlanID,
    thisSem,
    clearFunct
}: clearSemesterProp) {
    return (
        <div>
            <Button
                disabled={thisSem.classes.length <= 0}
                onClick={() => clearFunct(PlanID, thisSem.year, thisSem.season)}
            >
                Clear This Semester
            </Button>
        </div>
    );
}

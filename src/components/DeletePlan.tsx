import React from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/plan";

interface deleteButtonProp {
    PlanList: Plan[];
    deleteFunct: () => void;
}

export function DeletePlanButton({ PlanList, deleteFunct }: deleteButtonProp) {
    return (
        <div>
            <Button
                disabled={PlanList.length <= 1}
                onClick={() => deleteFunct()}
            >
                Delete Selected Plan
            </Button>
        </div>
    );
}

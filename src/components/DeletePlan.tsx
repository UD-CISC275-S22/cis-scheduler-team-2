import React from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/plan";

//Button testid: delete_plan_button
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
                data-testid="delete_plan_button"
            >
                Delete Active Plan
            </Button>
        </div>
    );
}

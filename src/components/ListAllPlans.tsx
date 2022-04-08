import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Plan } from "../interfaces/plan";

export function ListAllPlans({
    allPlans,
    activePlan
}: {
    allPlans: Plan[];
    activePlan: Plan;
}): JSX.Element {
    //State for the current plan, uses the passed-in state "activePlan"
    const [currentPlan, setCurrentPlan] = useState<Plan>(activePlan);

    //Function to update the currently active plan, searches allPlans for a matching ID based on the dropdown selected.
    function updateCurrentPlan(event: React.ChangeEvent<HTMLSelectElement>) {
        const planIndex = allPlans.findIndex(
            (element: Plan) => element.id === parseInt(event.target.value)
        );
        if (planIndex >= 0 && allPlans[planIndex]) {
            setCurrentPlan(allPlans[planIndex]);
        }
    }
    //Dropdown box, displays all the passed in plans (allPlans, presumed state from App.tsx)
    return (
        <div>
            <Form.Group controlId="planList">
                <Form.Label>Select A Plan</Form.Label>
                <Form.Select
                    data-testid="plan_selection"
                    value={currentPlan.id}
                    onChange={updateCurrentPlan}
                >
                    {allPlans.map((plan: Plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}

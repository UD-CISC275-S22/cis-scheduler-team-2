import React from "react";
import { Form } from "react-bootstrap";
import { Plan } from "../interfaces/plan";

/**Takes in the state allPlans, an array of plans as well as activePlan and setActivePlan,
 * the state and state setter for the currently displayed plan
 */
export function ListAllPlans({
    allPlans,
    activePlan,
    setActivePlan
}: {
    allPlans: Plan[];
    activePlan: Plan;
    setActivePlan: (newPlan: Plan) => void;
}): JSX.Element {
    //Function to update the currently active plan, searches allPlans for a matching ID based on the dropdown selected.
    function updateCurrentPlan(event: React.ChangeEvent<HTMLSelectElement>) {
        const planIndex = allPlans.findIndex(
            (element: Plan) => element.id === parseInt(event.target.value)
        );
        if (planIndex >= 0 && allPlans[planIndex]) {
            setActivePlan(allPlans[planIndex]);
        }
    }
    //Dropdown box, displays all the passed in plans (allPlans, presumed state from App.tsx)
    return (
        <div>
            <Form.Group controlId="planList">
                <Form.Label>Select A Plan</Form.Label>
                <Form.Select
                    data-testid="plan_selection"
                    value={activePlan.id}
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

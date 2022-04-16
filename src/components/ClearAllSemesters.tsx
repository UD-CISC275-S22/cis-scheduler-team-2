import React from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";

/**Takes in the state allPlans, an array of plans as well as activePlan and setActivePlan,
 * the state and state setter for the currently displayed plan
 */
export function EmptySemestersButton({
    allPlans,
    updatePlans,
    activePlan,
    setActivePlan
}: {
    allPlans: Plan[];
    updatePlans: (newPlans: Plan[]) => void;
    activePlan: Plan;
    setActivePlan: (newPlan: Plan) => void;
}): JSX.Element {
    function emptyPlanSemesters(plan: Plan) {
        const newSemesters = plan.semesters.map(
            (semester: Semester): Semester => emptySemesterCourses(semester)
        );
        const newPlan = { ...plan, semesters: newSemesters };
        return newPlan;
    }
    function emptySemesterCourses(semester: Semester) {
        const newSemester = { ...semester, classes: [] };
        return newSemester;
    }
    function clearSemesters() {
        const newPlanList = [...allPlans];
        const clearedPlanList = newPlanList.map(
            (plan: Plan): Plan =>
                plan !== activePlan ? plan : emptyPlanSemesters(plan)
        );
        const currentPlanIndex = allPlans.findIndex(
            (plan: Plan) => plan === activePlan
        );
        if (currentPlanIndex != -1) {
            console.log(clearedPlanList);
            updatePlans(clearedPlanList);
            console.log(currentPlanIndex);
            console.log(allPlans);
            setActivePlan(clearedPlanList[currentPlanIndex]);
        }
    }
    return (
        <div>
            <Button onClick={clearSemesters} data-testid="clear_all_semesters">
                Clear Courses From All Semesters
            </Button>
        </div>
    );
}

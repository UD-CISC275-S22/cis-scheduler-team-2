import React from "react";
import { Button } from "react-bootstrap";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
//Button testid: empty_semesters
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
    //Takes in a plan, returns a version of the plan with the semesters wiped out.
    function emptyPlanSemesters(plan: Plan) {
        const newSemesters = plan.semesters.map(
            (semester: Semester): Semester => emptySemesterCourses(semester)
        );
        const newPlan = { ...plan, semesters: newSemesters };
        return newPlan;
    }
    //Takes in a semester, returns a semester without any courses in it (used by emptyPlanSemesters)
    function emptySemesterCourses(semester: Semester) {
        const newSemester = { ...semester, classes: [] };
        return newSemester;
    }
    //Function that uses the prior 2 functions in order to clear out the active plan from the AllPlans array,
    //updating the active plan & plans array
    function clearSemesters() {
        const newPlanList = [...allPlans];
        const clearedPlanList = newPlanList.map(
            (plan: Plan): Plan =>
                plan.id !== activePlan.id ? plan : emptyPlanSemesters(plan)
        );
        const currentPlanIndex = allPlans.findIndex(
            (plan: Plan) => plan.id === activePlan.id
        );
        if (currentPlanIndex != -1) {
            console.log(clearedPlanList);
            updatePlans(clearedPlanList);
            console.log(currentPlanIndex);
            console.log(allPlans);
            setActivePlan(clearedPlanList[currentPlanIndex]);
        }
    }
    //Returns a button within a div, which when clicked clears out the courses.
    return (
        <div>
            <Button onClick={clearSemesters} data-testid="empty_semesters">
                Clear Courses From All Semesters
            </Button>
        </div>
    );
}
